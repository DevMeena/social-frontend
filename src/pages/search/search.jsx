import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../../useFetch';
import { Backdrop, CircularProgress } from '@mui/material';
import { PF } from '../../api';
import Topbar from '../../Components/topbar/Topbar';

const Search = () => {
  const { key } = useParams();
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
      <Topbar />
      <div>
        {searchRes &&
          searchRes.map((s) => (
            <>
              <h1>Search Results are:</h1>
              <img src={PF + s?.profilePicture} alt='dp' />
              <h3>{s?.name}</h3>
            </>
          ))}
      </div>
    </>
  );
};

export default Search;
