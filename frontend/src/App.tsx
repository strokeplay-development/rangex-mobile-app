import { useRecoilState } from 'recoil';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { ThemeMode, themeModeState } from './recoil/theme';
import { base, darkColors, darkPalette, reset } from './styles/themes';
import PageRoutes from './routes';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

const theme = (mode: ThemeMode) => createTheme({
  ...reset,
  ...base,
  ...darkColors,
  palette: {
    mode: mode,
    ...darkPalette
  },
});

function App() {
  const [themeMode] = useRecoilState(themeModeState);
  const location = useLocation();
  const [cookies] = useCookies(['accessToken', 'refreshToken']);


  useEffect(() => {
    window.LocationChanged?.postMessage(location.pathname);
    window.WebviewMounted?.postMessage(document.cookie);
  }, [location]);
  
  return (
    <ThemeProvider theme={theme(themeMode)}>
      <CssBaseline enableColorScheme/>
      <PageRoutes/>
    </ThemeProvider>
  );
}

export default App;
