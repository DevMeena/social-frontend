import { Box, Typography } from '@mui/material';
import React from 'react';
import { useFetch } from '../../useFetch';
import Post from '../post/Post';
import Share from '../share/Share';
import { Backdrop, CircularProgress } from '@mui/material';
import { Posts } from '../../dummyData';
import { useParams } from 'react-router-dom';

export default function Feed() {
  const { id } = useParams();
  var url = `/post/timeline/all`;
  if (id) {
    url = url + '/' + id;
  }

  console.log('THIS IS URL', url);

  const { data, loading, error, refetch } = useFetch(url);
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
      <Share />
      {data && data.map((post) => <Post key={post?._id} post={post} />)}
    </Box>
  );
}
