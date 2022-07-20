import './home.css';
import Topbar from '../../Components/topbar/Topbar.js';
import Sidebar from '../../Components/sidebar/Sidebar.js';
import Feed from '../../Components/feed/Feed.js';
import { Box, CssBaseline } from '@mui/material';
import Rightbar from '../../Components/rightbar/Rightbar';

export default function Home() {
  return (
    <>
      <CssBaseline />
      <Topbar />
      <Box
        sx={{
          display: 'flex',
          width: '100%',
        }}
      >
        <Sidebar />
        <Feed />
        <Rightbar />
      </Box>
    </>
  );
}
