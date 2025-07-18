// src/components/resources/ResourcePageTemplate.jsx
import { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  CircularProgress, 
  Alert,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Stack,
  Card,
  CardContent
} from '@mui/material';
import ResourceGrid from '../../components/resources/ResourceGrid';
import axios from '../../api/axios';
import { SEO } from '../../components/seo/SEO';
import React from 'react';
import { 
  School as SchoolIcon,
  Book as BookIcon,
  Description as NotesIcon,
  Assignment as PastPapersIcon,
  MenuBook as SyllabusIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function ResourcePageTemplate({
  level,
  title,
  description,
  keywords,
  resourceType,
  customLoadingComponent,
}) {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ page: 1, limit: 9, total: 0, pages: 1 });
  const [filters, setFilters] = useState({
    resourceType: resourceType || '',
    page: 1
  });

  const educationLevel = level?.includes('class') ? 'matric' : 'intermediate';

  // All resourceType values must be normalized (plural, dashed) to match backend and database
  const resourceTypes = [
    { value: '', label: 'All Resources', icon: <SchoolIcon /> },
    { value: 'textbooks', label: 'Textbooks', icon: <BookIcon /> },
    { value: 'notes', label: 'Notes', icon: <NotesIcon /> },
    { value: 'syllabus', label: 'Syllabus', icon: <SyllabusIcon /> },
    { value: 'past-papers', label: 'Past Papers', icon: <PastPapersIcon /> }
  ];

  const getLevelInfo = (level) => {
    const levelMap = {
      'class-9': { name: 'Class 9', description: 'Matric Part 1', color: 'primary' },
      'class-10': { name: 'Class 10', description: 'Matric Part 2', color: 'secondary' },
      'fsc-part-1': { name: 'FSc Part 1', description: 'Intermediate Part 1', color: 'primary' },
      'fsc-part-2': { name: 'FSc Part 2', description: 'Intermediate Part 2', color: 'secondary' }
    };
    return levelMap[level] || { name: level, description: '', color: 'primary' };
  };

  const levelInfo = getLevelInfo(level);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Fetching resources with params:', { level, resourceType: filters.resourceType, educationLevel, page: filters.page, limit: 9 });

        const params = new URLSearchParams({
          ...(level && { level }),
          ...(filters.resourceType && { resourceType: filters.resourceType }),
          ...(educationLevel && { educationLevel }),
          page: filters.page,
          limit: 9,
        });

        const response = await axios.get(`/api/resources?${params}`);
        console.log('API Response:', response.data);
        setResources(response.data.data || []);
        setPagination(response.data.pagination || { page: 1, limit: 9, total: 0, pages: 1 });
      } catch (err) {
        console.error('Error fetching resources:', err.message, err.response?.data);
        setError('Failed to load resources. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, [level, filters, educationLevel]);

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value,
      page: 1 // Reset to first page when filters change
    }));
  };

  const handlePageChange = (e, page) => {
    setFilters(prev => ({ ...prev, page }));
  };

  const handleCardClick = (resource) => {
    navigate(`/resource/${resource._id}`);
  };

  return (
    <>
      <SEO title={title} description={description} keywords={keywords} />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <SchoolIcon sx={{ fontSize: 60, color: `${levelInfo.color}.main` }} />
          </Box>
          <Typography variant="h2" gutterBottom fontWeight={600}>
            {levelInfo.name}
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', mb: 2 }}>
            {levelInfo.description}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
            {description}
          </Typography>
        </Box>

        {/* Resource Type Filter */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
            Browse by Resource Type
          </Typography>
          <Grid container spacing={2}>
            {resourceTypes.map((type) => (
              <Grid item xs={6} sm={4} md={2.4} key={type.value}>
                <Card 
                  sx={{ 
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    border: filters.resourceType === type.value ? 2 : 1,
                    borderColor: filters.resourceType === type.value ? `${levelInfo.color}.main` : 'grey.300',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                    }
                  }}
                  onClick={() => handleFilterChange('resourceType', type.value)}
                >
                  <CardContent sx={{ p: 2, textAlign: 'center' }}>
                    <Box sx={{ mb: 1 }}>
                      {React.cloneElement(type.icon, { 
                        sx: { 
                          fontSize: 30, 
                          color: filters.resourceType === type.value ? `${levelInfo.color}.main` : 'text.secondary' 
                        } 
                      })}
                    </Box>
                    <Typography 
                      variant="body2" 
                      fontWeight={filters.resourceType === type.value ? 600 : 400}
                      color={filters.resourceType === type.value ? `${levelInfo.color}.main` : 'text.primary'}
                    >
                      {type.label}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Active Filter Display */}
        {filters.resourceType && (
          <Box sx={{ mb: 3 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="body2" color="text.secondary">
                Showing:
        </Typography>
              <Chip
                label={resourceTypes.find(t => t.value === filters.resourceType)?.label}
                onDelete={() => handleFilterChange('resourceType', '')}
                color={levelInfo.color}
                variant="outlined"
                size="small"
              />
            </Stack>
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {loading ? (
          customLoadingComponent || (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
            </Box>
          )
        ) : (
          <ResourceGrid
            resources={resources}
            loading={loading}
            pagination={pagination}
            onPageChange={handlePageChange}
            onCardClick={handleCardClick}
          />
        )}

        {/* Empty State */}
        {!loading && resources.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <SchoolIcon sx={{ fontSize: 80, color: 'grey.400', mb: 2 }} />
            <Typography variant="h5" color="text.secondary" gutterBottom>
              No Resources Found
            </Typography>
            <Typography variant="body1" color="text.secondary">
              We're working on adding content for {levelInfo.name}. Please check back soon or try different filters.
            </Typography>
          </Box>
        )}
      </Container>
    </>
  );
}