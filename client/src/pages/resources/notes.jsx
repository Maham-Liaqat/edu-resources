// src/pages/resources/Notes.jsx
import { useState, useEffect } from 'react';
import { Container, Typography, Box, CircularProgress, Alert, Grid, Card, CardActionArea, CardContent } from '@mui/material';
import { Description as DescriptionIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function Notes() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubjects = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch all notes resources
        // const data = await getResources({ resourceType: 'notes' });
        // const resources = data.data || [];
        // // Extract unique subjects
        // const subjectMap = {};
        // resources.forEach((res) => {
        //   if (res.subject) {
        //     const slug = res.subject.toLowerCase().replace(/\s+/g, '-');
        //     if (!subjectMap[slug]) {
        //       subjectMap[slug] = { name: res.subject, slug };
        //     }
        //   }
        // });
        // setSubjects(Object.values(subjectMap));
      } catch (err) {
        setError('Failed to load subjects.');
      } finally {
        setLoading(false);
      }
    };
    fetchSubjects();
  }, []);

  const classes = [
    { name: 'Class 9', slug: 'class-9' },
    { name: 'Class 10', slug: 'class-10' },
    { name: 'FSc Part 1', slug: 'fsc-part-1' },
    { name: 'FSc Part 2', slug: 'fsc-part-2' }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom sx={{ color: 'primary.main' }}>
        Notes - Select Class
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ mt: 4 }}>
          <Grid container spacing={4} justifyContent="center">
            {classes.map(cls => (
              <Grid item xs={12} sm={6} md={3} key={cls.slug}>
                <Card sx={{
                  textAlign: 'center',
                  borderRadius: 3,
                  boxShadow: 2,
                  backgroundColor: '#FFF9C4',
                  transition: 'transform 0.25s cubic-bezier(.4,2,.6,1), box-shadow 0.25s cubic-bezier(.4,2,.6,1)',
                  '&:hover': {
                    transform: 'scale(1.06)',
                    boxShadow: '0 8px 32px rgba(40,167,69,0.18)'
                  }
                }}>
                  <CardActionArea onClick={() => navigate(`/notes/${cls.slug}`)}>
                    <CardContent>
                      <DescriptionIcon sx={{ fontSize: 48, color: '#007BFF', mb: 1 }} />
                      <Typography variant="h5" fontWeight={600}>
                        {cls.name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
}