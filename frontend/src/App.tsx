import { useRecoilState } from 'recoil';
import { createTheme, CssBaseline, LinearProgress, ThemeProvider } from '@mui/material';
import { ThemeMode, themeModeState } from './store/theme';
import { base, darkColors, darkPalette, reset } from './styles/themes';
import PageRoutes from './routes';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthorize } from './hooks';
import { PATHS } from './constants';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';
import { webviewPrint } from './utils';

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
  const { i18n } = useTranslation();
  const [{ lang }] = useCookies(['lang']);

  // 앱 언어 변경감지
  useEffect(() => {
    if (lang !== i18n.language) {
      i18n.changeLanguage(lang); 
    }
  }, [lang]);

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
