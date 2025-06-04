// src/pages/Home.jsx
import { Container, Button, Typography, Box, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { SEO } from '../components/seo/SEO';

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <SEO title="Free Educational Resources" />
      
      {/* Hero Section */}
      <Box sx={{ 
        bgcolor: 'primary.main', 
        color: 'white',
        py: 10,
        textAlign: 'center'
      }}>
        <Container maxWidth="md">
          <Typography variant="h2" gutterBottom>
            Free TextBooks and Notes for Matric and Intermediate Students
          </Typography>
          <Typography variant="h5" paragraph>
            Comprehensive collection of textbooks, notes, and past papers
          </Typography>
          <Button 
            variant="contained" 
            color="secondary"
            size="large"
            onClick={() => navigate('/textbooks')}
            sx={{ mr: 2 }}
          >
            Browse Textbooks
          </Button>
          <Button 
            variant="outlined" 
            color="inherit"
            size="large"
            onClick={() => navigate('/notes')}
          >
            View Notes
          </Button>
        </Container>
      </Box>

      {/* About Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" align="center" gutterBottom sx={{ color: 'primary.main' }}>
          About IlmZone
        </Typography>
        <Typography variant="body1" paragraph>
          IlmZone is a free educational platform providing high-quality learning resources for students 
          of Class 9, Class 10, FSc Part 1, and FSc Part 2. Our mission is to make education accessible 
          to everyone without any cost barriers.
        </Typography>
        <Typography variant="body1" paragraph>
          We carefully curate textbooks, notes, and past papers to ensure students have access to the 
          best possible study materials for their exams.
        </Typography>
      </Container>

      {/* Contact Section */}
      <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
        <Container maxWidth="md">
          <Typography variant="h3" align="center" gutterBottom sx={{ color: 'primary.main' }}>
            Contact Us
          </Typography>
          <Box 
            component="form" 
            sx={{ 
              maxWidth: 600,
              mx: 'auto',
              p: 4,
              boxShadow: 3,
              borderRadius: 2
            }}
          >
            <TextField
              fullWidth
              label="Your Name"
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Message"
              multiline
              rows={4}
              margin="normal"
              required
            />
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              size="large"
              sx={{ mt: 2 }}
            >
              Send Message
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
}