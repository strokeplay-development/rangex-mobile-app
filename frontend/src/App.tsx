import { useRecoilState } from 'recoil';
import { createTheme, CssBaseline, LinearProgress, ThemeProvider } from '@mui/material';
import { ThemeMode, themeModeState } from './store/theme';
import { base, darkColors, darkPalette, reset } from './styles/themes';
import PageRoutes from './routes';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthorize } from './hooks';
import { PATHS } from './constants';

export const theme = (mode: ThemeMode) => createTheme({
  ...reset,
  ...base,
  ...darkColors,
  palette: {
    mode: mode,
    ...darkPalette
  },
});

function App() {
  const location = useLocation();
  const [themeMode] = useRecoilState(themeModeState);
  const { isAuthorized, isAuthorizing } = useAuthorize();
  const nav = useNavigate();

  useEffect(() => {
    window.LocationChanged?.postMessage(location.pathname);

    if (!isAuthorizing && isAuthorized === false) {
      nav(PATHS.REDIRECT.LOGOUT, { replace: true });
    }
  }, [location.pathname, isAuthorized, isAuthorizing]);
  
  return (
    <ThemeProvider theme={theme(themeMode)}>
      <CssBaseline enableColorScheme/>
      {
        isAuthorizing
        ? <LinearProgress role={'nav:authorizing'}/>
        : <PageRoutes/>
      }
    </ThemeProvider>
  );
}

export default App;
