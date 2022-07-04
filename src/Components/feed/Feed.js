import { Box, Typography } from '@mui/material';
import React from 'react';
import useFetch from '../../useFetch';
import Post from '../post/Post';
import Share from '../share/Share';
import { Backdrop, CircularProgress } from '@mui/material';

export default function Feed() {
  const { data, loading, error } = useFetch(`/post/timeline/all`);

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
    <Box sx={{ flex: '5.5' }}>
      <Share />
      <Post />
      <Post />
      <Post />
      <Post />
    </Box>
  );
}
