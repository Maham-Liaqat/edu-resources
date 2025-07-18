// src/components/resources/ResourceCard.jsx
import { useState, useEffect } from 'react';
import { 
  Card, 
  CardMedia, 
  CardContent, 
  CardActionArea, 
  Typography, 
  Box, 
  TextField, 
  Alert, 
  Chip
} from '@mui/material';
import { getComments, postComment } from '../../api/comment';
import { 
  Book as BookIcon,
  Description as NotesIcon,
  Assignment as PastPapersIcon,
  MenuBook as SyllabusIcon,
  Comment as CommentIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function ResourceCard({ resource, onCardClick }) {
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await getComments(resource._id);
        const commentsData = response.data || response;
        setComments(Array.isArray(commentsData) ? commentsData : commentsData.data || []);
      } catch (err) {
        setError('Failed to load comments. Please try again later.');
      }
    };
    fetchComments();
  }, [resource._id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !username.trim()) {
      setError('Comment and username are required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const comment = await postComment(resource._id, { content: newComment, user: username });
      setComments((prevComments) => [comment, ...prevComments]);
      setNewComment('');
      setUsername('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to post comment');
    } finally {
      setLoading(false);
    }
  };

  const getResourceIcon = (resourceType) => {
    const iconMap = {
      'textbooks': <BookIcon sx={{ fontSize: 20, color: 'primary.main' }} />,
      'notes': <NotesIcon sx={{ fontSize: 20, color: 'secondary.main' }} />,
      'syllabus': <SyllabusIcon sx={{ fontSize: 20, color: 'primary.main' }} />,
      'past_papers': <PastPapersIcon sx={{ fontSize: 20, color: 'secondary.main' }} />
    };
    return iconMap[resourceType] || <BookIcon sx={{ fontSize: 20, color: 'text.secondary' }} />;
  };

  const getResourceTypeLabel = (resourceType) => {
    const labelMap = {
      'textbooks': 'Textbook',
      'notes': 'Notes',
      'syllabus': 'Syllabus',
      'past_papers': 'Past Paper'
    };
    return labelMap[resourceType] || 'Resource';
  };

  return (
    <motion.div whileHover={{ y: -4 }}>
      <Card sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        overflow: 'visible'
      }}>
        <CardActionArea 
          onClick={() => navigate(`/resource/${resource._id}`)} 
          sx={{ flexGrow: 1 }}
        >
          <CardMedia
            component="img"
            height="180"
            image={resource.thumbnailUrl || '/book-placeholder.jpg'}
            alt={resource.title}
            sx={{ objectFit: 'cover' }}
          />
          <CardContent sx={{ flexGrow: 1, pb: 1 }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
              {getResourceIcon(resource.resourceType)}
              <Chip 
                label={getResourceTypeLabel(resource.resourceType)}
                size="small"
                variant="outlined"
                color={resource.resourceType === 'textbooks' || resource.resourceType === 'syllabus' ? 'primary' : 'secondary'}
              />
            </Stack>
            <Typography gutterBottom variant="h6" sx={{ 
              fontWeight: 600,
              lineHeight: 1.3,
              mb: 1
            }}>
              {resource.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ 
              mb: 2,
              lineHeight: 1.5
            }}>
              {resource.description}
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {resource.subject && (
                <Chip 
                  label={resource.subject} 
                  size="small" 
                  variant="outlined"
                  color="default"
                />
              )}
              {resource.year && (
                <Chip 
                  label={resource.year} 
                  size="small" 
                  variant="outlined"
                  color="default"
                />
              )}
            </Stack>
          </CardContent>
        </CardActionArea>

        {/* Comments Section */}
        <Box sx={{ p: 2, pt: 0 }}>
          <Button
            startIcon={<CommentIcon />}
            onClick={() => setShowComments(!showComments)}
            sx={{ 
              mb: showComments ? 2 : 0,
              color: 'text.secondary',
              '&:hover': { color: 'primary.main' }
            }}
            size="small"
          >
            {comments.length} Comments
          </Button>

          {showComments && (
            <>
              <Divider sx={{ mb: 2 }} />
              
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
              
          <List sx={{ maxHeight: 200, overflow: 'auto', mb: 2 }}>
            {comments.length === 0 && !error && (
                  <Typography variant="body2" color="text.secondary" textAlign="center">
                    No comments yet. Be the first to comment!
                  </Typography>
            )}
            {Array.isArray(comments) && comments.map((comment) => (
                  <ListItem key={comment._id} sx={{ px: 0 }}>
                <ListItemText
                  primary={comment.content}
                      secondary={
                        <Typography variant="caption" color="text.secondary">
                          By {comment.user} • {new Date(comment.createdAt).toLocaleDateString()}
                        </Typography>
                      }
                      sx={{
                        '& .MuiListItemText-primary': {
                          fontSize: '0.875rem',
                          lineHeight: 1.4
                        }
                      }}
                />
              </ListItem>
            ))}
          </List>

          <Box component="form" onSubmit={handleCommentSubmit}>
            <TextField
              fullWidth
              label="Your Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              size="small"
              sx={{ mb: 1 }}
            />
            <TextField
              fullWidth
              label="Add a comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              multiline
              rows={2}
              size="small"
              sx={{ mb: 1 }}
            />
            <Button
              type="submit"
              variant="contained"
              size="small"
              disabled={loading || !newComment.trim() || !username.trim()}
                  sx={{ minWidth: 120 }}
            >
                  {loading ? <CircularProgress size={16} /> : 'Post Comment'}
            </Button>
          </Box>
            </>
          )}
        </Box>
      </Card>
    </motion.div>
  );
}