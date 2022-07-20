import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetch } from '../../useFetch';
import { Backdrop, CircularProgress, CssBaseline } from '@mui/material';
import { PF } from '../../api';
import Topbar from '../../Components/topbar/Topbar';
import ModalImage from 'react-modal-image';

import {
  Avatar,
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import './search.css';

const Search = () => {
  const { key } = useParams();
  const navigate = useNavigate();
  const { loading, data: searchRes, error } = useFetch('/user/search/' + key);
  console.log('search result is : ', searchRes);
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
    <>
      <CssBaseline />
      <Topbar />
      <Typography variant='h2' sx={{ textAlign: 'center', margin: 6 }}>
        Search Results
      </Typography>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: 20,
          marginRight: 20,
        }}
      >
        {searchRes &&
          searchRes.map((s) => (
            <Box
              sx={{
                padding: '7px',
                width: '20%',
                margin: 'auto',
                marginTop: '10px',
                webkitBoxShadow: '0px 0px 16px -8px rgba(0,0,0,0.68)',
                mozBoxShadow: '0px 0px 16px -8px rgba(0,0,0,0.68)',
                boxShadow: '0px 0px 16px -8px rgba(0,0,0,0.68)',
                borderRadius: '5px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                // cursor: 'pointer',
              }}
            >
              {/* <div style={{ padding: 4 }}> */}
              {/* <img
                src={PF + s?.profilePicture}
                style={{
                  width: 250,
                  height: 250,
                  padding: 4,
                  borderRadius: '10px',
                }}
                alt='dp'
              /> */}
              <div
                style={{
                  width: '100%',
                  height: 250,
                  padding: 4,
                  display: 'flex',
                  // flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  // borderRadius: '10px',
                }}
              >
                <ModalImage
                  className='modal-image'
                  small={PF + s?.profilePicture}
                  large={PF + s?.profilePicture}
                />
              </div>
              <h3 style={{ padding: 6 }}>{s?.name}</h3>
              {/* </div> */}
              {/* <div> */}
              <Button
                type='submit'
                size='small'
                color='secondary'
                variant='outlined'
                onClick={(e) => navigate('/profile/' + s._id)}
              >
                visit profile
              </Button>
              {/* </div> */}
            </Box>
          ))}
      </div>
    </>
  );
};

export default Search;
