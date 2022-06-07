import { Box, Typography } from '@mui/material'
import React from 'react'
import Post from '../post/Post'
import Share from '../share/Share'

export default function Feed() {
  return (
      <Box sx={
          {flex: "5.5",
        zIndex: "-10"}
      }>
          <Share/>
          <Post/>
          <Post/>
          <Post/>
          <Post/>

      </Box>
  )
}
