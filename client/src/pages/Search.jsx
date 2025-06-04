import { Typography, TextField } from '@mui/material';

export default function Search() {
  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        Search Resources
      </Typography>
      <TextField 
        fullWidth 
        label="Search..." 
        variant="outlined" 
      />
    </>
  );
}