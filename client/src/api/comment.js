// src/api/comment.js
import axios from './axios';

export const getComments = async (resourceId) => {
  try {
    const response = await axios.get(`/api/comments/resource/${resourceId}`);
    // Return the data array, fallback to empty array if not present or not an array
    return Array.isArray(response.data) ? response.data : response.data.data || [];
  } catch (error) {
    console.error('Error fetching comments:', error.message, error.response?.data);
    throw error;
  }
};

export const postComment = async (resourceId, commentData) => {
  try {
    const response = await axios.post(`/api/comments/resource/${resourceId}`, commentData);
    return response.data;
  } catch (error) {
    console.error('Error posting comment:', error.message, error.response?.data);
    throw error;
  }
};

export const postReply = async (commentId, replyData) => {
  try {
    const response = await axios.post(`/api/comments/reply/${commentId}`, replyData);
    return response.data;
  } catch (error) {
    console.error('Error posting reply:', error.message, error.response?.data);
    throw error;
  }
};