// src/pages/Upload.jsx
import { useContext, useEffect, useState } from 'react';
import { Container, Typography, TextField, MenuItem, Button, Box, CircularProgress, Alert, Paper, Card, CardContent, Divider, Stack, Avatar } from '@mui/material';
import { CloudUpload as CloudUploadIcon, Description as DescriptionIcon, PictureAsPdf as PdfIcon, InsertDriveFile as FileIcon, Image as ImageIcon } from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import { AdminContext } from '../contexts/AdminContext';
import { uploadResource } from '../api/resource';
import { EDUCATION_LEVELS, LEVELS, RESOURCE_TYPES } from '../utils/constants';

// Define SUBJECTS mapping
const SUBJECTS = {
  [LEVELS.CLASS_9]: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English'],
  [LEVELS.CLASS_10]: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English'],
  [LEVELS.FSC_PART1]: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English'],
  [LEVELS.FSC_PART2]: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English'],
};

export default function Upload() {
  const { isAdmin, loading: authLoading, adminToken } = useContext(AdminContext);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null); // For live preview
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    educationLevel: EDUCATION_LEVELS.MATRIC,
    level: LEVELS.CLASS_9,
    subject: '',
    resourceType: RESOURCE_TYPES.TEXTBOOK,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Reset subject when level changes
  useEffect(() => {
    const subjects = SUBJECTS[formData.level] || [];
    if (!subjects.includes(formData.subject)) {
      setFormData((prev) => ({
        ...prev,
        subject: subjects[0] || '',
      }));
    }
  }, [formData.level]);

  // Generate live preview for images and PDFs
  useEffect(() => {
    if (!file) {
      setFilePreview(null);
      return;
    }
    const fileType = file.type;
    if (fileType.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setFilePreview(<img src={url} alt="preview" style={{ maxWidth: 120, maxHeight: 160, borderRadius: 8, margin: '0 auto' }} onLoad={() => URL.revokeObjectURL(url)} />);
    } else if (fileType === 'application/pdf') {
      // Use <embed> for a simple PDF preview (first page)
      const url = URL.createObjectURL(file);
      setFilePreview(
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 1 }}>
          <embed src={url + '#page=1'} type="application/pdf" width="120" height="160" style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
          <Typography variant="caption" color="text.secondary">PDF Preview</Typography>
        </Box>
      );
    } else {
      setFilePreview(null);
    }
  }, [file]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
    },
    maxFiles: 1,
    maxSize: 25 * 1024 * 1024, // 25MB
    onDrop: (acceptedFiles, fileRejections) => {
      if (fileRejections.length > 0) {
        setError(fileRejections[0].errors[0].message);
        setFile(null);
        setFilePreview(null);
        return;
      }
      if (acceptedFiles.length > 0) {
        setFile(acceptedFiles[0]);
        setFormData((prev) => ({
          ...prev,
          title: acceptedFiles[0].name.replace(/\.[^/.]+$/, ''),
        }));
        setError('');
      }
    },
  });

  const validateForm = () => {
    if (!file) return 'Please select a file';
    if (!formData.title.trim()) return 'Title is required';
    if (!formData.educationLevel) return 'Education level is required';
    if (!formData.level) return 'Class level is required';
    if (!formData.subject) return 'Subject is required';
    if (!formData.resourceType) return 'Resource type is required';
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    if (!adminToken) {
      setError('Please log in as an admin to upload resources.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = new FormData();
      data.append('file', file);
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      const response = await uploadResource(data);
      if (response.success) {
        navigate(`/${formData.resourceType}/${formData.level}`);
      } else if (response.message || (response.results && response.results.length > 0)) {
        const errorMsg = response.message || response.results.find((r) => !r.success)?.error || 'Unknown error';
        throw new Error(errorMsg);
      } else {
        throw new Error('Upload failed due to an unknown server error');
      }
    } catch (err) {
      setError(`Failed to upload resource: ${err.message}. Check server logs for details.`);
      console.error('Upload error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!isAdmin) return null;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'linear-gradient(135deg, #e3e9f7 0%, #f8fafc 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', py: 6 }}>
      <Container maxWidth="sm">
        <Card sx={{ p: 3, borderRadius: 4, boxShadow: 6 }}>
          <CardContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
              <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56, mb: 1 }}>
                <CloudUploadIcon fontSize="large" />
              </Avatar>
              <Typography variant="h5" fontWeight={700} sx={{ color: 'primary.main', mb: 1 }}>
                Upload Study Resource
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center">
                Fill in the details and upload a PDF, DOC, DOCX, or image file (max 25MB).
      </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
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
            mb: 3,
                  bgcolor: isDragActive ? 'grey.100' : 'background.paper',
                  transition: 'background 0.2s',
          }}
        >
          <input {...getInputProps()} />
                <CloudUploadIcon fontSize="large" color={isDragActive ? 'primary' : 'action'} />
                <Typography sx={{ mt: 1 }}>
                  {isDragActive ? 'Drop file here' : 'Drag & drop or click to select file (PDF, DOC, DOCX, Image)'}
          </Typography>
          {file && (
                  <Box sx={{ mt: 2, mb: 1 }}>
                    {filePreview ? (
                      filePreview
                    ) : (
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {file.type === 'application/pdf' ? <PdfIcon color="error" sx={{ fontSize: 40 }} /> :
                         file.type.startsWith('image/') ? <ImageIcon color="primary" sx={{ fontSize: 40 }} /> :
                         <FileIcon color="action" sx={{ fontSize: 40 }} />}
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                          {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
            </Typography>
                      </Box>
                    )}
                  </Box>
          )}
        </Paper>
              <Divider sx={{ my: 2 }} />
              <Stack spacing={2}>
        <TextField
          fullWidth
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
                  InputProps={{ startAdornment: <DescriptionIcon color="primary" sx={{ mr: 1 }} /> }}
        />
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          multiline
          rows={3}
        />
                <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            select
            fullWidth
            label="Education Level"
            name="educationLevel"
            value={formData.educationLevel}
            onChange={handleChange}
            required
          >
            <MenuItem value={EDUCATION_LEVELS.MATRIC}>Matric</MenuItem>
            <MenuItem value={EDUCATION_LEVELS.INTERMEDIATE}>Intermediate</MenuItem>
          </TextField>
          <TextField
            select
            fullWidth
            label="Class Level"
            name="level"
            value={formData.level}
            onChange={handleChange}
            required
          >
            <MenuItem value={LEVELS.CLASS_9}>Class 9</MenuItem>
            <MenuItem value={LEVELS.CLASS_10}>Class 10</MenuItem>
            <MenuItem value={LEVELS.FSC_PART1}>FSc Part 1</MenuItem>
            <MenuItem value={LEVELS.FSC_PART2}>FSc Part 2</MenuItem>
          </TextField>
        </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            select
            fullWidth
            label="Subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          >
            <MenuItem value="">Select Subject</MenuItem>
            {(SUBJECTS[formData.level] || []).map((subject) => (
              <MenuItem key={subject} value={subject}>
                {subject}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            fullWidth
            label="Resource Type"
            name="resourceType"
            value={formData.resourceType}
            onChange={handleChange}
            required
          >
            <MenuItem value={RESOURCE_TYPES.TEXTBOOK}>Textbook</MenuItem>
            <MenuItem value={RESOURCE_TYPES.NOTES}>Notes</MenuItem>
                    <MenuItem value={RESOURCE_TYPES.SYLLABUS}>Syllabus</MenuItem>
                    <MenuItem value={RESOURCE_TYPES.PAST_PAPERS}>Past Papers</MenuItem>
          </TextField>
        </Box>
        <Button
          type="submit"
          variant="contained"
                  fullWidth
          size="large"
                  disabled={loading}
          sx={{ py: 1.5, fontWeight: 600, fontSize: '1.1rem', mt: 2, bgcolor: '#28A745', color: '#fff', '&:hover': { bgcolor: '#218838' } }}
                  startIcon={<CloudUploadIcon />}
        >
          {loading ? <CircularProgress size={24} /> : 'Upload Resource'}
        </Button>
              </Stack>
      </Box>
          </CardContent>
        </Card>
    </Container>
    </Box>
  );
}