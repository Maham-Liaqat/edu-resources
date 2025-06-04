// // src/pages/auth/Register.jsx
// import React, { useState } from 'react'; // Added useState import
// import { Box, Button, TextField, Typography } from '@mui/material';
// import { Link, useNavigate } from 'react-router-dom';
// // import { useAuth } from '../../contexts/AuthContext';

// export default function Register() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const { register } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await register(email, password);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Registration failed');
//     }
//   };

//   return (
//     <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8, p: 2 }}>
//       <Typography variant="h5" gutterBottom>
//         Register
//       </Typography>
//       {error && <Typography color="error">{error}</Typography>}
//       <form onSubmit={handleSubmit}>
//         <TextField
//           label="Email"
//           type="email"
//           fullWidth
//           margin="normal"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <TextField
//           label="Password"
//           type="password"
//           fullWidth
//           margin="normal"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
//           Register
//         </Button>
//       </form>
//       <Typography sx={{ mt: 2 }}>
//         Already have an account? <Link to="/login">Login</Link>
//       </Typography>
//     </Box>
//   );
// }