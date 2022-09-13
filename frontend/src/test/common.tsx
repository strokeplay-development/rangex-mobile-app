import { CssBaseline, ThemeProvider } from "@mui/material";
import { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
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