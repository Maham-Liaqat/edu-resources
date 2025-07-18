// src/hooks/useSafeFetch.js
import { useState, useEffect } from 'react';
import axios from '../api/axios';

export default function useSafeFetch(url) {
  const [state, setState] = useState({
    data: null,
    error: null,
    loading: true
  });

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        const data = response.data || {};
        console.log('Fetched data:', data);
        if (isMounted) setState({ data, error: null, loading: false });
      } catch (error) {
        console.error('Fetch error:', error.message);
        if (isMounted) setState({ data: null, error: error.message, loading: false });
      }
    };
    fetchData();
    return () => { isMounted = false; };
  }, [url]);

  return state;
}