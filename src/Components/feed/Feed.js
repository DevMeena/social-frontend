import { Box, Typography } from '@mui/material'
import React from 'react'
import Post from '../post/Post'
import Share from '../share/Share'
import { Posts } from "../../dummyData";

export default function Feed() {
  return (
      <Box sx={
          {flex: "5.5"
       }
      }>
          <Share/>
          {Posts.map((p) => (
          <Post key={p.id} post={p} />
        ))}

      </Box>
  )
}

