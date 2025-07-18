// src/pages/resources/Textbooks.jsx
import { Container, Typography, Box, Grid, Card, CardActionArea, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { School as SchoolIcon } from '@mui/icons-material';

const classes = [
  { name: 'Class 9', slug: 'class-9' },
  { name: 'Class 10', slug: 'class-10' },
  { name: 'FSc Part 1', slug: 'fsc-part-1' },
  { name: 'FSc Part 2', slug: 'fsc-part-2' }
];

export default function Textbooks() {
  const navigate = useNavigate();
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#000000', fontWeight: 500 }}>
        Textbooks - Select Class
      </Typography>
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
                <CardActionArea onClick={() => navigate(`/textbooks/${cls.slug}`)}>
                  <CardContent>
                    <SchoolIcon sx={{ fontSize: 48, color: '#28A745', mb: 1 }} />
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
    </Container>
  );
}