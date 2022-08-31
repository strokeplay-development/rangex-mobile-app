import { useRecoilState } from 'recoil';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { ThemeMode, themeModeState } from './store/theme';
import { base, darkColors, darkPalette, reset } from './styles/themes';
import PageRoutes from './routes';
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
  
  return (
    <ThemeProvider theme={theme(themeMode)}>
      <CssBaseline enableColorScheme/>
      <PageRoutes/>
    </ThemeProvider>
  );
}

export default App;
