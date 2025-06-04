import React from 'react';
import { 
  Grid, 
  TextField, 
  MenuItem, 
  Select, 
  FormControl, 
  InputLabel, 
  Pagination, 
  Box,
  CircularProgress
} from '@mui/material';
import ResourceCard from './ResourceCard';

export default function ResourceGrid({ resources, loading }) {
  const [filters, setFilters] = React.useState({
    educationLevel: '',
    subject: '',
    sort: 'newest',
    search: '',
    page: 1
  });

  const itemsPerPage = 9;

  const filteredResources = resources
    .filter(resource => {
      // Filter by education level
      if (filters.educationLevel && resource.educationLevel !== filters.educationLevel) {
        return false;
      }
      // Filter by subject
      if (filters.subject && resource.subject !== filters.subject) {
        return false;
      }
      // Search
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        return (
          resource.title.toLowerCase().includes(searchTerm) ||
          resource.description.toLowerCase().includes(searchTerm)
        );
      }
      return true;
    })
    .sort((a, b) => {
      // Sort by date
      return filters.sort === 'newest' 
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt);
    });

  // Pagination
  const pageCount = Math.ceil(filteredResources.length / itemsPerPage);
  const paginatedResources = filteredResources.slice(
    (filters.page - 1) * itemsPerPage,
    filters.page * itemsPerPage
  );

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value,
      page: 1 // Reset to first page when filters change
    }));
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Filter Controls */}
      <Box sx={{ 
        display: 'flex', 
        gap: 2, 
        mb: 3,
        flexDirection: { xs: 'column', sm: 'row' }
      }}>
        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel>Education Level</InputLabel>
          <Select
            value={filters.educationLevel}
            onChange={(e) => handleFilterChange('educationLevel', e.target.value)}
            label="Education Level"
          >
            <MenuItem value="">All Levels</MenuItem>
            <MenuItem value="matric">Matric</MenuItem>
            <MenuItem value="intermediate">Intermediate</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel>Subject</InputLabel>
          <Select
            value={filters.subject}
            onChange={(e) => handleFilterChange('subject', e.target.value)}
            label="Subject"
            disabled={!filters.educationLevel}
          >
            <MenuItem value="">All Subjects</MenuItem>
            {filters.educationLevel === 'matric' && [
              <MenuItem key="physics" value="physics">Physics</MenuItem>,
              <MenuItem key="chemistry" value="chemistry">Chemistry</MenuItem>,
              <MenuItem key="biology" value="biology">Biology</MenuItem>,
              <MenuItem key="computer science" value="computer science">Computer Science</MenuItem>,
              <MenuItem key="math" value="math">Mathametics</MenuItem>,
              <MenuItem key="urdu" value="urdu">Urdu</MenuItem>,
              <MenuItem key="islamiyat" value="islamiyat">Islamiyat</MenuItem>,
              <MenuItem key="islamiyat" value="islamiyat">Pakistan Studies</MenuItem>,
              <MenuItem key="tarjama tul quran" value="tarjama tul quran">Tarjama tul Quran</MenuItem>
              // Add other matric subjects
            ]}
            {filters.educationLevel === 'intermediate' && [
              <MenuItem key="fsc-physics" value="physics">Physics</MenuItem>,
              <MenuItem key="fsc-chemistry" value="chemistry">Chemistry</MenuItem>,
              <MenuItem key="fsc-biology" value="biology">Biology</MenuItem>,
              <MenuItem key="fsc-computer science" value="computer science">Computer Science</MenuItem>,
              <MenuItem key="fsc-math" value="math">Mathametics</MenuItem>,
              <MenuItem key="fsc-urdu" value="urdu">Urdu</MenuItem>,
              <MenuItem key="fsc-islamiyat" value="islamiyat">Islamiyat</MenuItem>,
              <MenuItem key="fsc-islamiyat" value="islamiyat">Pakistan Studies</MenuItem>,
              <MenuItem key="fsc-tarjama tul quran" value="tarjama tul quran">Tarjama tul Quran</MenuItem>
              // Add other intermediate subjects
            ]}
          </Select>
        </FormControl>

        {/* <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={filters.sort}
            onChange={(e) => handleFilterChange('sort', e.target.value)}
            label="Sort By"
          >
            <MenuItem value="newest">Newest First</MenuItem>
            <MenuItem value="oldest">Oldest First</MenuItem>
          </Select>
        </FormControl> */}

        <TextField
          label="Search Resources"
          variant="outlined"
          fullWidth
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
        />
      </Box>

      {/* Resource Grid */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Grid container spacing={3}>
            {paginatedResources.map((resource) => (
              <Grid item xs={12} sm={6} md={4} key={resource._id}>
                <ResourceCard resource={resource} />
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}
          {pageCount > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={pageCount}
                page={filters.page}
                onChange={(e, page) => handleFilterChange('page', page)}
                color="primary"
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
}