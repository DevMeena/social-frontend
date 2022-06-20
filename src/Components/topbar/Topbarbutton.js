import * as React from 'react';
import { useContext } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useState } from 'react';
import { Face, Logout, ManageAccounts } from '@mui/icons-material';
import { logoutCall } from '../apiCalls';
import { AuthContext } from '../../context/AuthContext';

export default function Topbarbutton() {
  const [clicked, setClicked] = useState(false);

  const { dispatch } = useContext(AuthContext);

  const signout = () => {
    logoutCall(dispatch);
  };
  return (
    <>
      <img
        src='assets/image1.png'
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
            </List>
          </nav>
        </Box>
      )}
    </>
  );
}
