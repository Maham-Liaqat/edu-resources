import React from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import bookMascot from '../../assets/images/book.png';

const wittyMessages = [
  "Did you know? The word 'astronaut' means 'star sailor'!",
  "Tip: Take short breaks while studying for better focus!",
  "Fun Fact: The first book ever written was 'The Epic of Gilgamesh'.",
  "Quiz: What is the chemical symbol for water? (H2O!)",
  "Did you know? Reading for 6 minutes can reduce stress by 68%!"
];

function getRandomMessage() {
  return wittyMessages[Math.floor(Math.random() * wittyMessages.length)];
}

export default function LoadingScreen({ onRetry }) {
  const [message] = React.useState(getRandomMessage());

  return ( 
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        gap: 4,
        position: 'relative',
        overflow: 'hidden',
        '::before': {
          content: '""',
          position: 'fixed',
          zIndex: -1,
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: '#181f25',
        }
      }}
    >
      {/* Animated Book Mascot */}
      <Box
        component="img"
        src={bookMascot}
        alt="Book Mascot"
        sx={{
          width: 140,
          mb: 2,
          animation: 'bounce 1.8s infinite cubic-bezier(.68,-0.55,.27,1.55)',
          boxShadow: '0 8px 32px 0 rgba(40,167,69,0.18), 0 0 24px 0 #28A74544',
          background: 'transparent',
          borderRadius: 4
        }}
      />
      {/* Playful Spinner */}
      <Box sx={{ position: 'relative', display: 'inline-flex', mb: 2 }}>
        <CircularProgress size={60} thickness={5} sx={{ color: '#fff' }} />
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 28,
            color: '#28A745',
            fontWeight: 700
          }}
        >
          🚀
        </Box>
      </Box>
      {/* Witty/Educational Message */}
      <Typography variant="h6" sx={{ color: '#fff', mb: 2, maxWidth: 400 }}>
        {message}
      </Typography>
      {/* Retry Button */}
      <Button
        variant="contained"
        color="primary"
        size="large"
        startIcon={<RefreshIcon />}
        sx={{
          mt: 2,
          fontWeight: 600,
          borderRadius: 2,
          px: 4,
          bgcolor: '#28A745',
          color: '#fff',
          boxShadow: '0 4px 16px rgba(40,167,69,0.15)',
          '&:hover': { bgcolor: '#218838', color: '#fff', boxShadow: '0 6px 24px rgba(40,167,69,0.22)' }
        }}
        onClick={() => (onRetry ? onRetry() : window.location.reload())}
      >
        Retry
      </Button>
      {/* Keyframes for floating animation */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-24px); }
          100% { transform: translateY(0); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          20% { transform: translateY(-18px); }
          40% { transform: translateY(-30px); }
          60% { transform: translateY(-18px); }
          80% { transform: translateY(-8px); }
        }
      `}</style>
    </Box>
  );
}