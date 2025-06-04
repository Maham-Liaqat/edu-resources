// src/components/resources/ResourceCard.jsx
import React from 'react' // Required for JSX
import { Card, CardMedia, CardContent, Button, Typography } from '@mui/material';
import { motion } from 'framer-motion';

export default function ResourceCard({ resource }) {
  return (
    <motion.div whileHover={{ y: -5 }}>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardMedia
          component="img"
          height="160"
          image={resource.thumbnail || '/book-placeholder.jpg'}
          alt={resource.title}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h6">
            {resource.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {resource.description}
          </Typography>
        </CardContent>
        <Button 
          variant="contained" 
          fullWidth
          href={resource.downloadUrl}
          target="_blank"
        >
          Download
        </Button>
      </Card>
    </motion.div>
  );
}