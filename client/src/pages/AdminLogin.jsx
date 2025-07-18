// src/pages/AdminLogin.jsx
import { useState, useContext } from 'react';
import { Container, Typography, TextField, Button, Box, Alert, CircularProgress, Card, CardContent, InputAdornment, IconButton, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AdminContext } from '../contexts/AdminContext';
import { SEO } from '../components/seo/SEO';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function AdminLogin() {
  const { login, loading } = useContext(AdminContext);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await login(password);
      navigate('/upload');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid password');
      console.error('Login error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <SEO title="Admin Login - IlmZone" description="Admin login for IlmZone resource management" />
      <Box sx={{
        minHeight: '100vh',
        bgcolor: 'linear-gradient(135deg, #e3e9f7 0%, #f8fafc 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 6
      }}>
        <Container maxWidth="xs">
          <Card sx={{ p: 3, borderRadius: 4, boxShadow: 6 }}>
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56, mb: 1 }}>
                  <LockIcon fontSize="large" />
                </Avatar>
                <Typography variant="h5" fontWeight={700} sx={{ color: 'primary.main', mb: 1 }}>
                  Admin Login
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                  Enter your admin password to access resource management.
                </Typography>
              </Box>
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ mt: 2 }}
              >
                {error && (
                  <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                  </Alert>
                )}
                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  sx={{ mb: 3 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon color="primary" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword((show) => !show)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  disabled={isSubmitting}
                  sx={{ py: 1.5, fontWeight: 600, fontSize: '1.1rem' }}
                >
                  {isSubmitting ? <CircularProgress size={24} /> : 'Login'}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
}