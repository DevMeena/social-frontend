import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useFetch } from '../../useFetch';
import Post from '../post/Post';
import Share from '../share/Share';
import { Backdrop, CircularProgress } from '@mui/material';
import { Posts } from '../../dummyData';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function Feed() {
  const { id } = useParams();
  var url = `/post/timeline/all`;
  if (id) {
    url = url + '/' + id;
  }

  const { user } = useContext(AuthContext);

  const { data, loading, error, refetch } = useFetch(url);
  const [refresh, setRefresh] = useState('');

  React.useEffect(() => {
    refetch();
    return () => {
      setRefresh('');
    };
  }, [refresh]);

  console.log(data);

  return loading ? (
    <Backdrop
      styles={{
        zIndex: 11,
        color: '#fff',
      }}
      open
    >
      <CircularProgress color='inherit' />
    </Backdrop>
  ) : (
    <Box sx={{ flex: '4.5' }}>
      {id ? (
        id === user?.user?._id ? (
          <Share refresh={refetch} onChange={(value) => setRefresh(value)} />
        ) : (
          <></>
        )
      ) : (
        <Share refresh={refetch} onChange={(value) => setRefresh(value)} />
      )}

      {data &&
        data?.map((post) => (
          <Post key={post?._id} post={post} refresh={refetch} />
        ))}
    </Box>
  );
}
