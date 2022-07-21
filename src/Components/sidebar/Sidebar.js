import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import {
  Bookmark,
  CastForEducation,
  Chat,
  Event,
  Group,
  MiscellaneousServices,
  QuestionMark,
  RssFeed,
  VideoLabel,
  Work,
} from '@mui/icons-material';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const [open, setOpen] = React.useState(true);

  const navigate = useNavigate();

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Box
      sx={{
        flex: '1.5',
        height: '90vh',
        // overflowY: 'scroll',
        position: 'sticky',
        top: '50px',
      }}
    >
      <Box>
        <List
          className='SidebarList'
          sx={{
            width: '100%',
            maxWidth: 200,
            marginLeft: '10px',
            bgcolor: 'background.paper',
          }}
          component='nav'
          aria-labelledby='nested-list-subheader'
        >
          <ListItemButton onClick={(e) => navigate('/home')}>
            <ListItemIcon>
              <RssFeed />
            </ListItemIcon>
            <ListItemText primary='Feed' />
          </ListItemButton>

          <ListItemButton onClick={(e) => navigate('/messenger')}>
            <ListItemIcon>
              <Chat />
            </ListItemIcon>
            <ListItemText primary='Chats' />
          </ListItemButton>

          {/* <ListItemButton>
            <ListItemIcon>
              <VideoLabel />
            </ListItemIcon>
            <ListItemText primary='Videos' />
          </ListItemButton> */}

          {/* <ListItemButton>
            <ListItemIcon>
              <Group />
            </ListItemIcon>
            <ListItemText primary='Groups' />
          </ListItemButton> */}

          {/* <ListItemButton>
            <ListItemIcon>
              <Bookmark />
            </ListItemIcon>
            <ListItemText primary='Bookmarks' />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <QuestionMark />
            </ListItemIcon>
            <ListItemText primary='Questions' />
          </ListItemButton> */}

          {/* <ListItemButton>
            <ListItemIcon>
              <Work />
            </ListItemIcon>
            <ListItemText primary='Jobs' />
          </ListItemButton> */}

          {/* <ListItemButton>
            <ListItemIcon>
              <Event />
            </ListItemIcon>
            <ListItemText primary='Events' />
          </ListItemButton> */}

          {/* <ListItemButton>
            <ListItemIcon>
              <CastForEducation />
            </ListItemIcon>
            <ListItemText primary='Courses' />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <CastForEducation />
            </ListItemIcon>
            <ListItemText primary='Courses' />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <CastForEducation />
            </ListItemIcon>
            <ListItemText primary='Courses' />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <CastForEducation />
            </ListItemIcon>
            <ListItemText primary='Courses' />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <CastForEducation />
            </ListItemIcon>
            <ListItemText primary='Courses' />
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon>
              <CastForEducation />
            </ListItemIcon>
            <ListItemText primary='Courses' />
          </ListItemButton> */}

          {/* <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <MiscellaneousServices />
            </ListItemIcon>
            <ListItemText primary='Other' />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary='Starred' />
              </ListItemButton>
            </List>
          </Collapse> */}
        </List>
      </Box>
    </Box>
  );
}
