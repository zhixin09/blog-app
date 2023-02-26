import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFFFFF',
    },
    secondary: {
      main: '#BAFF39',
    },
    custom: {
      main: '#FFFFFFF',
      light: '#BAFF39',
      dark: '#6E6E6E',
    },
  },
});

export default theme;
