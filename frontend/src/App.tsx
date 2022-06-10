import { useRecoilState } from 'recoil';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { ThemeMode, themeModeState } from './recoil/theme';
import { base, darkColors, darkPalette, reset } from './styles/themes';
import PageRoutes from './routes';

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
