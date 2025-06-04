import { Box, Typography, Container } from '@mui/material';
import { SEO } from '../components/seo/SEO';

export default function About() {
  return (
    <>
      <SEO 
        title="About IlmZone" 
        description="Learn about IlmZone's mission to provide free educational resources for Pakistani students"
      />
      
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom 
          sx={{ 
            color: 'primary.main',
            fontWeight: 700,
            mb: 4,
            textAlign: 'center'
          }}
        >
          About IlmZone
        </Typography>
        
        <Box sx={{ 
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 4,
          alignItems: 'center'
        }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h5" gutterBottom sx={{ color: 'secondary.main' }}>
              Our Mission
            </Typography>
            <Typography paragraph>
              IlmZone is dedicated to providing free, high-quality educational resources for 
              Matric and Intermediate students across Pakistan.
            </Typography>
            
            <Typography variant="h5" gutterBottom sx={{ color: 'secondary.main', mt: 3 }}>
              What We Offer
            </Typography>
            <Typography component="ul" sx={{ pl: 3 }}>
              <li>Free textbooks and study materials</li>
              <li>Comprehensive notes for all subjects</li>
              <li>Past papers with solutions</li>
              <li>Resources aligned with Pakistani curriculum</li>
            </Typography>
          </Box>
          
          <Box sx={{ 
            flex: 1,
            bgcolor: 'background.paper',
            p: 4,
            borderRadius: 2,
            boxShadow: 1
          }}>
            <Typography variant="h5" gutterBottom sx={{ color: 'accent.main' }}>
              Why Choose IlmZone?
            </Typography>
            <Typography paragraph>
              We believe education should be accessible to everyone, regardless of 
              financial background. Our resources are carefully curated by experienced 
              educators to ensure quality and relevance.
            </Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
}