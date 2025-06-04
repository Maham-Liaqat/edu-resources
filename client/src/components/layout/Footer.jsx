// src/components/layout/Footer.jsx
import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material'; // Added Container import
import { Facebook, Twitter, Instagram } from '@mui/icons-material';

export default function Footer() {
  return (
    <Box sx={{ bgcolor: 'background.paper', py: 4, mt: 'auto' }}>
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          {'© '}
          {new Date().getFullYear()}
          {' IlmZone. All rights reserved.'}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
          <Link href="https://facebook.com" color="inherit" sx={{ mx: 1 }}>
            <Facebook />
          </Link>
          <Link href="https://twitter.com" color="inherit" sx={{ mx: 1 }}>
            <Twitter />
          </Link>
          <Link href="https://instagram.com" color="inherit" sx={{ mx: 1 }}>
            <Instagram />
          </Link>
        </Box>
      </Container>
    </Box>
  );
}