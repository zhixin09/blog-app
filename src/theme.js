import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: `'Open Sans', sans-serif`,
  },
  palette: {
    custom: {
      main: '#FFFFFFF',
      light: '#BAFF39',
      dark: '#6E6E6E',
    },
    mode: 'light',
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#FFFFFF',
    },
  },
});

export default theme;
