import * as React from 'react';
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
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { API } from '../api';
import { ToastContainer, toast } from 'react-toastify';

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

export default function ForgotPassword() {
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [error, setError] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSuccess(false);
    setError(false);

    console.log(name, email);

    axios
      .post(API + '/auth/forgotPassword', { email, name })
      .then((res) => {
        console.log(res);
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });

    setEmail('');
    setName('');
  };

  const CustomToastWithLink = () => (
    <div>
      email sent successfully
      <a href='/'> Sign In</a>
    </div>
  );

  React.useEffect(() => {
    if (success) {
      toast.success(CustomToastWithLink);
    }

    if (error) {
      toast.error('failed to send email');
    }
  }, [success, error]);

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
            Password Recovery
          </Typography>
          <Box
            component='form'
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <ToastContainer />

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='name'
                  label='Name'
                  name='name'
                  autoComplete='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
