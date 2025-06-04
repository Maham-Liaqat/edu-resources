// src/contexts/AdminContext.jsx
import { createContext, useState } from 'react';
import axios from '../api/axios';

export const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const login = async (password) => {
     console.log("Attempting login with password:", password); // Add this line
    try {
      // setLoading(true);
      // setError('');
      const response = await axios.post('/api/admin/login', { password });
       console.log("Server response:", response.data); // Add this line
      
      if (response.data.success) {
        localStorage.setItem('adminToken', response.data.token);
        setIsAdmin(true);
        return true;
      }
      return false;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setIsAdmin(false);
  };

  const checkAuth = async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) return false;
    
    try {
      const response = await axios.get('/api/admin/verify', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setIsAdmin(response.data.isValid);
      return response.data.isValid;
    } catch {
      return false;
    }
  };

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout, checkAuth, loading, error }}>
      {children}
    </AdminContext.Provider>
  );
}