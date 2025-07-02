import React, { useState } from 'react';
import { Avatar, Button, TextField, Typography, Container, Box, Alert, InputAdornment, IconButton, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../api';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CodeIcon from '@mui/icons-material/Code';
import { Link } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { username, password });
      login(res.data.access_token);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      background: '#181A1B',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <Paper sx={{
          p: 6,
          background: '#23272A',
          border: '1px solid #23272A',
          borderRadius: 4,
          boxShadow: '0 2px 12px rgba(0,0,0,0.5)',
        }}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Avatar sx={{ m: 2, bgcolor: '#1976d2', width: 64, height: 64 }}>
              <LockOutlinedIcon sx={{ fontSize: 32 }} />
            </Avatar>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <CodeIcon sx={{ mr: 1, fontSize: 28, color: '#1976d2' }} />
              <Typography component="h1" variant="h4" sx={{ fontWeight: 700, color: '#fff' }}>
                Welcome Back
              </Typography>
            </Box>
            
            <Typography variant="body1" sx={{ mb: 4, color: '#b0b3b8', textAlign: 'center' }}>
              Sign in to continue your interview preparation journey
            </Typography>
            
            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                autoFocus
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#fff',
                    background: '#23272A',
                    '& fieldset': {
                      borderColor: '#23272A',
                    },
                    '&:hover fieldset': {
                      borderColor: '#1976d2',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#1976d2',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#b0b3b8',
                    fontWeight: 500,
                    zIndex: 2,
                    background: '#23272A',
                    px: 0.5,
                    '&.Mui-focused': {
                      color: '#1976d2',
                      fontWeight: 700,
                      background: '#23272A',
                      zIndex: 2,
                    },
                    '&.Mui-error': {
                      color: '#ef4444',
                      background: '#23272A',
                      zIndex: 2,
                    },
                  },
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleTogglePassword}
                        edge="end"
                        sx={{ color: '#b0b3b8' }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#fff',
                    background: '#23272A',
                    '& fieldset': {
                      borderColor: '#23272A',
                    },
                    '&:hover fieldset': {
                      borderColor: '#1976d2',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#1976d2',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#b0b3b8',
                    fontWeight: 500,
                    zIndex: 2,
                    background: '#23272A',
                    px: 0.5,
                    '&.Mui-focused': {
                      color: '#1976d2',
                      fontWeight: 700,
                      background: '#23272A',
                      zIndex: 2,
                    },
                    '&.Mui-error': {
                      color: '#ef4444',
                      background: '#23272A',
                      zIndex: 2,
                    },
                  },
                }}
              />
              
              {error && (
                <Alert severity="error" sx={{ mt: 2, borderRadius: 2, background: '#23272A', color: '#ef4444', border: '1px solid #ef4444' }}>{error}</Alert>
              )}
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 4, mb: 2, py: 1.5, fontSize: '1.1rem', background: '#1976d2', color: '#fff', borderRadius: 2, fontWeight: 700, '&:hover': { background: '#125ea2' } }}
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
              
              <Typography variant="body2" sx={{ color: '#b0b3b8', textAlign: 'center', mt: 2 }}>
                Don&apos;t have an account?{' '}
                <Link to="/register" style={{ color: '#1976d2', textDecoration: 'none', fontWeight: 600 }}>
                  Register
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage; 