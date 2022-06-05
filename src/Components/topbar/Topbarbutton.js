import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { useState } from 'react';
import { Face, Logout, ManageAccounts } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export default function Topbarbutton() {

    
const[clicked, setClicked] = useState(false);

  return (
      <>
          <img src="assets/image1.png" alt="dp" className='topbarImg' onClick={() => setClicked(!clicked)}/>
      

      {clicked  &&  BasicList()} 
      </>
  )
}


function BasicList() {
  return (
    <Box  className='topbarImgUl' sx={{ width: '100%', maxWidth: 200, bgcolor: 'background.paper' }}>
      <nav aria-label="main mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Face />
              </ListItemIcon>
              <ListItemText primary="Profile Picture" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ManageAccounts />
              </ListItemIcon>
              <ListItemText primary="Account" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
}

