import { useRecoilState } from 'recoil';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { ThemeMode, themeModeState } from './store/theme';
import { base, darkColors, darkPalette, reset } from './styles/themes';
import PageRoutes from './routes';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

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
  const location = useLocation();
  const [themeMode] = useRecoilState(themeModeState);

  useEffect(() => {
    window.LocationChanged?.postMessage(location.pathname);
  }, [location.pathname]);
  
  return (
    <ThemeProvider theme={theme(themeMode)}>
      <CssBaseline enableColorScheme/>
      <PageRoutes/>
    </ThemeProvider>
  );
}

export default App;
