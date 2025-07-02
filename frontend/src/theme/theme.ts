import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2', // Modern blue
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#64b5f6',
      contrastText: '#ffffff',
    },
    background: {
      default: '#181A1B', // true black
      paper: '#23272A',   // dark card
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b3b8',
    },
    success: {
      main: '#10b981',
    },
    warning: {
      main: '#f59e0b',
    },
    error: {
      main: '#ef4444',
    },
  },
  typography: {
    fontFamily: 'Inter, Roboto, Helvetica, Arial, sans-serif',
    h1: { fontWeight: 700, fontSize: '2.5rem', lineHeight: 1.2, color: '#fff' },
    h2: { fontWeight: 700, fontSize: '2rem', lineHeight: 1.3, color: '#fff' },
    h3: { fontWeight: 600, fontSize: '1.75rem', lineHeight: 1.4, color: '#fff' },
    h4: { fontWeight: 600, fontSize: '1.5rem', lineHeight: 1.4, color: '#fff' },
    h5: { fontWeight: 600, fontSize: '1.25rem', lineHeight: 1.5, color: '#fff' },
    h6: { fontWeight: 600, fontSize: '1.125rem', lineHeight: 1.5, color: '#fff' },
    body1: { fontSize: '1rem', lineHeight: 1.6, color: '#fff' },
    body2: { fontSize: '0.875rem', lineHeight: 1.6, color: '#b0b3b8' },
    button: { fontWeight: 600, textTransform: 'none', fontSize: '0.95rem', color: '#fff' },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: '#181A1B',
          color: '#fff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.7)',
          borderBottom: '1px solid #23272A',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 24px',
          fontWeight: 600,
          textTransform: 'none',
          boxShadow: 'none',
          background: 'none',
          color: '#fff',
          transition: 'all 0.2s',
          '&:hover': {
            background: 'rgba(25, 118, 210, 0.12)',
            color: '#fff',
          },
        },
        contained: {
          background: '#1976d2',
          color: '#fff',
          '&:hover': {
            background: '#125ea2',
            color: '#fff',
          },
        },
        outlined: {
          borderColor: '#1976d2',
          color: '#fff',
          '&:hover': {
            borderColor: '#64b5f6',
            background: 'rgba(25, 118, 210, 0.08)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: '#23272A',
          borderRadius: 12,
          boxShadow: '0 2px 12px rgba(0,0,0,0.5)',
          border: '1px solid #23272A',
          color: '#fff',
          transition: 'all 0.2s',
          '&:hover': {
            boxShadow: '0 8px 24px rgba(25, 118, 210, 0.15)',
            borderColor: '#1976d2',
            transform: 'translateY(-4px) scale(1.03)'
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
            background: '#23272A',
            color: '#fff',
            border: '1px solid #23272A',
            '&:hover': {
              border: '1.5px solid #1976d2',
            },
            '&.Mui-focused': {
              border: '2px solid #1976d2',
              boxShadow: '0 0 0 2px #1976d2',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#b0b3b8',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: '#23272A',
          borderRadius: 12,
          boxShadow: '0 2px 12px rgba(0,0,0,0.5)',
          border: '1px solid #23272A',
          color: '#fff',
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          background: '#1976d2',
          color: '#fff',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          fontWeight: 600,
          background: '#23272A',
          color: '#fff',
          border: '1px solid #23272A',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: '1px solid #23272A',
          background: '#23272A',
          color: '#fff',
        },
      },
    },
  },
}); 