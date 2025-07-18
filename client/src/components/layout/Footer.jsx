// src/components/layout/Footer.jsx
import React from 'react';
import { Box, Container, Typography, Link, Stack } from '@mui/material';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';

export default function Footer() {
  return (
    <Box sx={{
      bgcolor: 'background.paper',
      py: 4,
      mt: 'auto',
      borderTop: '5px solid',
      borderImage: 'linear-gradient(170deg, #28A745 0%, #007BFF 100%) 1',
      boxShadow: '0 -2px 12px #e0e0e0',
    }}>
      <Container maxWidth="lg">
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" spacing={2} sx={{ mb: 2 }}>
          <Stack direction="row" spacing={3} alignItems="center">
            <Link component={NavLink} to="/" color="text.primary" underline="none" sx={{ fontWeight: 500, fontSize: '0.8rem', '&:hover': { color: '#28A745' } }}>Home</Link>
            <Link component={NavLink} to="/about" color="text.primary" underline="none" sx={{ fontWeight: 500, fontSize: '0.8rem', '&:hover': { color: '#28A745' } }}>About</Link>
            <Link component={NavLink} to="/contact" color="text.primary" underline="none" sx={{ fontWeight: 500, fontSize: '0.8rem', '&:hover': { color: '#28A745' } }}>Contact</Link>
            <Link component={NavLink} to="/textbooks" color="text.primary" underline="none" sx={{ fontWeight: 500, fontSize: '0.8rem', '&:hover': { color: '#28A745' } }}>Textbooks</Link>
            <Link component={NavLink} to="/notes" color="text.primary" underline="none" sx={{ fontWeight: 500, fontSize: '0.8rem', '&:hover': { color: '#28A745' } }}>Notes</Link>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Link href="https://facebook.com" color="inherit" sx={{ mx: 0.5, '&:hover svg': { color: '#28A745' } }} aria-label="Facebook">
              <Facebook fontSize="medium" />
            </Link>
            <Link href="https://twitter.com" color="inherit" sx={{ mx: 0.5, '&:hover svg': { color: '#007BFF' } }} aria-label="Twitter">
              <Twitter fontSize="medium" />
            </Link>
            <Link href="https://instagram.com" color="inherit" sx={{ mx: 0.5, '&:hover svg': { color: '#28A745' } }} aria-label="Instagram">
              <Instagram fontSize="medium" />
            </Link>
          </Stack>
        </Stack>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ fontSize: '1rem' }}>
          {'© '}
          {new Date().getFullYear()}
          {' IlmZone. All rights reserved.'}            
        </Typography>
      </Container>
    </Box>
  );
}