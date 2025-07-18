// src/components/resources/SubjectGrid.jsx
import React from 'react';
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BookIcon from '@mui/icons-material/Book';
import { getResources } from '../../api/resource';

// Placeholder subject icons (can be extended or replaced)
const subjectIcons = {
  chemistry: <BookIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
  physics: <BookIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
  biology: <BookIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
  math: <BookIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
  computer: <BookIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
  english: <BookIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
  urdu: <BookIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
  islamiat: <BookIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
  default: <BookIcon sx={{ fontSize: 48, color: 'primary.main' }} />
};

export default function SubjectGrid({ subjects, basePath }) {
  const navigate = useNavigate();

  const handleSubjectClick = async (subject) => {
    // Show loading state (optional, not implemented here for brevity)
    try {
      const params = {
        subject: subject.slug.replace(/-/g, ' '),
        // Try to infer level from basePath if possible
        ...(basePath.includes('class-9') && { level: 'class-9' }),
        ...(basePath.includes('class-10') && { level: 'class-10' }),
        ...(basePath.includes('fsc-part-1') && { level: 'fsc-part-1' }),
        ...(basePath.includes('fsc-part-2') && { level: 'fsc-part-2' }),
        ...(basePath.includes('notes') && { resourceType: 'notes' }),
        ...(basePath.includes('syllabus') && { resourceType: 'syllabus' }),
        ...(basePath.includes('past-papers') && { resourceType: 'past-papers' })
      };
      const data = await getResources(params);
      const resources = data.data || [];
      if (resources.length === 1) {
        navigate(`/resource/${resources[0]._id}`);
      } else {
        navigate(`${basePath}/${subject.slug}`);
      }
    } catch (err) {
      // Fallback: just navigate as before
      navigate(`${basePath}/${subject.slug}`);
    }
  };

  return (
    <Grid container spacing={4} justifyContent="center">
      {subjects.map((subject) => (
        <Grid item xs={6} sm={4} md={3} lg={2} key={subject.slug}>
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
            <CardActionArea onClick={() => handleSubjectClick(subject)}>
              <Box sx={{ pt: 3 }}>{React.cloneElement(subjectIcons[subject.slug] || subjectIcons.default, { color: 'success', sx: { fontSize: 48, color: '#28A745', mb: 1 } })}</Box>
              <CardContent>
                <Typography variant="h6" fontWeight={600} sx={{ textTransform: 'capitalize' }}>
                  {subject.name}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
} 