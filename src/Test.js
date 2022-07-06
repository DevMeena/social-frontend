import React, { useEffect } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { API } from './api';
import { useFetch } from './useFetch';

const Test = () => {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [name, setName] = useState('BIG BRO');
  const [desc, setdesc] = useState('JAI RAM JI KI');
  const [from, setfrom] = useState('SUN');
  const [city, setcity] = useState('SATURN');
  const [relationship, setrelationship] = useState('ZERO');
  const [file, setFile] = useState(null);
  const [file2, setFile2] = useState(null);

  const token = user.token;
  const headers = {
    headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      name: name,
    };

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append('name', fileName);
      data.append('file', file);
      newPost.profilePicture = fileName;
      console.log(newPost);
      try {
        await axios.post(`${API}/upload`, data);
      } catch (err) {
        console.log(err);
      }
    }

    if (file2) {
      const data = new FormData();
      const fileName = Date.now() + file2.name;
      data.append('name', fileName);
      data.append('file', file2);
      newPost.coverPicture = fileName;
      console.log(newPost);
      try {
        await axios.post(`${API}/upload`, data);
      } catch (err) {
        console.log(err);
      }
    }

    try {
      await axios.put(`${API}/user/${user?.user._id}`, newPost, headers);
      //   window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const { loading, data, error } = useFetch(`/user/${user?.user._id}`);
  console.log(PF);
  console.log(data);
  // const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div>
      <div>
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
      </div>

      <h1>test</h1>
      <form>
        <div>
          <input type='text' name='name' className='text' placeholder='name' />
          <input type='text' name='desc' className='text' placeholder='desc' />
          <input type='text' name='city' className='text' placeholder='city' />
          <input type='text' name='from' className='text' placeholder='from' />
          <input
            type='text'
            name='relationship'
            className='text'
            placeholder='relationship'
          />
        </div>
        <div>
          <input
            type='file'
            name='dp'
            className='text'
            placeholder='dp'
            id='file'
            accept='.png,.jpeg,.jpg'
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type='file'
            name='cp'
            className='text'
            placeholder='cp'
            id='file'
            accept='.png,.jpeg,.jpg'
            onChange={(e) => setFile2(e.target.files[0])}
          />
        </div>
        <button type='submit' onClick={submitHandler}>
          submit
        </button>
      </form>
    </div>
  );
};
export default Test;
