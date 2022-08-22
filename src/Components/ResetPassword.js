import * as React from 'react';
import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// import { useDispatch, useSelector } from 'react-redux';
// import { register } from '../actions/auth';
// import { ToastContainer } from 'react-toastify'; //toast
import 'react-toastify/dist/ReactToastify.css';
import { API } from '../api';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { logoutCall } from './apiCalls';

function Copyright(props) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {'Copyright © '}
      <Link color='inherit' href='https://mui.com/'>
        ConnectBook
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUpSide() {
  // const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confPass, setConfPass] = useState('');

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const { user, dispatch } = React.useContext(AuthContext);
  const userId = user?.user._id;
  const token = user?.token;
  const headers = { headers: { Authorization: `Bearer ${token}` } };
  const navigate = useNavigate();
  const signout = () => {
    logoutCall(dispatch);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setError('');
    setSuccess('');

    if (newPass === confPass) {
      axios
        .put(
          `${API}/user/updatePassword/${userId}`,
          { password: newPass },
          headers
        )
        .then((res) => {
          setSuccess('Password changed successfully');
          signout();
        })
        .catch((e) => {
          setError('Unable to change password');
        });
    } else {
      setError('Passwords do not match');
    }

    setNewPass('');
    setConfPass('');
  };

  const CustomToastWithLink = () => (
    <div>
      {success}
      <a href='/'> Sign In</a>
    </div>
  );

  /* eslint-disable */

  useEffect(() => {
    if (success) {
      toast.success(CustomToastWithLink);
    }

    if (error) {
      toast.error(error);
    }
  }, [success, error]);

  /* eslint-enable */

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Reset Password
          </Typography>
          <Box
            component='form'
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <ToastContainer />

            {/* <Grid item xs={12}>
              <TextField
                required
                fullWidth
                value={oldPass}
                onChange={(e) => setOldPass(e.target.value)}
                id='oldPassword'
                label='Old Password'
                name='password'
                type='password'
                autoComplete='old-password'
              />
            </Grid> */}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='password'
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  label='New Password'
                  type='password'
                  id='newpassword'
                  autoComplete='new-password'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={confPass}
                  onChange={(e) => setConfPass(e.target.value)}
                  name='password'
                  label='Repeat New Password'
                  type='password'
                  id='repeatpassword'
                  autoComplete='repeat-password'
                />
              </Grid>
            </Grid>

            {/* <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value='allowExtraEmails' color='primary' />
                  }
                  label='I want to receive inspiration, marketing promotions and updates via email.'
                />
              </Grid> */}
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Reset Password
            </Button>
            <Button
              fullWidth
              variant='contained'
              color='secondary'
              sx={{ mb: 2 }}
              onClick={(e) => navigate('/home')}
            >
              go back
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
