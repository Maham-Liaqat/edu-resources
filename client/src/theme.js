// src/theme.js
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#28A745', // Primary Green
      light: '#43c463', // Slightly lighter green for contrast
      dark: '#218838', // Green Hover
      contrastText: '#fff'
    },
    secondary: {
      main: '#007BFF', // Accent Blue
      light: '#339cff',
      dark: '#0056b3',
      contrastText: '#fff'
    },
    background: {
      default: '#FFFFFF', // White background
      paper: '#F5F5F5' // Light gray for cards and surfaces
    },
    text: {
      primary: '#000000', // Black text
      secondary: '#333333' // Slightly lighter for secondary text
    },
    grey: {
      50: '#F5F5F5',
      100: '#eeeeee',
      200: '#e0e0e0',
      300: '#bdbdbd',
      400: '#9e9e9e',
      500: '#757575',
      600: '#616161',
      700: '#424242',
      800: '#212121',
      900: '#111111'
    }
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      color: '#000000'
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
      color: '#000000'
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#000000'
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.4,
      color: '#000000'
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.5,
      color: '#000000'
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5,
      color: '#000000'
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      color: '#333333'
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
      color: '#333333'
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
          padding: '10px 24px',
          fontSize: '1rem',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(40,167,69,0.10)'
          }
        },
        containedPrimary: {
          background: '#28A745',
          color: '#fff',
          '&:hover': {
            background: '#218838'
          }
        },
        containedSecondary: {
          background: '#007BFF',
          color: '#fff',
          '&:hover': {
            background: '#0056b3'
          }
        },
        outlined: {
          borderWidth: 2,
          borderColor: '#28A745',
          color: '#28A745',
          '&:hover': {
            borderWidth: 2,
            background: '#F5F5F5',
            borderColor: '#218838',
            color: '#218838'
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          background: '#F5F5F5',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 8px 25px rgba(0,0,0,0.12)',
            transform: 'translateY(-2px)'
          }
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          color: '#28A745',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 500,
          background: '#F5F5F5',
          color: '#28A745'
        }
      }
    }
  },
  shape: {
    borderRadius: 8
  }
});