import { act, render, screen, waitFor } from '@testing-library/react';
import { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import App from '../App';
import { PATHS } from '../constants';
import { darkPalette } from '../styles/themes';
import * as hooks from '../hooks';

export const rootWrapper: React.FC = ({ children }) => (
  <QueryClientProvider client={new QueryClient()}>
    <RecoilRoot>
      <Suspense fallback>
        { children }
      </Suspense>
    </RecoilRoot>
  </QueryClientProvider>
);

jest.mock('../hooks');

/**
 * App and Routing
 */
describe("라우팅", () => {
  beforeEach(() => {
    (hooks.useAuthorize as jest.Mock).mockImplementation(() => ({
      isAuthorizing: false,
      isAuthorized: true
    }));
  });

  test('잘못된 경로로 오면 404페이지를 렌더링한다.', async () => {
    const BAD_ROUTE = '/soso/bad';
  
    render(
      <MemoryRouter initialEntries={[BAD_ROUTE]}>
        <App/>
      </MemoryRouter>, 
      { wrapper: rootWrapper }
    );
    await waitFor(() => {
      const text = screen.queryByText("404");
      expect(text).toBeInTheDocument();
    });
  });

  test('인가 확인중에는 로딩바를 보여준다.', async () => {
    jest.spyOn(hooks, 'useAuthorize').mockImplementation(() => ({
      isAuthorizing: true,
      isAuthorized: false
    }));

    await act(() => {
      render(
        <MemoryRouter initialEntries={[PATHS.MAIN.HOME]}>
          <App/>
        </MemoryRouter>, 
        { wrapper: rootWrapper }
      );
    });
    
    const progressbar = await screen.getByRole("progressbar");
    expect(progressbar).toBeInTheDocument();
  });

  test('인가되면 프라이빗 페이지에 접근해도 로그아웃 유도페이지로 리디렉션 하지 않는다.', async () => {
    jest.spyOn(hooks, 'useAuthorize').mockImplementation(() => ({
      isAuthorizing: false,
      isAuthorized: true
    }));

    await act(() => {
      render(
        <MemoryRouter initialEntries={[PATHS.MAIN.HOME]}>
          <App/>
        </MemoryRouter>, 
        { wrapper: rootWrapper }
      );
    });

    const logout = screen.queryByText('Go to Login Page');
    expect(logout).not.toBeInTheDocument();
  });

  test('인가되지 않으면 프라이빗 페이지에 접근할 시 로그아웃 유도페이지로 리디렉션 된다.', async () => {
    jest.spyOn(hooks, 'useAuthorize').mockImplementation(() => ({
      isAuthorizing: false,
      isAuthorized: false
    }));

    await act(() => {
      render(
        <MemoryRouter initialEntries={[PATHS.MAIN.HOME]}>
          <App/>
        </MemoryRouter>, 
        { wrapper: rootWrapper }
      );
    });

    const logout = screen.getByText('Go to Login Page');
    expect(logout).toBeInTheDocument();
  });
});

/**
 * Theme
 */
describe('Theme', () => {
  test('Dark Theme이 적용되었으면, 배경색이 Navy이다.', async () => {
    jest.spyOn(hooks, 'useAuthorize').mockImplementation(() => ({
      isAuthorizing: false,
      isAuthorized: true
    }));

    const rendered = render(
      <MemoryRouter initialEntries={['/']}>
        <App/>
      </MemoryRouter>, 
      { wrapper: rootWrapper }
    );

    expect(rendered.baseElement).toHaveStyle({
      'background-color': `${darkPalette.background?.default}`
    });
  });
});