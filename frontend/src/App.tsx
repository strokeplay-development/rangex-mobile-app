import { useRecoilState } from 'recoil';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { ThemeMode, themeModeState } from './recoil/theme';
import { base, darkColors, darkPalette, reset } from './styles/themes';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import SwingsPage from './pages/swings/SwingsPage';

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
      <Routes>
        <Route path='/home' element={HomePage()}/>
        <Route path='/swings' element={SwingsPage()}/>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
