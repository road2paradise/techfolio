import createTheme from '@mui/material/styles/createTheme';

// define light and dark mode
export const themeSelector = (themeMode: 'light' | 'dark') => {
  return createTheme({
    palette: {
        mode: themeMode,
    },
  });
}