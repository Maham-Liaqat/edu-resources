// src/api/resource.js
import axios from './axios';

export const uploadResource = async (formData) => {
  try {
    const response = await axios.post('/resources', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};