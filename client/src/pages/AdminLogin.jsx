import { useState, useContext } from 'react';
import { 
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress
} from '@mui/material';
import { AdminContext } from '../contexts/AdminContext';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { useEffect } from 'react';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isAdmin, login } = useContext(AdminContext); // Using context

  // Redirect if already logged in
  useEffect(() => {
    if (isAdmin) {
      navigate('/upload');
    }
  }, [isAdmin, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!password.trim()) {
      setError('Password is required');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const success = await login(password); // Using context method
      if (success) {
        navigate('/upload');
      } else {
        setError('Invalid admin credentials');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ 
      py: 8,
      display: 'flex',
      flexDirection: 'column',
      minHeight: '80vh',
      justifyContent: 'center' 
    }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 3 }}>
        Admin Login
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <Box 
        component="form" 
        onSubmit={handleSubmit} 
        sx={{ 
          mt: 3,
          '& .MuiTextField-root': { mb: 2 } 
        }}
      >
        <TextField
          fullWidth
          label="Admin Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          required
          autoComplete="current-password"
        />
        
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            'Login'
          )}
        </Button>
      </Box>
    </Container>
  );
}