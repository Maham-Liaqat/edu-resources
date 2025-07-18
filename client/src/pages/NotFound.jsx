// src/pages/NotFound.jsx
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        bgcolor: '#f5f5f5',
        padding: 2,
      }}
    >
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, type: 'spring', stiffness: 100 }}
      >
        <img
          src="src/assets/images/astronaut-floating.png"
          alt="Astronaut floating"
          style={{ maxWidth: '300px', marginBottom: '20px' }}
        />
      </motion.div>

      <Typography variant="h1" color="primary" gutterBottom>
        404 - Lost in Space!
      </Typography>
      <Typography variant="h5" color="text.secondary" paragraph>
        Oops! It looks like you've drifted into an uncharted galaxy. The page you're looking for doesn’t exist.
      </Typography>

      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={() => navigate('/')}
          sx={{ mt: 2, padding: '10px 20px' }}
        >
          Back to Home Base
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        style={{ marginTop: '20px' }}
      >
        <Typography variant="body2" color="text.secondary">
          Pro tip: Check your navigation or contact mission control if you need help!
        </Typography>
      </motion.div>
    </Box>
  );
};

export default NotFound;