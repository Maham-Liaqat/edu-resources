// src/pages/Home.jsx
import { 
  Container, 
  Button, 
  Typography, 
  Box, 
  Grid, 
  Card, 
  CardContent,
  CardActionArea,
  Chip,
  Stack
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { SEO } from '../components/seo/SEO';
import { 
  School as SchoolIcon,
  Book as BookIcon,
  Description as NotesIcon,
  Assignment as PastPapersIcon,
  MenuBook as SyllabusIcon,
  Star as StarIcon,
  People as PeopleIcon,
  Download as DownloadIcon
} from '@mui/icons-material';

export default function Home() {
  const navigate = useNavigate();

  const resourceTypes = [
    {
      title: 'Textbooks',
      description: 'Official textbooks for all subjects',
      icon: <BookIcon sx={{ fontSize: 40, color: '#28A745' }} />, // Green
      path: '/textbooks',
      color: 'primary'
    },
    {
      title: 'Notes',
      description: 'Comprehensive study notes',
      icon: <NotesIcon sx={{ fontSize: 40, color: '#007BFF' }} />, // Blue
      path: '/notes',
      color: 'secondary'
    },
    {
      title: 'Syllabus',
      description: 'Updated curriculum and syllabi',
      icon: <SyllabusIcon sx={{ fontSize: 40, color: '#007BFF' }} />, // Blue
      path: '/syllabus',
      color: 'primary'
    },
    {
      title: 'Past Papers',
      description: 'Previous years exam papers',
      icon: <PastPapersIcon sx={{ fontSize: 40, color: '#007BFF' }} />, // Blue
      path: '/past-papers',
      color: 'secondary'
    }
  ];

  const classes = [
    { name: 'Class 9', path: '/class-9', students: 'Matric Part 1' },
    { name: 'Class 10', path: '/class-10', students: 'Matric Part 2' },
    { name: 'FSc Part 1', path: '/fsc-part-1', students: 'Intermediate Part 1' },
    { name: 'FSc Part 2', path: '/fsc-part-2', students: 'Intermediate Part 2' }
  ];

  return (
    <>
      <SEO title="Free Educational Resources - IlmZone" />
      
      {/* Hero Section */}
      <Box sx={{ 
        background: 'white',
        color: 'secondary.main',
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '6px solid #e2e8f0',
      }}>
        {/* Background Pattern - subtle yellow dots */}
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.08,
          background: 'url("data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffe066\" fill-opacity=\"0.7\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }} />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography 
                variant="h1" 
                gutterBottom
                sx={{ 
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  fontWeight: 700,
                  lineHeight: 1.2,
                  color: 'text.primary', // Black heading
                }}
              >
                Free Study Materials for Pakistani Students
          </Typography>
              <Typography 
                variant="h5" 
                paragraph
                sx={{ 
                  mb: 4,
                  opacity: 0.9,
                  lineHeight: 1.5,
                  color: 'text.primary',
                }}
              >
                Access high-quality textbooks, notes, past papers, and syllabi for Class 9, 10, FSc Part 1 & 2. 
                Everything you need for academic success, completely free.
          </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Button 
            variant="contained" 
            size="large"
            onClick={() => navigate('/textbooks')}
                  sx={{ 
                    bgcolor: '#28A745',
                    color: '#fff',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    boxShadow: '0 2px 8px #F5F5F5',
                    '&:hover': {
                      bgcolor: '#218838'
                    }
                  }}
                >
                  Browse Resources
          </Button>
          <Button 
                  variant="contained" 
            size="large"
                  onClick={() => navigate('/about')}
                  sx={{ 
                    bgcolor: '#28A745',
                    color: '#fff',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    boxShadow: '0 2px 8px #F5F5F5',
                    '&:hover': {
                      bgcolor: '#218838'
                    }
                  }}
                >
                  Learn More
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%'
              }}>
                <SchoolIcon sx={{ 
                  fontSize: { xs: 240, md: 340 },
                  opacity: 0.5,
                  color: '#28A745',
                  filter: 'drop-shadow(0 4px 16px rgba(40,167,69,0.15))'
                }} />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Quick Access Section */}
      <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: 'grey.50' }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h2" 
            align="center" 
            gutterBottom
            sx={{ mb: 6 }}
          >
            What We Offer
          </Typography>
          
          <Grid container spacing={3}>
            {resourceTypes.map((resource) => (
              <Grid item xs={12} sm={6} md={3} key={resource.title}>
                <Card 
                  sx={{ 
                    height: '100%',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 40px rgba(0,0,0,0.15)'
                    }
                  }}
                  onClick={() => navigate(resource.path)}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ mb: 2 }}>
                      {resource.icon}
                    </Box>
                    <Typography variant="h5" gutterBottom fontWeight={600}>
                      {resource.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {resource.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* About Section */}
      <Box sx={{ py: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" gutterBottom>
          About IlmZone
        </Typography>
              <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                IlmZone is a free educational platform dedicated to making quality study materials 
                accessible to every Pakistani student. We believe that education should be free 
                and available to all, regardless of financial constraints.
              </Typography>
              <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                Our comprehensive collection includes official textbooks, detailed notes, 
                updated syllabi, and past examination papers for Matric and Intermediate levels. 
                All resources are carefully curated and regularly updated to ensure accuracy and relevance.
              </Typography>
              
              <Stack direction="row" spacing={3} sx={{ mt: 4 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="#28A745" fontWeight={600}>
                    1000+
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Resources
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="#007BFF" fontWeight={600}>
                    4
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Education Levels
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="#28A745" fontWeight={600}>
                    Free
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Forever
                  </Typography>
                </Box>
              </Stack>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                bgcolor: '#28A745',
                color: 'white',
                p: 4,
                borderRadius: 3,
                textAlign: 'center'
              }}>
                <Typography variant="h4" gutterBottom fontWeight={600}>
                  Our Mission
        </Typography>
                <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
                  To provide free, high-quality educational resources that empower students 
                  to achieve their academic goals and build a brighter future.
        </Typography>
                <Button 
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/about')}
                  sx={{ 
                    bgcolor: 'white',
                    color: '#28A745',
                    '&:hover': {
                      bgcolor: '#F5F5F5',
                      color: '#218838'
                    }
                  }}
                >
                  Read More
                </Button>
              </Box>
            </Grid>
          </Grid>
      </Container>
      </Box>

      {/* Classes Section */}
      <Box sx={{ py: { xs: 6, md: 8 }, bgcolor: 'grey.50' }}>
        <Container maxWidth="lg">
          <Typography variant="h2" align="center" gutterBottom sx={{ mb: 6 }}>
            Browse by Class
          </Typography>
          
          <Grid container spacing={3}>
            {classes.map((cls) => (
              <Grid item xs={12} sm={6} md={3} key={cls.name}>
                <Card 
                  sx={{ 
                    height: '100%',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                    }
                  }}
                  onClick={() => navigate(cls.path)}
                >
                  <CardContent sx={{ p: 4, textAlign: 'center' }}>
                    <SchoolIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                    <Typography variant="h5" gutterBottom fontWeight={600}>
                      {cls.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {cls.students}
                    </Typography>
                    <Chip 
                      label="View Resources" 
                      sx={{
                        borderColor: '#28A745',
                        color: '#28A745',
                        fontWeight: 600,
                        '&:hover': {
                          bgcolor: '#F5F5F5',
                          color: '#218838',
                          borderColor: '#218838'
                        }
                      }}
                      variant="outlined"
                      size="small"
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ 
        py: { xs: 6, md: 8 },
        color: 'white',
        background: 'linear-gradient(90deg, #28A745 0%, #007BFF 100%)'
      }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h3" gutterBottom fontWeight={600}>
            Ready to Start Learning?
          </Typography>
          <Typography variant="h6" paragraph sx={{ opacity: 0.9, mb: 4 }}>
            Join thousands of students who are already using IlmZone to excel in their studies.
          </Typography>
          <Button 
            variant="contained"
            size="large"
            onClick={() => navigate('/textbooks')}
            sx={{ 
              bgcolor: '#28A745',
              color: '#fff',
              px: 6,
              py: 2,
              fontSize: '1.2rem',
              fontWeight: 600,
              boxShadow: '0 2px 8px #21883822',
              '&:hover': {
                bgcolor: '#218838'
              }
            }}
          >
            Get Started Now
            </Button>
        </Container>
      </Box>
    </>
  );
}