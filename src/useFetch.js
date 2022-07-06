import { useEffect, useState } from 'react';
import axios from 'axios';
import { API } from './api';
import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';

export function useFetch(url) {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = user.token;
  const headers = { headers: { Authorization: `Bearer ${token}` } };

  console.log(url);

  useEffect(() => {
    setLoading(true);
    axios
      .get(API + url, headers)
      .then((response) => {
        console.log(response);
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url]);

  const refetch = () => {
    setLoading(true);
    axios
      .get(API + url, headers)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { data, loading, error, refetch };
}

export function useUpload(url, formData) {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = user.token;
  const headers = { headers: { Authorization: `Bearer ${token}` } };

  console.log(url);

  useEffect(() => {
    setLoading(true);
    axios
      .post(API + url, formData, headers)
      .then((response) => {
        console.log(response);
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url, formData]);

  return { data, loading, error };
}

export function useDelete(url) {
  const { user } = useContext(AuthContext);
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const token = user.token;
  const headers = { headers: { Authorization: `Bearer ${token}` } };

  console.log(url);

  useEffect(() => {
    setLoading(true);
    axios
      .delete(API + url, headers)
      .then((response) => {
        console.log(response);
        setSuccess('Deleted Successfully');
      })
      .catch((err) => {
        console.log(err);
        setError('Failed to Delete');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [url]);

  return { success, loading, error };
}
