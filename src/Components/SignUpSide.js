import * as React from 'react';
import { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/auth';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GoogleAuth from './GoogleLogin';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { API } from '../api';

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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState(0);
  const [er, setEr] = useState('');
  const [verified, setVerified] = useState(false);
  const [verifymailclicked, setVerifymailclicked] = useState(false);

  const { loading, isSuccess, error } = useSelector((state) => state.auth);

  const getHashedOtp = () => {
    if (typeof window === undefined) {
      return false;
    }
    if (localStorage.getItem('otp')) {
      return JSON.parse(localStorage.getItem('otp'));
    } else {
      return false;
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // console.log(email);
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });
    // const name = data.get('firstName') + ' ' + data.get('lastName');
    const name = fname + ' ' + lname;
    dispatch(register(name, email, password));
    setVerified(false);
    setVerifymailclicked(false);
    setEmail('');
    setFname('');
    setLname('');
    setPassword('');
    setOtp('');
  };

  const mailVerification = () => {
    axios
      .post(`${API}/user/verifyEmail`, {
        name: fname + ' ' + lname,
        email: email,
      })
      .then((res) => {
        console.log(res);
        if (typeof window !== undefined) {
          localStorage.setItem('otp', JSON.stringify(res.data));
        }
        setVerifymailclicked(true);
      })
      .catch((err) => {
        console.log(err);
        setVerifymailclicked(false);
      });
  };

  const submitOtp = () => {
    setEr('');
    const hashedOtp = getHashedOtp();
    if (!hashedOtp) {
      setEr('OTP does not match');
      return;
    }
    axios
      .post(`${API}/user/verifyToken`, { otp, hashedOtp })
      .then((res) => {
        console.log(res);
        setVerified(true);
      })
      .catch((err) => {
        console.log(err);
        setEr('OTP does not match');
        console.log('error block runnign');
        setVerified(false);
      });
  };

  const CustomToastWithLink = () => (
    <div>
      Account created successfully
      <a href='/'>Sign In</a>
    </div>
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (isSuccess) {
      toast.info(CustomToastWithLink);
    }

    if (er) {
      toast.error(er);
    }
  }, [isSuccess, er, verified, verifymailclicked]);

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
            Sign up
          </Typography>
          <Box
            component='form'
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <ToastContainer />

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete='given-name'
                  name='firstName'
                  required
                  fullWidth
                  id='firstName'
                  label='First Name'
                  autoFocus
                  value={fname}
                  onChange={(e) => {
                    setFname(e.target.value);
                  }}
                  disabled={verifymailclicked}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id='lastName'
                  label='Last Name'
                  name='lastName'
                  autoComplete='family-name'
                  value={lname}
                  onChange={(e) => {
                    setLname(e.target.value);
                  }}
                  disabled={verifymailclicked}
                />
              </Grid>

              <Grid item xs={12}>
                <Stack direction='row'>
                  <TextField
                    required
                    fullWidth
                    id='email'
                    label='Email Address'
                    name='email'
                    autoComplete='email'
                    value={email}
                    disabled={verifymailclicked}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />

                  {verified && <CheckCircleIcon />}
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='new-password'
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  disabled={verifymailclicked}
                />
              </Grid>

              {verifymailclicked && !verified && (
                <Grid item xs={12}>
                  <TextField
                    margin='normal'
                    required
                    fullWidth
                    name='password'
                    label='OTP'
                    type='number'
                    id='otp'
                    autoComplete='otp'
                    value={otp}
                    onChange={(e) => {
                      setOtp(e.target.value);
                    }}
                  />
                </Grid>
              )}
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value='allowExtraEmails' color='primary' />
                  }
                  label='I want to receive inspiration, marketing promotions and updates via email.'
                />
              </Grid> */}
            </Grid>
            {!verifymailclicked && (
              <Button
                // type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
                onClick={mailVerification}
              >
                Verify mail
              </Button>
            )}

            {verifymailclicked && !verified && (
              <Button
                // type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
                onClick={submitOtp}
              >
                Verify OTP
              </Button>
            )}
            {verified && (
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
            )}
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Link href='/' variant='body2'>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <GoogleAuth />
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
