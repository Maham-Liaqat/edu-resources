// src/components/resources/ResourcePageTemplate.jsx
import { useState, useEffect } from 'react';
import { Container, 
  Typography, 
  TextField, 
  MenuItem,
  Box,
  CircularProgress,
  Alert } from '@mui/material';
import ResourceGrid from '../../components/resources/ResourceGrid';
import axios from '../../api/axios';
import { SEO } from '../../components/seo/SEO';

// Subject lists for different education levels
const SUBJECTS = {
  matric: [
    'Mathematics', 'Physics', 'Chemistry', 'Biology',
    'English', 'Computer Science', 'Islamiyat', 'Tarjama tul Quran',
    'Urdu', 'Pakistan Studies'
  ],
  intermediate: [
    'Mathematics', 'Physics', 'Chemistry', 'Biology',
    'English', 'Computer Science', 'Islamiyat', 'Tarjama tul Quran',
    'Urdu', 'Pakistan Studies'
  ]
};

export default function ResourcePageTemplate({ 
  level, 
  title, 
  description, 
  keywords,
   resourceType,
  customLoadingComponent,
  defaultSubject = ''
}) {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subject, setSubject] = useState(defaultSubject);
  const [searchQuery, setSearchQuery] = useState('');

  const educationLevel = level.includes('class') ? 'matric' : 'intermediate';

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const params = new URLSearchParams({
          ...(level && { level }),
          ...(resourceType && { resourceType }), // New filter
          ...(subject && { subject }),
          ...(searchQuery && { search: searchQuery })
        });

        const response = await axios.get(`/resources?${params}`);
        setResources(response.data);
      } catch (err) {
        console.error('Error fetching resources:', err);
        // setError('Failed to load resources. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, [level, resourceType, subject, searchQuery]);

  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <SEO 
        title={title} 
        description={description} 
        keywords={keywords} 
      />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h3" gutterBottom sx={{ color: 'primary.main' }}>
          {title}
        </Typography>
        
        {/* Filter Controls */}
        <Box sx={{ 
          display: 'flex', 
          gap: 2, 
          mb: 4,
          flexDirection: { xs: 'column', sm: 'row' }
        }}>
          <TextField
            select
            fullWidth
            label="Filter by Subject"
            value={subject}
            onChange={handleSubjectChange}
            sx={{ minWidth: 200 }}
          >
            <MenuItem value="">All Subjects</MenuItem>
            {SUBJECTS[educationLevel].map((subj) => (
              <MenuItem key={subj} value={subj}>
                {subj}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            label="Search Resources"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by title or description..."
          />
        </Box>

        {/* Error Display */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Custom or Default Loading */}
        {loading ? (
          customLoadingComponent || (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
            </Box>
          )
        ) : (
          <ResourceGrid resources={resources} />
        )}
      </Container>
    </>
  );
}