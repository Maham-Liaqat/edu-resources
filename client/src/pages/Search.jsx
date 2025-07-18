// src/pages/Search.jsx
import { useState, useEffect } from 'react';
import { Container, Typography, Box, CircularProgress, Alert } from '@mui/material';
import ResourceGrid from '../components/resources/ResourceGrid';
import axios from '../api/axios';
import { SEO } from '../components/seo/SEO';

export default function Search() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ page: 1, limit: 9, total: 0, pages: 1 });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    if (query) {
      fetchResources(query);
    }
  }, []);

  const fetchResources = async (searchQuery) => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        search: searchQuery,
        page: pagination.page,
        limit: pagination.limit,
      });

      const response = await axios.get(`/api/resources?${params}`);
      setResources(response.data.data);
      setPagination(response.data.pagination);
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to search resources. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (e, page) => {
    setPagination((prev) => ({ ...prev, page }));
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    if (query) {
      fetchResources(query);
    }
  };

  return (
    <>
      <SEO
        title="Search Results - IlmZone"
        description="Search results for educational resources on IlmZone."
        keywords="search resources, educational materials"
      />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h3" gutterBottom sx={{ color: 'primary.main' }}>
          Search Results
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : resources.length === 0 ? (
          <Typography variant="body1" color="text.secondary">
            No resources found. Try a different search term.
          </Typography>
        ) : (
          <ResourceGrid
            resources={resources}
            loading={loading}
            pagination={pagination}
            onPageChange={handlePageChange}
          />
        )}
      </Container>
    </>
  );
}