// src/pages/About.jsx
import { Box, Typography, Container } from '@mui/material';
import { SEO } from '../components/seo/SEO';
import ilmzoneLogo from '../assets/images/ilmzone-logo).jpg';
import { Person, Star, Email, Phone, LocationOn } from '@mui/icons-material';

export default function About() {
  return (
    <>
      <SEO 
        title="About IlmZone" 
        description="Learn about IlmZone's mission to provide free educational resources for Pakistani students"
      />
      {/* Hero Banner */}
      <Box sx={{
        width: '100%',
        minHeight: { xs: 220, md: 320 },
        background: 'linear-gradient(90deg, #28A745 0%, #007BFF 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mb: 6,
        borderRadius: 3,
        boxShadow: 2,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <Box sx={{ zIndex: 2, textAlign: 'center', width: '100%' }}>
          <Box sx={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: '#fff',
            borderRadius: '50%',
            width: 90,
            height: 90,
            boxShadow: 2,
            mb: 2
          }}>
            <img src={ilmzoneLogo} alt="IlmZone Logo" style={{ height: 60, width: 60, objectFit: 'contain' }} />
          </Box>
          <Typography variant="h2" sx={{ fontWeight: 800, color: '#000', mb: 2 }}>
            Empowering Students Across Pakistan
          </Typography>
          <Typography variant="h6" sx={{ color: '#fff', maxWidth: 600, mx: 'auto', fontWeight: 400 }}>
            Free, high-quality educational resources for Matric & Intermediate students
          </Typography>
        </Box>
      </Box>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* About & Why Choose Section */}
        <Box sx={{ 
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 4,
          alignItems: 'stretch',
          mb: 6
        }}>
          <Box sx={{ flex: 1, bgcolor: 'background.paper', p: 5, borderRadius: 3, boxShadow: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Star sx={{ color: '#28A745', fontSize: 28 }} />
              <Typography variant="h5" gutterBottom sx={{ color: '#28A745', fontWeight: 700 }}>
                Our Mission
              </Typography>
            </Box>
            <Typography paragraph sx={{ color: '#333' }}>
              IlmZone is dedicated to providing free, high-quality educational resources for 
              Matric and Intermediate students across Pakistan. <br/>
              <b>Our mission is to empower every student with the tools and knowledge they need to succeed, regardless of their background or location.</b>
            </Typography>
            <Typography paragraph sx={{ color: '#333' }}>
              We strive to bridge educational gaps by making textbooks, notes, and past papers easily accessible to all. Our vision is a future where every Pakistani student can reach their full academic potential.
            </Typography>
            <Typography variant="h6" gutterBottom sx={{ color: '#28A745', mt: 3, fontWeight: 600 }}>
              What We Offer
            </Typography>
            <Box component="ul" sx={{ pl: 3, mb: 0, color: '#333' }}>
              <li>Free textbooks and study materials</li>
              <li>Comprehensive notes for all subjects</li>
              <li>Past papers with solutions</li>
              <li>Resources aligned with Pakistani curriculum</li>
            </Box>
          </Box>
          <Box sx={{ 
            flex: 1,
            bgcolor: 'background.paper',
            p: 5,
            borderRadius: 3,
            boxShadow: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 2
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Star sx={{ color: '#007BFF', fontSize: 28 }} />
              <Typography variant="h5" gutterBottom sx={{ color: '#007BFF', fontWeight: 700 }}>
                Why Choose IlmZone?
              </Typography>
            </Box>
            <Typography paragraph sx={{ color: '#333' }}>
              We believe education should be accessible to everyone, regardless of 
              financial background. Our resources are carefully curated by experienced 
              educators to ensure quality and relevance.
            </Typography>
            <Typography paragraph sx={{ color: '#333' }}>
              Join thousands of students who trust IlmZone for their academic journey!
            </Typography>
          </Box>
        </Box>
        {/* Divider */}
        <Box sx={{ width: '100%', height: 2, bgcolor: 'grey.100', my: 6, borderRadius: 1 }} />
        {/* Testimonials Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ textAlign: 'center', color: '#28A745', fontWeight: 700 }}>
            What Our Users Say
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, justifyContent: 'center', mt: 3 }}>
            <Box sx={{ flex: 1, bgcolor: 'background.paper', p: 4, borderRadius: 3, boxShadow: 2, minWidth: 220, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Person sx={{ color: '#28A745', fontSize: 40, mb: 1 }} />
              <Typography variant="body1" sx={{ fontStyle: 'italic', color: '#333' }}>
                "IlmZone helped me ace my board exams! The notes and past papers were a lifesaver."
              </Typography>
              <Typography variant="subtitle2" sx={{ mt: 2, textAlign: 'right', color: '#28A745', fontWeight: 600 }}>
                – Ayesha, Class 10 Student
              </Typography>
            </Box>
            <Box sx={{ flex: 1, bgcolor: 'background.paper', p: 4, borderRadius: 3, boxShadow: 2, minWidth: 220, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Person sx={{ color: '#007BFF', fontSize: 40, mb: 1 }} />
              <Typography variant="body1" sx={{ fontStyle: 'italic', color: '#333' }}>
                "The resources are so well organized and easy to access. Highly recommended for all students!"
              </Typography>
              <Typography variant="subtitle2" sx={{ mt: 2, textAlign: 'right', color: '#007BFF', fontWeight: 600 }}>
                – Bilal, FSc Part 1
              </Typography>
            </Box>
            <Box sx={{ flex: 1, bgcolor: 'background.paper', p: 4, borderRadius: 3, boxShadow: 2, minWidth: 220, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Person sx={{ color: '#28A745', fontSize: 40, mb: 1 }} />
              <Typography variant="body1" sx={{ fontStyle: 'italic', color: '#333' }}>
                "As a teacher, I find IlmZone invaluable for recommending extra materials to my students."
              </Typography>
              <Typography variant="subtitle2" sx={{ mt: 2, textAlign: 'right', color: '#28A745', fontWeight: 600 }}>
                – Mrs. Khan, Educator
              </Typography>
            </Box>
          </Box>
        </Box>
        {/* Contact Us Section */}
        <Box sx={{ mb: 4, p: 4, bgcolor: 'background.paper', borderRadius: 3, boxShadow: 2, maxWidth: 600, mx: 'auto', borderLeft: '6px solid #28A745' }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ color: '#28A745', fontWeight: 700, textAlign: 'center' }}>
            Contact Us
          </Typography>
          <Typography paragraph sx={{ textAlign: 'center', mb: 2, color: '#333' }}>
            Have questions, suggestions, or want to collaborate? We'd love to hear from you!
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, color: '#333' }}>
            <Typography><Email sx={{ color: '#28A745', mr: 1, verticalAlign: 'middle' }} /> <a href="mailto:info@ilmzone.com" style={{ color: '#28A745', textDecoration: 'none' }}>info@ilmzone.com</a></Typography>
            <Typography><Phone sx={{ color: '#28A745', mr: 1, verticalAlign: 'middle' }} /> <a href="tel:+923001234567" style={{ color: '#28A745', textDecoration: 'none' }}>+92 300 1234567</a></Typography>
            <Typography><LocationOn sx={{ color: '#28A745', mr: 1, verticalAlign: 'middle' }} /> Karachi, Pakistan</Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
}