// src/pages/auth/Register.jsx
import { useState, useContext } from 'react';
import { Container, Box, Typography, TextField, Button, Alert, Paper, InputAdornment, IconButton } from '@mui/material';
import { UserContext } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function Register() {
  const { register } = useContext(UserContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!form.name || !form.email || !form.password || !form.confirm) {
      setError('All fields are required.');
      return;
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      await axios.post('/api/auth/register', { name: form.name, email: form.email, password: form.password });
      // Auto-login after registration
      const res = await axios.post('/api/auth/login', { email: form.email, password: form.password });
      register(res.data.user, res.data.token);
      setSuccess('Registration successful! Redirecting...');
      setTimeout(() => navigate('/'), 1200);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper elevation={6} sx={{ p: 5, borderRadius: 4, width: '100%', maxWidth: 420 }}>
        <Typography variant="h4" fontWeight={700} align="center" gutterBottom sx={{ color: '#000' }}>Sign Up</Typography>
        <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 3, color: '#333' }}>
          Create your free account to join IlmZone!
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            autoFocus
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={form.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(v => !v)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <TextField
            label="Confirm Password"
            name="confirm"
            type={showPassword ? 'text' : 'password'}
            value={form.confirm}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{ mt: 2, fontWeight: 600, fontSize: '1.1rem', py: 1.2, bgcolor: '#28A745', color: '#fff', '&:hover': { bgcolor: '#218838' } }}
            disabled={loading}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </Button>
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: '#333' }}>
              Already have an account?{' '}
              <Button variant="text" size="small" sx={{ color: '#007BFF', fontWeight: 600 }} onClick={() => navigate('/login')}>Log In</Button>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}