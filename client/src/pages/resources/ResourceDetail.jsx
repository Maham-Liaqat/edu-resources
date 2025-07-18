// src/pages/resources/ResourceDetail.jsx
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, CircularProgress, Alert, Card, CardContent, Button, Chip, Stack, Paper, Avatar, Badge, TextField } from '@mui/material';
import axios from '../../api/axios';
import { AdminContext } from '../../contexts/AdminContext';
import { UserContext } from '../../contexts/UserContext';
import { getComments, postComment, postReply } from '../../api/comment';
import dayjs from 'dayjs';
import { Book as BookIcon } from '@mui/icons-material';

export default function ResourceDetail() {
  const { id } = useParams();
  const { isLoggedIn, user } = useContext(UserContext);
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [replyText, setReplyText] = useState({}); // {commentId: replyText}
  const [commentLoading, setCommentLoading] = useState(false);
  const [commentError, setCommentError] = useState(null);

  useEffect(() => {
    const fetchResource = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`/api/resources/${id}`);
        setResource(response.data.data);
      } catch (err) {
        setError('Failed to load resource.');
      } finally {
        setLoading(false);
      }
    };
    fetchResource();
  }, [id]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await getComments(id);
        setComments(res.data || res);
      } catch (err) {
        // ignore for now
      }
    };
    if (id) fetchComments();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setCommentLoading(true);
    setCommentError(null);
    try {
      const comment = await postComment(id, { content: commentText, user: user?.name || 'Anonymous' });
      setComments([comment, ...comments]);
      setCommentText('');
    } catch (err) {
      setCommentError('Failed to post comment.');
    } finally {
      setCommentLoading(false);
    }
  };

  const handleReplySubmit = async (parentId) => {
    if (!replyText[parentId]?.trim()) return;
    setCommentLoading(true);
    setCommentError(null);
    try {
      const reply = await postReply(parentId, { content: replyText[parentId], user: user?.name || (isLoggedIn ? 'User' : 'Anonymous') });
      setComments(comments.map(c => c._id === parentId ? { ...c, replies: [reply, ...(c.replies || [])] } : c));
      setReplyText({ ...replyText, [parentId]: '' });
    } catch (err) {
      setCommentError('Failed to post reply.');
    } finally {
      setCommentLoading(false);
    }
  };

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
  }
  if (error) {
    return <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>;
  }
  if (!resource) {
    return <Typography>No resource found.</Typography>;
  }

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Card sx={{
        boxShadow: 6,
        borderRadius: 4,
        backgroundColor: '#fff',
        border: '1.5px solid #e0e0e0',
        transition: 'transform 0.25s cubic-bezier(.4,2,.6,1), box-shadow 0.25s cubic-bezier(.4,2,.6,1)',
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: '0 8px 32px rgba(40,167,69,0.12)'
        }
      }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 4 }}>
          <BookIcon sx={{ fontSize: 56, color: '#28A745', mb: 1 }} />
          <img
            src={resource.thumbnailUrl || '/book-placeholder.jpg'}
            alt={resource.title}
            style={{ width: 180, height: 240, objectFit: 'cover', borderRadius: 12, boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}
            onError={e => { e.target.onerror = null; e.target.src = '/book-placeholder.jpg'; }}
          />
        </Box>
        <CardContent>
          {/* Embedded Google Drive Viewer */}
          {resource.googleDriveLink && (
            <Box sx={{ my: 3, display: 'flex', justifyContent: 'center' }}>
              <iframe
                src={`https://drive.google.com/file/d/${extractGoogleDriveId(resource.googleDriveLink)}/preview`}
                width="100%"
                height="480"
                allow="autoplay"
                style={{ border: 0, borderRadius: 8 }}
                title="Resource Preview"
              />
            </Box>
          )}
          <Typography variant="h4" fontWeight={700} gutterBottom align="center" sx={{ color: '#000' }}>
            {resource.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }} align="center">
            {resource.description}
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 2, justifyContent: 'center' }}>
            {resource.year && <Chip label={`Year: ${resource.year}`} size="small" sx={{ bgcolor: '#e0e0e0', color: '#333' }} />}
            {resource.resourceType && <Chip label={resource.resourceType.replace(/[-_]/g, ' ').toUpperCase()} size="small" sx={{ bgcolor: '#28A745', color: '#fff' }} />}
            {resource.subject && <Chip label={resource.subject} size="small" sx={{ bgcolor: '#e0e0e0', color: '#333' }} />}
          </Stack>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            sx={{
              mt: 2,
              fontWeight: 700,
              fontSize: '1.15rem',
              py: 1.5,
              borderRadius: 3,
              boxShadow: '0 4px 16px rgba(40,167,69,0.12)',
              letterSpacing: 1,
              backgroundColor: '#28A745',
              '&:hover': {
                backgroundColor: '#218838',
                color: '#fff'
              }
            }}
            onClick={() => window.open(resource.googleDriveLink, '_blank')}
            download
          >
            Download
          </Button>
        </CardContent>
      </Card>
      {/* Comment Section */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" fontWeight={600} gutterBottom>Comments</Typography>
        {!isLoggedIn ? (
          <Alert severity="info">You must be logged in to comment.</Alert>
        ) : (
          <form onSubmit={handleCommentSubmit} style={{ marginBottom: 24 }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
              <Avatar sx={{ bgcolor: 'primary.main', mt: 0.5 }}>
                {user?.name?.[0]?.toUpperCase() || 'U'}
              </Avatar>
              <TextField
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                placeholder="Add a comment..."
                variant="outlined"
                size="small"
                multiline
                minRows={1}
                maxRows={4}
                sx={{ flex: 1, bgcolor: 'white' }}
                disabled={commentLoading}
              />
              <Button type="submit" variant="contained" disabled={commentLoading || !commentText.trim()} sx={{ height: 40, mt: 0.5 }}>
                {commentLoading ? 'Posting...' : 'Post'}
              </Button>
            </Box>
            {commentError && <Alert severity="error" sx={{ mt: 1 }}>{commentError}</Alert>}
          </form>
        )}
        <Box>
          {comments.length === 0 && <Typography color="text.secondary">No comments yet.</Typography>}
          {comments.map(comment => (
            <Paper key={comment._id} elevation={2} sx={{ mb: 3, p: 2, pl: 2, display: 'flex', alignItems: 'flex-start', bgcolor: '#f9f9f9' }}>
              <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                {comment.user?.[0]?.toUpperCase() || 'U'}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography fontWeight={600} sx={{ color: comment.user === 'Admin' ? 'secondary.main' : 'text.primary' }}>
                    {comment.user}
                    {comment.user === 'Admin' && (
                      <Badge color="secondary" badgeContent="Admin" sx={{ ml: 1 }} />
                    )}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {comment.createdAt ? dayjs(comment.createdAt).format('MMM D, YYYY, h:mm A') : ''}
                  </Typography>
                </Box>
                <Typography sx={{ mb: 1 }}>{comment.content}</Typography>
                {/* Replies */}
                {comment.replies && comment.replies.map((reply, idx) => (
                  <Paper key={reply._id || reply.createdAt || idx} elevation={0} sx={{ ml: 4, mb: 1, p: 1.5, bgcolor: '#f1f1f1', display: 'flex', alignItems: 'flex-start' }}>
                    <Avatar sx={{ bgcolor: reply.user === 'Admin' ? 'secondary.main' : 'primary.light', mr: 1.5, width: 28, height: 28, fontSize: 16 }}>
                      {reply.user?.[0]?.toUpperCase() || 'U'}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography fontWeight={600} sx={{ color: reply.user === 'Admin' ? 'secondary.main' : 'text.primary' }}>
                          {reply.user}
                          {reply.user === 'Admin' && (
                            <Badge color="secondary" badgeContent="Admin" sx={{ ml: 1 }} />
                          )}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {reply.createdAt ? dayjs(reply.createdAt).format('MMM D, YYYY, h:mm A') : ''}
                        </Typography>
                      </Box>
                      <Typography>{reply.content}</Typography>
                    </Box>
                  </Paper>
                ))}
                {/* Reply form */}
                {isLoggedIn && comment._id && (
                  <Box sx={{ ml: 4, mt: 1, display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                    <Avatar sx={{ bgcolor: 'primary.main', width: 28, height: 28, fontSize: 16, mt: 0.5 }}>
                      {user?.name?.[0]?.toUpperCase() || 'U'}
                    </Avatar>
                    <TextField
                      value={replyText[comment._id] || ''}
                      onChange={e => setReplyText({ ...replyText, [comment._id]: e.target.value })}
                      placeholder="Reply..."
                      variant="outlined"
                      size="small"
                      sx={{ flex: 1, bgcolor: 'white' }}
                      disabled={commentLoading}
                    />
                    <Button
                      size="small"
                      variant="outlined"
                      disabled={commentLoading || !(replyText[comment._id] || '').trim()}
                      onClick={() => handleReplySubmit(comment._id)}
                      sx={{ height: 36, mt: 0.5 }}
                    >
                      {commentLoading ? 'Replying...' : 'Reply'}
                    </Button>
                  </Box>
                )}
              </Box>
            </Paper>
          ))}
        </Box>
      </Box>
    </Container>
  );
}

// Helper to extract Google Drive file ID from a share link
function extractGoogleDriveId(link) {
  // Handles both https://drive.google.com/file/d/FILE_ID/view?usp=sharing and https://drive.google.com/open?id=FILE_ID
  const match = link.match(/\/file\/d\/([\w-]+)/) || link.match(/[?&]id=([\w-]+)/);
  return match ? match[1] : '';
}