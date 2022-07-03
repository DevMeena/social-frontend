import { EmojiEmotions, Label, PermMedia, Room, Send } from '@mui/icons-material'
import { Avatar, Box, Button, Divider, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'



export default function Share() {
  return (
      <Box sx={{
          padding: "7px",
          width: "85%",
          margin: "auto",
          marginTop: "10px",
          webkitBoxShadow: "0px 0px 16px -8px rgba(0,0,0,0.68)",
            mozBoxShadow: "0px 0px 16px -8px rgba(0,0,0,0.68)",
            boxShadow: "0px 0px 16px -8px rgba(0,0,0,0.68)",
            borderRadius: "10px"
      }}>
          <Box>
              <Box sx={{
                  padding: "3px",
                  marginBottom: "5px",
              }}>
                    <Stack direction="row" spacing={2}>
                <Link to="/profile"><Avatar alt="Adiyogi" src="/assets/image1.png" /></Link>
                <TextField id="outlined-basic" label="What's in your mind?" variant="standard" sx={{
                    width: "80%"
                }} />
                    </Stack>
              </Box>
              {/* <Divider/> */}
              <Stack direction="row" spacing={3} sx={{
                  marginTop: "20px",
                  padding: "3px"
              }}>
                  <Box >
                      <Stack direction="row" spacing={2}>
                      <Stack direction="row">
                          <PermMedia htmlColor='green'/>
                          <Typography>Photo or Video</Typography>
                      </Stack>
                      <Stack direction="row">
                          <Label htmlColor='blue'/>
                          <Typography>Tag</Typography>
                      </Stack>
                      <Stack direction="row">
                          <Room htmlColor='red'/>
                          <Typography>Location</Typography>
                      </Stack>
                      <Stack direction="row">
                          <EmojiEmotions htmlColor='tomato'/>
                          <Typography>Feeling</Typography>
                      </Stack>
                      </Stack>
                  </Box>
                  <Box>
                  <Button size="small" variant="contained">Share</Button>

                  </Box>
                  
              </Stack>
          </Box>
      </Box>
  )
}
