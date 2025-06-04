import React, { useState, useEffect, useContext } from 'react';
import { 
  Paper, 
  Typography, 
  TextField,
  MenuItem,
  Button,
  Box,
  CircularProgress,
  Alert,
   Container
} from '@mui/material';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material'; // Corrected import
import { useDropzone } from 'react-dropzone';
import { uploadResource } from '../api/resource';
// import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { AdminContext } from '../contexts/AdminContext';

export default function Upload() {
  const { isAdmin } = useContext(AdminContext);
  // const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    educationLevel: 'matric',
    level: 'class-9',
    subject: 'Physics',
    resourceType: 'textbook'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1,
    onDrop: acceptedFiles => {
      if (acceptedFiles.length > 0) {
        setFile(acceptedFiles[0]);
        setFormData(prev => ({
          ...prev,
           title: acceptedFiles[0].name.replace(/\.[^/.]+$/, "") // Remove extension
        }));
      }
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const data = new FormData();
      data.append('file', file);
      Object.keys(formData).forEach(key => {
        data.append(key, formData[key]);
      });

      await uploadResource(data);
      navigate(`/${formData.resourceType}s/${formData.level}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

 useEffect(() => {
    if (!isAdmin) {
      navigate('/admin/login');
    }
  }, [isAdmin]);

  if (!isAdmin) {
    return null; // or a loading spinner
  }

  // if (!currentUser) {
  //   navigate('/login');
  //   return null;
  // }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>Upload Resource</Typography>
      
      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      <Box component="form" onSubmit={handleSubmit}>
        <Paper
          {...getRootProps()}
          sx={{
            p: 4,
            border: '2px dashed',
            borderColor: isDragActive ? 'primary.main' : 'divider',
            textAlign: 'center',
            cursor: 'pointer',
            mb: 3
          }}
        >
          <input {...getInputProps()} />
          <CloudUploadIcon fontSize="large" />
          <Typography>
            {isDragActive ? 'Drop file here' : 'Drag & drop or click to select file'}
          </Typography>
          {file && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
            </Typography>
          )}
        </Paper>

        <TextField
          fullWidth
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          multiline
          rows={3}
          sx={{ mb: 2 }}
        />

        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField
            select
            fullWidth
            label="Education Level"
            name="educationLevel"
            value={formData.educationLevel}
            onChange={handleChange}
          >
            <MenuItem value="matric">Matric</MenuItem>
            <MenuItem value="intermediate">Intermediate</MenuItem>
          </TextField>

          <TextField
            select
            fullWidth
            label="Class Level"
            name="level"
            value={formData.level}
            onChange={handleChange}
          >
            <MenuItem value="class-9">Class 9</MenuItem>
            <MenuItem value="class-10">Class 10</MenuItem>
            <MenuItem value="fsc-part-1">FSc Part 1</MenuItem>
            <MenuItem value="fsc-part-2">FSc Part 2</MenuItem>
          </TextField>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField
            select
            fullWidth
            label="Subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
          >
            <MenuItem value="Physics">Physics</MenuItem>
            <MenuItem value="Chemistry">Chemistry</MenuItem>
            <MenuItem value="Mathematics">Mathematics</MenuItem>
            <MenuItem value="Biology">Biology</MenuItem>
            <MenuItem value="Computer Science">Computer Science</MenuItem>
          </TextField>

          <TextField
            select
            fullWidth
            label="Resource Type"
            name="resourceType"
            value={formData.resourceType}
            onChange={handleChange}
          >
            <MenuItem value="textbook">Textbook</MenuItem>
            <MenuItem value="notes">Notes</MenuItem>
            <MenuItem value="past-paper">Past Paper</MenuItem>
          </TextField>
        </Box>

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={!file || loading}
          fullWidth
        >
          {loading ? <CircularProgress size={24} /> : 'Upload Resource'}
        </Button>
      </Box>
    </Container>
  );
}