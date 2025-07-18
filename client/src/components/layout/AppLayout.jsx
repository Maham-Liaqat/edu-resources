// src/components/layout/AppLayout.jsx
import { Box } from '@mui/material';
import Navbar from './Navbar';
import Footer from './Footer';
import AppRoutes from '../../Routes';

export default function AppLayout() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box component="main" sx={{ flex: 1 }}>
        <AppRoutes />
      </Box>
      <Footer />
    </Box>
  );
}