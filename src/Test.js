import React, { useEffect } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { API } from './api';
import { useFetch } from './useFetch';
import TextField from '@mui/material/TextField';

import { Cancel } from '@mui/icons-material';

import {
  Box,
  Button,
  Fab,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Test = () => {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const { loading, data, error } = useFetch(`/user/${user?.user._id}`);
  console.log(PF);
  console.log(data);

  const [name, setName] = useState(data?.name);
  const [desc, setdesc] = useState(data?.desc);
  const [from, setfrom] = useState(data?.from);
  const [city, setcity] = useState(data?.city);
  const [dob, setDob] = useState(data?.birthDay);
  const [relationship, setrelationship] = useState(data?.relationship);
  const [gender, setgender] = useState(data?.gender);
  const [file, setFile] = useState(data?.profilePicture);
  const [file2, setFile2] = useState(data?.coverPicture);

  const token = user.token;
  const headers = {
    headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const userData = {
      name,
      desc,
      from,
      city,
      relationship,
      gender,
      birthDay: dob,
    };

    if (file) {
      const data = new FormData();
      // console.log();
      const fileName =
        'profile' + user?.user._id + '.' + file.name.split('.')[1];
      // const fileName = Date.now() + file.name;
      data.append('name', fileName);
      data.append('file', file);
      userData.profilePicture = fileName;
      console.log(userData);
      try {
        await axios.post(`${API}/upload`, data);
      } catch (err) {
        console.log(err);
      }
    }

    if (file2) {
      const data = new FormData();
      const fileName =
        'cover' + user?.user._id + '.' + file2.name.split('.')[1];
      // const fileName = Date.now() + file2.name;
      data.append('name', fileName);
      data.append('file', file2);
      userData.coverPicture = fileName;
      console.log(userData);
      try {
        await axios.post(`${API}/upload`, data);
      } catch (err) {
        console.log(err);
      }
    }

    try {
      await axios.put(`${API}/user/${user?.user._id}`, userData, headers);
      //   window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  // const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div>
      <Typography variant='h2' sx={{ textAlign: 'center', margin: 6 }}>
        Update {data?.name}'s Profile
      </Typography>
      <Box
        sx={{
          padding: '7px',
          width: '85%',
          margin: 'auto',
          marginTop: '20px',
          marginBottom: '20px',
          webkitBoxShadow: '0px 0px 16px -8px rgba(0,0,0,0.68)',
          mozBoxShadow: '0px 0px 16px -8px rgba(0,0,0,0.68)',
          boxShadow: '0px 0px 16px -8px rgba(0,0,0,0.68)',
          borderRadius: '10px',
        }}
      >
        <div
          style={{
            marginTop: '20px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* <div>
        <h1>{data?.name}</h1>
        <h3>{data?.desc}</h3>
        <h4>{data?.from}</h4>
        <h4>{data?.city}</h4>
        <h4>{data?.relationship}</h4>

        {data && (
          <>
            <img
              src={'http://localhost:8000/images/' + data?.profilePicture}
              alt='dp'
            />
            <img
              src={'http://localhost:8000/images/' + data?.coverPicture}
              alt='cp'
            />
          </>
        )}
      </div> */}

          <form>
            <div
              style={{
                marginTop: 10,
                marginBottom: 10,
                width: '40vw',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FormControl fullWidth>
                <TextField
                  style={{ margin: 10 }}
                  id='outlined-basic'
                  label='name'
                  type='text'
                  variant='outlined'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  style={{ margin: 10 }}
                  id='outlined-basic'
                  label='description'
                  type='text'
                  variant='outlined'
                  value={desc}
                  onChange={(e) => setdesc(e.target.value)}
                />
                <TextField
                  style={{ margin: 10 }}
                  id='outlined-basic'
                  label='country'
                  type='text'
                  variant='outlined'
                  value={from}
                  onChange={(e) => setfrom(e.target.value)}
                />
                <TextField
                  style={{ margin: 10 }}
                  id='outlined-basic'
                  label='city'
                  type='text'
                  variant='outlined'
                  value={city}
                  onChange={(e) => setcity(e.target.value)}
                />

                <FormControl style={{ margin: 10 }}>
                  <InputLabel
                    id='demo-simple-select-label'
                    label='relationship'
                  >
                    Relationship
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={relationship}
                    placeholder='relationship'
                    label='relationship'
                    onChange={(e) => setrelationship(e.target.value)}
                  >
                    <MenuItem value='Single'>Single</MenuItem>
                    <MenuItem value='Married'>Married</MenuItem>
                    <MenuItem value='Dating'>Dating</MenuItem>
                  </Select>
                </FormControl>

                <FormControl style={{ margin: 10 }}>
                  <InputLabel id='demo-simple-select-label' label='gender'>
                    Gender
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={gender}
                    placeholder='gender'
                    label='gender'
                    onChange={(e) => setgender(e.target.value)}
                  >
                    <MenuItem value='Male'>Male</MenuItem>
                    <MenuItem value='Female'>Female</MenuItem>
                    <MenuItem value='Others'>Others</MenuItem>
                  </Select>
                </FormControl>

                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <DatePicker
                    selected={dob}
                    onChange={(date) => setDob(date)}
                  />
                </div>

                <div style={{ margin: 10 }}>
                  {file && (
                    <div className='shareImgContainer'>
                      <img
                        className='shareImg'
                        src={URL.createObjectURL(file)}
                        alt=''
                      />
                      <Cancel
                        className='shareCancelImg'
                        onClick={() => setFile(null)}
                      />
                    </div>
                  )}

                  <label htmlFor='dp'>
                    <input
                      style={{ display: 'none' }}
                      type='file'
                      name='dp'
                      className='dp'
                      placeholder='dp'
                      id='dp'
                      accept='.png,.jpeg,.jpg'
                      onChange={(e) => setFile(e.target.files[0])}
                    />

                    <Button
                      color='secondary'
                      fullWidth
                      variant='outlined'
                      component='span'
                    >
                      Change Profile Photo
                    </Button>
                  </label>
                </div>
                <div style={{ margin: 10 }}>
                  {file2 && (
                    <div className='shareImgContainer'>
                      <img
                        className='shareImg'
                        src={URL.createObjectURL(file2)}
                        alt=''
                      />
                      <Cancel
                        className='shareCancelImg'
                        onClick={() => setFile2(null)}
                      />
                    </div>
                  )}

                  <label htmlFor='cp'>
                    <input
                      style={{ display: 'none' }}
                      type='file'
                      name='cp'
                      id='cp'
                      className='text'
                      placeholder='cp'
                      accept='.png,.jpeg,.jpg'
                      onChange={(e) => setFile2(e.target.files[0])}
                    />

                    <Button
                      fullWidth
                      // style={{ margin: 10 }}
                      color='secondary'
                      variant='outlined'
                      component='span'
                    >
                      Change Cover Photo
                    </Button>
                  </label>
                </div>

                <Button
                  style={{ marginTop: 20 }}
                  type='submit'
                  color='primary'
                  variant='contained'
                  fullWidth
                  onClick={submitHandler}
                >
                  update
                </Button>
              </FormControl>
            </div>
          </form>
        </div>
      </Box>
    </div>
  );
};
export default Test;

// const [name, setName] = useState(data?.name);
//   const [desc, setdesc] = useState(data?.desc);
//   const [from, setfrom] = useState(data?.from);
//   const [city, setcity] = useState(data?.city);
//   const [dob, setDob] = useState(data?.birthDay);
//   const [relationship, setrelationship] = useState(data?.relationship);
//   const [gender, setgender] = useState(data?.gender);
//   const [file, setFile] = useState(data?.profilePicture);
//   const [file2, setFile2] = useState(data?.coverPicture);

// const [name, setName] = useState('');
// const [desc, setdesc] = useState('');
// const [from, setfrom] = useState('');
// const [city, setcity] = useState('');
// const [dob, setDob] = useState(new Date());
// const [relationship, setrelationship] = useState(0);
// const [gender, setgender] = useState(0);
// const [file, setFile] = useState(null);
// const [file2, setFile2] = useState(null);
