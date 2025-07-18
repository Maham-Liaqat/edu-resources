import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, CircularProgress, Alert } from '@mui/material';
import ResourceGrid from '../../components/resources/ResourceGrid';
import { getResources } from '../../api/resource';
import SubjectGrid from '../../components/resources/SubjectGrid';

export default function SubjectResourceList({ level, resourceType }) {
  const { subject } = useParams();
  const navigate = useNavigate();
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = {
          ...(level && { level }),
          ...(resourceType && { resourceType }),
          ...(subject && { subject: subject.replace(/-/g, ' ') })
        };
        const data = await getResources(params);
        setResources(data.data || []);
        // If no subject param, extract unique subjects for the subject grid
        if (!subject) {
          const subjectMap = {};
          (data.data || []).forEach((res) => {
            if (res.subject) {
              const slug = res.subject.toLowerCase().replace(/\s+/g, '-');
              if (!subjectMap[slug]) {
                subjectMap[slug] = { name: res.subject, slug };
              }
            }
          });
          setSubjects(Object.values(subjectMap));
        }
      } catch (err) {
        setError('Failed to load resources.');
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, [level, resourceType, subject]);

  const handleCardClick = (resource) => {
    navigate(`/resource/${resource._id}`);
  };

  // If no subject param, show subject grid
  if (!subject) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ color: 'primary.main', mb: 3 }}>
          {level ? `${level.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())} Subjects` : 'Subjects'}
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
        <SubjectGrid
          subjects={subjects}
          basePath={`/${resourceType}/${level}`}
        />
      </Container>
    );
  }

  // If subject param, show resource cards for that subject
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ color: 'primary.main', mb: 3 }}>
        {subject ? subject.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'Resources'}
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
      <ResourceGrid resources={resources} loading={loading} onCardClick={handleCardClick} />
    </Container>
  );
} 