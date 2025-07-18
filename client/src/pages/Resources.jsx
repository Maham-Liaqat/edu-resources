// src/pages/Resources.jsx
import { React,useState, useEffect } from 'react';
import { 
  Container,
  Grid,
  CircularProgress,
  Typography,
  TextField,
  MenuItem,
  Pagination,
  Stack,
  Box,
  Chip
} from '@mui/material';
import ResourceCard from '../components/resources/ResourceCard';

// Constants for better maintainability
const EDUCATION_LEVELS = {
  MATRIC: 'matric',
  INTERMEDIATE: 'intermediate'
};

const SUBJECTS = {
  [EDUCATION_LEVELS.Class]: [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 
    'English', 'Computer Science', 'Islamiyat', 
    'Tarjama tul Quran', 'Pakistan Studies'
  ],
  [EDUCATION_LEVELS.INTERMEDIATE]: [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 
    'English', 'Computer Science', 'Islamiyat', 
    'Tarjama tul Quran', 'Pakistan Studies'
  ]
};

const PAGE_SIZE = 9;

export default function Resources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    educationLevel: '',
    subject: '',
    search: '',
    page: 1
  });
  const [totalPages, setTotalPages] = useState(1);

  // Fetch resources when filters change
  useEffect(() => {
    const fetchResources = async () => {
      try {
        setLoading(true);
        const queryParams = new URLSearchParams({
          ...filters,
          limit: PAGE_SIZE,
          skip: (filters.page - 1) * PAGE_SIZE
        }).toString();
        
        const response = await axios.get(`/resources?${queryParams}`);
        const { data, total } = response.data;
        
        setResources(data);
        setTotalPages(Math.ceil(total / PAGE_SIZE));
      } catch (error) {
        console.error('Error fetching resources:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, [filters]);

  // Reset to page 1 when other filters change
  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value,
      page: 1  // Reset to first page when filters change
    }));
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, color: '#28A745', fontWeight: 700 }}>
        Study Resources
      </Typography>
      
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
        {/* Filters Sidebar */}
        <Box sx={{ width: { md: 250 }, flexShrink: 0 }}>
          <Typography variant="h6" gutterBottom sx={{ color: '#28A745', fontWeight: 600 }}>Filters</Typography>
          
          <TextField
            select
            fullWidth
            label="Education Level"
            value={filters.educationLevel}
            onChange={(e) => handleFilterChange('educationLevel', e.target.value)}
            sx={{ mb: 2 }}
          >
            <MenuItem value="">All Levels</MenuItem>
            <MenuItem value={EDUCATION_LEVELS.MATRIC}>Matric</MenuItem>
            <MenuItem value={EDUCATION_LEVELS.INTERMEDIATE}>Intermediate</MenuItem>
          </TextField>

          <TextField
            select
            fullWidth
            label="Subject"
            value={filters.subject}
            onChange={(e) => handleFilterChange('subject', e.target.value)}
            disabled={!filters.educationLevel}
            sx={{ mb: 2 }}
          >
            <MenuItem value="">All Subjects</MenuItem>
            {filters.educationLevel && 
              SUBJECTS[filters.educationLevel]?.map((subject) => (
                <MenuItem key={subject} value={subject}>
                  {subject}
                </MenuItem>
              ))
            }
          </TextField>

          {/* Active filters chips */}
          {(filters.educationLevel || filters.subject) && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Active Filters:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {filters.educationLevel && (
                  <Chip 
                    label={`Level: ${filters.educationLevel}`}
                    onDelete={() => handleFilterChange('educationLevel', '')}
                    sx={{ borderColor: '#28A745', color: '#28A745', fontWeight: 600 }}
                  />
                )}
                {filters.subject && (
                  <Chip 
                    label={`Subject: ${filters.subject}`}
                    onDelete={() => handleFilterChange('subject', '')}
                    sx={{ borderColor: '#007BFF', color: '#007BFF', fontWeight: 600 }}
                  />
                )}
              </Box>
            </Box>
          )}
        </Box>

        {/* Main Content Area */}
        <Box sx={{ flexGrow: 1 }}>
          <TextField
            fullWidth
            label="Search Resources"
            variant="outlined"
            sx={{ mb: 3 }}
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            placeholder="Search by title, description..."
          />

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <CircularProgress />
            </Box>
          ) : resources.length === 0 ? (
            <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ mt: 4 }}>
              {filters.search || filters.subject || filters.educationLevel
                ? "No resources match your filters"
                : "No resources available yet"}
            </Typography>
          ) : (
            <>
              <Grid container spacing={3}>
                {resources.map((resource) => (
                  <Grid item xs={12} sm={6} md={4} key={resource._id}>
                    <ResourceCard resource={resource} />
                  </Grid>
                ))}
              </Grid>

              {totalPages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                  <Pagination
                    count={totalPages}
                    page={filters.page}
                    onChange={(_, page) => handleFilterChange('page', page)}
                    color="primary"
                    shape="rounded"
                  />
                </Box>
              )}
            </>
          )}
        </Box>
      </Stack>
    </Container>
  );
}