// src/components/resources/ResourceGrid.jsx
import React from 'react';
import { Grid, Pagination, Box, CircularProgress, Typography } from '@mui/material';
import ResourceCard from './ResourceCard';

export default function ResourceGrid({ resources, loading, pagination, onPageChange, onCardClick }) {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (resources.length === 0) {
    return (
      <Typography variant="body1" color="text.secondary" textAlign="center">
        No resources available for this selection.
      </Typography>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {resources.map((resource) => (
          <Grid item xs={12} sm={6} md={4} key={resource._id}>
            <ResourceCard resource={resource} onCardClick={onCardClick} />
          </Grid>
        ))}
      </Grid>

      {pagination && pagination.pages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={pagination.pages}
            page={pagination.page}
            onChange={onPageChange}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
}