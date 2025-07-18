// src/contexts/AdminContext.jsx
import { createContext, useState, useEffect } from 'react';
import axios from '../api/axios';
import { jwtDecode } from 'jwt-decode'; // Changed from 'import jwt from "jwt-decode";'

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken'));

  const login = async (password) => {
    try {
      const response = await axios.post('/api/admin/login', { password });
      const token = response.data.token;
      localStorage.setItem('adminToken', token);
      setAdminToken(token); // Sync state with new token

      // Decode token to verify payload
      const decodedToken = jwtDecode(token); // Use jwtDecode instead of jwt
      if (!decodedToken.id) {
        throw new Error('Token does not contain a user ID');
      }

      setIsAdmin(true);
      return true;
    } catch (error) {
      setIsAdmin(false);
      throw new Error('Login failed. Please check your password or server status.');
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setAdminToken(null); // Clear token state
    setIsAdmin(false);
  };

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('adminToken');
      if (token) {
        try {
          const response = await axios.get('/api/admin/verify', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setIsAdmin(true);
          setAdminToken(token); // Ensure state matches localStorage
        } catch (error) {
          localStorage.removeItem('adminToken');
          setAdminToken(null);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    };

    verifyToken();
  }, []);

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout, loading, adminToken }}>
      {children}
    </AdminContext.Provider>
  );
};