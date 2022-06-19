import * as React from 'react';
import { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/auth';
import { useNavigate } from 'react-router-dom';
import { Backdrop, CircularProgress } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PeopleIcon from '@mui/icons-material/People';
import GoogleAuth from './GoogleLogin';
import axios from 'axios';
// import { makeStyles } from '@mui/styles';

// const useStyles = makeStyles((theme) => ({
//   backdrop: {
//     zIndex: theme.zIndex.drawer + 1,
//     color: '#fff',
//   },
// }));

const hasToken = () => {
  if (typeof window === undefined) {
    return false;
  }
  if (localStorage.getItem('jwt')) {
    return JSON.parse(localStorage.getItem('jwt'));
  } else {
    return false;
  }
};

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
export default function SignInSide() {
  // const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [redirect, setRedirect] = useState(false);
  const [load, setLoad] = useState(false);

  const { loading, isAuthenticated, user, error } = useSelector(
    (state) => state.auth
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    dispatch(login(data.get('email'), data.get('password')));
  };
  const er = null;
  console.log('er is ', er);
  console.log({
    error: error,
    loading: loading,
    isAuth: isAuthenticated,
    user: user,
  });

  const checkToken = async () => {
    setLoad(true);
    setRedirect(false);
    const token = await hasToken();
    if (!token) navigate('/');
    console.log('token is ', token);
    console.log('Bearer ' + token);
    axios
      .post('http://localhost:8000/user/authCheck', token, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log('this is res', res);
        setRedirect(true);
        setLoad(false);
      })
      .catch((err) => {
        setRedirect(false);
        setLoad(false);
        console.log(err);
      });
  };

  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  async function timeSensativeAction() {
    //must be async func
    //do something here
    await sleep(5000); //wait 5 seconds
    //continue on...
  }

  useEffect(() => {
    checkToken();
    if (redirect) {
      navigate('/home');
    }
    // if (isAuthenticated) {
    //   console.log(user);
    //   navigate('/home');
    // }
    if (error) {
      toast.error('Invalid credentials!');
    }
  }, [isAuthenticated, error, redirect]);

  function AuthForm() {
    return (
      <ThemeProvider theme={theme}>
        <Grid container component='main' sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage:
                'url(https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light'
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <PeopleIcon
                color='primary'
                fontSize='large'
                style={{ fontSize: '50vh' }}
              />
              <Typography
                component='h2'
                style={{ fontWeight: 600, color: 'white' }}
                variant='h2'
              >
                ConnectBook
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <ToastContainer />

              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component='h1' variant='h5'>
                Sign in
              </Typography>
              <Box
                component='form'
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                  autoFocus
                />

                <TextField
                  margin='normal'
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='current-password'
                />
                {/* <FormControlLabel
                  control={<Checkbox value='remember' color='primary' />}
                  label='Remember me'
                /> */}

                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href='/forgot' variant='body2'>
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href='signup' variant='body2'>
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
                <GoogleAuth />
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    );
  }

  return loading || load ? (
    <Backdrop
      styles={{
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
      }}
      open
    >
      <CircularProgress color='inherit' />
    </Backdrop>
  ) : (
    <AuthForm />
  );
}
