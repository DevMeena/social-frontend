import * as React from 'react';
import { useContext } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useState } from 'react';
import { Face, Logout, ManageAccounts, Settings } from '@mui/icons-material';
import { logoutCall } from '../apiCalls';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { API, PF } from '../../api';

export default function Topbarbutton() {
  const [clicked, setClicked] = useState(false);

  const { user, dispatch } = useContext(AuthContext);

  const userId = user?.user._id;
  const token = user?.token;
  const headers = { headers: { Authorization: `Bearer ${token}` } };

  const signout = () => {
    logoutCall(dispatch);
  };

  const deleteAccount = () => {
    if (window.confirm('Delete this account?')) {
      axios
        .delete(`${API}/user/${userId}`, headers)
        .then((res) => {
          signout();
        })
        .catch((e) => {
          console.log('error');
        });
    }
  };

  return (
    <>
      <img
        src={PF + user?.user?.profilePicture}
        alt='dp'
        className='topbarImg'
        onClick={() => setClicked(!clicked)}
      />

      {clicked && (
        <Box
          className='topbarImgUl'
          sx={{ width: '100%', maxWidth: 200, bgcolor: 'background.paper' }}
        >
          <nav aria-label='main mailbox folders'>
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={signout}>
                  <ListItemIcon>
                    <Logout />
                  </ListItemIcon>
                  <ListItemText primary='Logout' />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Face />
                  </ListItemIcon>
                  <ListItemText primary='Profile Picture' />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <ManageAccounts />
                  </ListItemIcon>
                  <ListItemText primary='Account' />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton onClick={deleteAccount}>
                  <ListItemIcon>
                    <Settings />
                  </ListItemIcon>
                  <ListItemText primary='Delete Account' />
                </ListItemButton>
              </ListItem>
            </List>
          </nav>
        </Box>
      )}
    </>
  );
}
