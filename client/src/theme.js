// src/theme.js
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#457B9D', // Dark blue from palette
      contrastText: '#fff'
    },
    secondary: {
      main: '#41521F', // Dark green from palette
      contrastText: '#fff'
    },
    background: {
      default: '#DBD2E0', // Light purple from palette
      paper: '#fff'
    },
    accent: {
      main: '#8E5572', // Purple from palette
      light: '#88D498' // Light green from palette
    }
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      color: '#41521F' // Dark green
    },
    h2: {
      fontWeight: 600,
      color: '#457B9D' // Dark blue
    },
    h3: {
      fontWeight: 600,
      color: '#8E5572' // Purple
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
          padding: '8px 20px'
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: '#3a6a8a' // Darker shade of primary
          }
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
          color: '#41521F' // Dark green
        }
      }
    }
  }
});