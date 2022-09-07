import { fireEvent, render, screen } from '@testing-library/react'
import * as router from 'react-router-dom';
import { MemoryRouter } from 'react-router-dom';
import { theme } from '../../App';
import { PATHS } from '../../constants';
import MorePage from '../../pages/more/MorePage';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import * as recoil from 'recoil';
import { User } from '../../types';

const themeWrapper: React.FC = ({ children }) => (
    <ThemeProvider theme={theme('dark')}>
        <CssBaseline enableColorScheme/>
        { children }
    </ThemeProvider>
);

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn()
}));
jest.mock('recoil');

describe("MorePage", () => {
    beforeEach(() => {
        (recoil.useRecoilValue as jest.Mock).mockImplementation((): User => ({
            name: 'Test Name'
        }));        
    });
    
    test("렌더링 성공", () => {
        render(
            <MemoryRouter initialEntries={[PATHS.MORE]}>
                <MorePage/>
            </MemoryRouter>,
            { wrapper: themeWrapper }
        );

        expect(screen.getByText('Test Name')).toBeInTheDocument();
        expect(screen.getByRole('menu:edit-profile')).toBeInTheDocument();
        expect(screen.getByRole('menu:change-club')).toBeInTheDocument();
        expect(screen.getByRole('menu:game-options')).toBeInTheDocument();
        expect(screen.getByRole('menu:join-shop')).toBeInTheDocument();
        expect(screen.getByRole('menu:policy')).toBeInTheDocument();
        expect(screen.getByRole('menu:terms')).toBeInTheDocument();
        expect(screen.getByRole('menu:licenses')).toBeInTheDocument();
        expect(screen.getByRole('menu:version')).toBeInTheDocument();
    });

    test("메뉴를 클릭하면 해당 페이지로 이동한다.", () => {
        const mockedNavigate = jest.fn();
        jest.spyOn(router, 'useNavigate').mockImplementation(() => mockedNavigate);

        render(
            <MemoryRouter initialEntries={[PATHS.MORE]}>
                <MorePage/>
            </MemoryRouter>,
            { wrapper: themeWrapper }
        );
        
        // Edit Profile
        fireEvent.click(screen.getByRole('menu:edit-profile'));
        expect(mockedNavigate).toHaveBeenCalledWith('/profile');

        // Change Club
        fireEvent.click(screen.getByRole('menu:change-club'));
        expect(mockedNavigate).toHaveBeenCalledWith('/clubs');

        // Game Options
        fireEvent.click(screen.getByRole('menu:game-options'));
        expect(mockedNavigate).toHaveBeenCalledWith('/options');

        // Join Shop
        fireEvent.click(screen.getByRole('menu:join-shop'));
        expect(mockedNavigate).toHaveBeenCalledWith('/join');
    });
});