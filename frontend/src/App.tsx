import { useRecoilState } from 'recoil';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { ThemeMode, themeModeState } from './recoil/theme';
import { base, darkColors, darkPalette, reset } from './styles/themes';
import PageRoutes from './routes';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

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


  useEffect(() => {
    window.LocationChanged?.postMessage(location.pathname);

  }, [location]);
  
  return (
    <ThemeProvider theme={theme(themeMode)}>
      <CssBaseline enableColorScheme/>
      <PageRoutes/>
    </ThemeProvider>
  );
}

export default App;
