// src/pages/Contact.jsx
import { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Box, 
  CircularProgress,
  Alert,
  Grid
} from '@mui/material';
import { SEO } from '../components/seo/SEO';
import axios from '../api/axios';
import { Phone, Email, LocationOn } from '@mui/icons-material';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const captchaRef = useRef(null);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    if (!captchaVerified) newErrors.captcha = 'Please verify you are not a robot';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');
  
  try {
    const response = await axios.post('/api/contact', {
      ...formData,
      captcha: captchaValue
    });

    if (response.data.success) {
      setSuccess(true);
      // Reset form
    } else {
      setError(response.data.message || 'Failed to send message');
    }
  } catch (err) {
    let errorMessage = 'Failed to send message. Please try again later.';
    
    if (err.response) {
      // Backend returned an error
      errorMessage = err.response.data.message || errorMessage;
      
      // Specific cases
      if (err.response.status === 400) {
        errorMessage = 'Validation error: ' + (err.response.data.errors?.join(', ') || errorMessage);
      }
    } else if (err.request) {
      // Request was made but no response
      errorMessage = 'Network error. Please check your connection.';
    }
    
    setError(errorMessage);
    console.error('Contact form error:', err);
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <SEO 
        title="Contact Us" 
        description="Get in touch with IlmZone for questions or feedback"
      />
      
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography 
          variant="h3" 
          align="center" 
          gutterBottom 
          sx={{ 
            color: '#28A745',
            fontWeight: 700,
            mb: 4
          }}
        >
          Contact IlmZone
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box 
              component="form" 
              onSubmit={handleSubmit}
              sx={{ 
                p: 4,
                boxShadow: 2,
                borderRadius: 2,
                bgcolor: 'background.paper',
                height: '100%'
              }}
            >
              {success && (
                <Alert severity="success" sx={{ mb: 3 }}>
                  Your message has been sent successfully! We'll get back to you soon.
                </Alert>
              )}

          
              {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
              {error.message || error}
              {error.errorCodes?.includes('timeout-or-duplicate') && (
              <Button 
              onClick={() => {
              captchaRef.current.reset();
              setCaptchaVerified(false);
        }}
              sx={{ ml: 2 }}
              size="small"
        >
              Reload CAPTCHA
          </Button>
      )}
  </Alert>
)}

              <TextField
                fullWidth
                label="Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                margin="normal"
                required
                sx={{ mb: 3 }}
              />
              
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                margin="normal"
                required
                sx={{ mb: 3 }}
              />
              
              <TextField
                fullWidth
                label="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                error={!!errors.subject}
                helperText={errors.subject}
                margin="normal"
                required
                sx={{ mb: 3 }}
              />
              
              <TextField
                fullWidth
                label="Your Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                error={!!errors.message}
                helperText={errors.message}
                multiline
                rows={6}
                margin="normal"
                required
                sx={{ mb: 3 }}
              />
              
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                onChange={() => setCaptchaVerified(true)}
                 onExpired={() => setCaptchaVerified(false)}
                onErrored={() => setCaptchaVerified(false)}
                sx={{ mb: 3 }}
              />
              
              <Button 
                type="submit" 
                variant="contained" 
                size="large"
                fullWidth
                disabled={loading || !captchaVerified}
                sx={{ 
                  py: 1.5,
                  fontSize: '1.1rem',
                  bgcolor: '#28A745',
                  color: '#fff',
                  '&:hover': { bgcolor: '#218838' }
                }}
              >
                {loading ? (
                  <CircularProgress size={26} color="inherit" />
                ) : (
                  'Send Message'
                )}
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box 
              sx={{ 
                p: 4,
                height: '100%',
                bgcolor: '#28A745',
                color: '#fff',
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: '#fff' }}>
                Contact Information
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <LocationOn sx={{ mr: 2, fontSize: 30 }} />
                <Box>
                  <Typography variant="subtitle1">Our Address</Typography>
                  <Typography variant="body1">
                    123 Education Street, Karachi, Pakistan
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Email sx={{ mr: 2, fontSize: 30 }} />
                <Box>
                  <Typography variant="subtitle1">Email Us</Typography>
                  <Typography variant="body1">
                    contact@ilmzone.com
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Phone sx={{ mr: 2, fontSize: 30 }} />
                <Box>
                  <Typography variant="subtitle1">Call Us</Typography>
                  <Typography variant="body1">
                    +92 300 1234567
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Working Hours
                </Typography>
                <Typography>Monday - Friday: 9am to 5pm</Typography>
                <Typography>Saturday: 10am to 2pm</Typography>
                <Typography>Sunday: Closed</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}