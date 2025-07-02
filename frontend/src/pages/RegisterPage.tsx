import React, { useState } from 'react';
import { Avatar, Button, TextField, Typography, Container, Box, Alert, IconButton, InputAdornment, Paper } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CodeIcon from '@mui/icons-material/Code';
import { Link } from 'react-router-dom';
import api from '../api';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{username?: string, email?: string, password?: string}>({});

  const validate = () => {
    const errors: {username?: string, email?: string, password?: string} = {};
    if (!username || username.length < 3) errors.username = 'Username must be at least 3 characters.';
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) errors.email = 'Enter a valid email address.';
    if (!password) errors.password = 'Password is required.';
    else if (!passwordRegex.test(password)) errors.password = 'Password must be at least 8 characters, include uppercase, lowercase, number, and special character.';
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!validate()) return;
    setLoading(true);
    try {
      await api.post('/auth/register', { username, email, password });
      setSuccess('Registration successful! You can now log in.');
      setUsername(''); setEmail(''); setPassword('');
    } catch (err: any) {
      const backendError = err.response?.data;
      if (backendError?.error) setError(backendError.error);
      else if (backendError?.errors) setError(JSON.stringify(backendError.errors));
      else setError('Registration failed');
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
              <PersonAddIcon sx={{ fontSize: 32 }} />
            </Avatar>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <CodeIcon sx={{ mr: 1, fontSize: 28, color: '#1976d2' }} />
              <Typography component="h1" variant="h4" sx={{ fontWeight: 700, color: '#fff' }}>
                Join IIPP
              </Typography>
            </Box>
            
            <Typography variant="body1" sx={{ mb: 4, color: '#b0b3b8', textAlign: 'center' }}>
              Create your account and start your interview preparation journey
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
                error={!!fieldErrors.username}
                helperText={fieldErrors.username}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#fff',
                    background: '#23272A',
                    '& fieldset': {
                      borderColor: fieldErrors.username ? '#ef4444' : '#23272A',
                    },
                    '&:hover fieldset': {
                      borderColor: fieldErrors.username ? '#ef4444' : '#1976d2',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: fieldErrors.username ? '#ef4444' : '#1976d2',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#b0b3b8',
                    fontWeight: 500,
                    zIndex: 2,
                    background: '#23272A',
                    px: 0.5,
                    '&.Mui-focused': {
                      color: fieldErrors.username ? '#ef4444' : '#1976d2',
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
                  '& .MuiFormHelperText-root': {
                    color: fieldErrors.username ? '#ef4444' : '#b0b3b8',
                  },
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                error={!!fieldErrors.email}
                helperText={fieldErrors.email}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#fff',
                    background: '#23272A',
                    '& fieldset': {
                      borderColor: fieldErrors.email ? '#ef4444' : '#23272A',
                    },
                    '&:hover fieldset': {
                      borderColor: fieldErrors.email ? '#ef4444' : '#1976d2',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: fieldErrors.email ? '#ef4444' : '#1976d2',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#b0b3b8',
                    fontWeight: 500,
                    zIndex: 2,
                    background: '#23272A',
                    px: 0.5,
                    '&.Mui-focused': {
                      color: fieldErrors.email ? '#ef4444' : '#1976d2',
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
                  '& .MuiFormHelperText-root': {
                    color: fieldErrors.email ? '#ef4444' : '#b0b3b8',
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
                error={!!fieldErrors.password}
                helperText={fieldErrors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword((show) => !show)}
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
                      borderColor: fieldErrors.password ? '#ef4444' : '#23272A',
                    },
                    '&:hover fieldset': {
                      borderColor: fieldErrors.password ? '#ef4444' : '#1976d2',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: fieldErrors.password ? '#ef4444' : '#1976d2',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: '#b0b3b8',
                    fontWeight: 500,
                    zIndex: 2,
                    background: '#23272A',
                    px: 0.5,
                    '&.Mui-focused': {
                      color: fieldErrors.password ? '#ef4444' : '#1976d2',
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
                  '& .MuiFormHelperText-root': {
                    color: fieldErrors.password ? '#ef4444' : '#b0b3b8',
                  },
                }}
              />
              
              {error && (
                <Alert severity="error" sx={{ mt: 2, borderRadius: 2, background: '#23272A', color: '#ef4444', border: '1px solid #ef4444' }}>{error}</Alert>
              )}
              
              {success && (
                <Alert severity="success" sx={{ mt: 2, borderRadius: 2, background: '#23272A', color: '#10b981', border: '1px solid #10b981' }}>{success}</Alert>
              )}
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 4, mb: 2, py: 1.5, fontSize: '1.1rem', background: '#1976d2', color: '#fff', borderRadius: 2, fontWeight: 700, '&:hover': { background: '#125ea2' } }}
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
              
              <Typography variant="body2" sx={{ color: '#b0b3b8', textAlign: 'center', mt: 2 }}>
                Already have an account?{' '}
                <Link to="/login" style={{ color: '#1976d2', textDecoration: 'none', fontWeight: 600 }}>
                  Sign in
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default RegisterPage; 