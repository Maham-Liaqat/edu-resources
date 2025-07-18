// src/pages/resources/FscPart1.jsx
import { Container, Typography, Box, Grid, Card, CardActionArea, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Book as BookIcon, Description as DescriptionIcon, MenuBook as MenuBookIcon, Assignment as AssignmentIcon } from '@mui/icons-material';

const resourceTypes = [
  { name: 'Notes', slug: 'notes' },
  { name: 'Textbooks', slug: 'textbooks' },
  { name: 'Syllabus', slug: 'syllabus' },
  { name: 'Past Papers', slug: 'past-papers' }
];

const iconMap = {
  'textbooks': <BookIcon sx={{ fontSize: 48, color: '#28A745', mb: 1 }} />,
  'notes': <DescriptionIcon sx={{ fontSize: 48, color: '#007BFF', mb: 1 }} />,
  'syllabus': <MenuBookIcon sx={{ fontSize: 48, color: '#FFC107', mb: 1 }} />,
  'past-papers': <AssignmentIcon sx={{ fontSize: 48, color: '#6C757D', mb: 1 }} />
};

export default function FscPart1() {
  const navigate = useNavigate();
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#000' }}>
        FSc Part 1 - Select Resource Type
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Grid container spacing={4} justifyContent="center">
          {resourceTypes.map(type => (
            <Grid item xs={12} sm={6} md={3} key={type.slug}>
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
                <CardActionArea onClick={() => navigate(`/${type.slug}/fsc-part-1`)}>
                  <CardContent>
                    {iconMap[type.slug]}
                    <Typography variant="h5" fontWeight={600}>
                      {type.name}
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