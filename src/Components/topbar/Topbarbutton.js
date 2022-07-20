import * as React from 'react';
import { useContext } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useState } from 'react';
import {
  Face,
  Logout,
  ManageAccounts,
  Password,
  Settings,
} from '@mui/icons-material';
import Divider from '@mui/material/Divider';
import { logoutCall } from '../apiCalls';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { API, PF } from '../../api';
import { useNavigate } from 'react-router-dom';

export default function Topbarbutton() {
  const [clicked, setClicked] = useState(false);

  const { user, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

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
        style={{ padding: '1px', background: 'gray' }}
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
                <ListItemButton onClick={(e) => navigate('/profile/' + userId)}>
                  <ListItemIcon>
                    <Face />
                  </ListItemIcon>
                  <ListItemText primary='Profile' />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton onClick={(e) => navigate('/update')}>
                  <ListItemIcon>
                    <Settings />
                  </ListItemIcon>
                  <ListItemText primary='Update Account' />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton onClick={(e) => navigate('/reset')}>
                  <ListItemIcon>
                    <Password />
                  </ListItemIcon>
                  <ListItemText primary='Change Password' />
                </ListItemButton>
              </ListItem>

              <Divider/>

              <ListItem disablePadding>
                <ListItemButton onClick={signout}>
                  <ListItemIcon>
                    <Logout />
                  </ListItemIcon>
                  <ListItemText primary='Logout' />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton onClick={deleteAccount}>
                  <ListItemIcon>
                    <ManageAccounts />
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
