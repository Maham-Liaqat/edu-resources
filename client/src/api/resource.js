// src/api/resource.js
import axios from './axios';

export const uploadResource = async (formData) => {
  try {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      throw new Error('No admin token available. Please log in again.');
    }

    const response = await axios.post('/api/resources/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Upload response:', response.data); // Debug
    return response.data;
  } catch (error) {
    console.error('Upload error:', error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message ||
      error.response?.data?.error ||
      'Failed to upload resource. Check server logs or log in again.'
    );
  }
};

// Fetch resources with optional query params
export const getResources = async (params = {}) => {
  try {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.append(key, value);
      }
    });
    const response = await axios.get(`/api/resources?${searchParams.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Get resources error:', error.response?.data || error.message);
    throw error;
  }
};