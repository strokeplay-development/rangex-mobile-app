import { CssBaseline, ThemeProvider } from "@mui/material";
import { PropsWithChildren, Suspense } from "react";
import { QueryClient, QueryClientProvider, UseQueryResult } from "react-query";
import { MemoryRouter, Pathname } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { theme } from "../App";

export const rootWrapper: React.FC = ({ children }) => (
    <QueryClientProvider client={new QueryClient()}>
        <RecoilRoot>
            <Suspense fallback>
                { children }
            </Suspense>
        </RecoilRoot>
    </QueryClientProvider>
);

export const themeWrapper: React.FC = ({ children }) => (
    <ThemeProvider theme={theme('dark')}>
        <CssBaseline enableColorScheme/>
        { children }
    </ThemeProvider>
);

export const publicRouterWrapper: React.FC = ({ children }) => (
    <QueryClientProvider client={new QueryClient()}>
        <RecoilRoot>
            <Suspense fallback>
                <MemoryRouter initialEntries={['/']}>
                    { children }
                </MemoryRouter>
            </Suspense>
        </RecoilRoot>
    </QueryClientProvider>
);

export const privateRouterWrapper: React.FC = ({ children }) => (
    <QueryClientProvider client={new QueryClient()}>
        <RecoilRoot>
            <Suspense fallback>
                <MemoryRouter initialEntries={['/home']}>
                    { children }
                </MemoryRouter>
            </Suspense>
        </RecoilRoot>
    </QueryClientProvider>
);

/**
 * React-Query: mock result for useQuery
 */
export const mockQueryResult: UseQueryResult = {
    data: undefined,
    dataUpdatedAt: 0,
    error: null,
    errorUpdatedAt: 0,
    errorUpdateCount: 0,
    failureCount: 0,
    isError: false,
    isFetched: false,
    isFetchedAfterMount: false,
    isFetching: false,
    isIdle: false,
    isLoading: false,
    isLoadingError: false,
    isPlaceholderData: false,
    isPreviousData: false,
    isRefetchError: false,
    isRefetching: false,
    isStale: false,
    isSuccess: true,
    status: "success",
    refetch: jest.fn(),
    remove: jest.fn(),
};