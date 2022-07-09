// ! UPDATE POST

import {
  EmojiEmotions,
  Label,
  PermMedia,
  Room,
  Send,
  Cancel,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useRef } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { API } from '../../api';
import { AuthContext } from '../../context/AuthContext';
import './share.css';

export default function Fol() {
  const { user } = useContext(AuthContext);
  // const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [desc, setDesc] = useState('');
  const [file, setFile] = useState(null);

  const { postId } = useParams();

  const token = user.token;
  const headers = {
    headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const post = {
      userId: user.user._id,
      desc: desc,
      photo: file,
    };

    const fromData = new FormData();

    if (desc) {
      fromData.set('desc', desc);
    }
    if (file) {
      fromData.set('photo', file);
    }

    console.log(post);
    axios
      .put(`${API}/post/${postId}`, fromData, headers)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });

    setDesc('');
    setFile(null);
  };

  return (
    <>
      <Typography variant='h2' sx={{ textAlign: 'center', margin: 6 }}>
        Update Post
      </Typography>
      <Box
        sx={{
          padding: '7px',
          width: '85%',
          margin: 'auto',
          marginTop: '10px',
          webkitBoxShadow: '0px 0px 16px -8px rgba(0,0,0,0.68)',
          mozBoxShadow: '0px 0px 16px -8px rgba(0,0,0,0.68)',
          boxShadow: '0px 0px 16px -8px rgba(0,0,0,0.68)',
          borderRadius: '10px',
        }}
      >
        {file && (
          <div className='shareImgContainer'>
            <img className='shareImg' src={URL.createObjectURL(file)} alt='' />
            <Cancel className='shareCancelImg' onClick={() => setFile(null)} />
          </div>
        )}
        <form className='shareBottom' onSubmit={submitHandler}>
          <Box>
            <Box
              sx={{
                padding: '3px',
                marginBottom: '5px',
              }}
            >
              <Stack direction='row' spacing={2}>
                <Link to='/profile'>
                  <Avatar alt='Adiyogi' src='/assets/image1.png' />
                </Link>
                <TextField
                  id='outlined-basic'
                  label="What's in your mind?"
                  variant='standard'
                  sx={{
                    width: '85%',
                  }}
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  name='desc'
                  // required
                />
              </Stack>
            </Box>
            {/* <Divider/> */}
            <Stack
              direction='row'
              spacing={3}
              sx={{
                marginTop: '20px',
                padding: '3px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'end',
              }}
            >
              <Box>
                <Stack direction='row' spacing={2}>
                  <Stack direction='row'>
                    <label
                      htmlFor='file'
                      className='shareOption'
                      style={{ display: 'flex', cursor: 'pointer' }}
                    >
                      <PermMedia htmlColor='green' />
                      <Typography
                        sx={{ marginLeft: '5px', marginRight: '15px' }}
                      >
                        Photo or Video
                      </Typography>
                      <input
                        style={{ display: 'none' }}
                        type='file'
                        id='file'
                        accept='.png,.jpeg,.jpg'
                        onChange={(e) => setFile(e.target.files[0])}
                        name='photo'
                      />
                    </label>
                  </Stack>
                </Stack>
              </Box>
              <Box style={{ marginRight: '5%' }}>
                <Button type='submit' size='small' variant='contained'>
                  Update
                </Button>
              </Box>
              {/* </form> */}
            </Stack>
          </Box>
        </form>
      </Box>
    </>
  );
}
