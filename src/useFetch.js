import { useEffect, useState } from 'react';
import axios from 'axios';
import { API } from './api';
import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';

function useFetch(url) {
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

export default useFetch;
