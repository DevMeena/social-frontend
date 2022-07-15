import './topbar.css';
import { Person, Search, Chat, Notifications, Home } from '@mui/icons-material';
import Topbarbutton from './Topbarbutton';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Topbar() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  return (
    <div className='topbarContainer'>
      <div className='topbarLeft' onClick={() => window.scroll(0, 0)}>
        <span className='logo'>ConnectBook</span>
      </div>
      <div className='topbarCenter'>
        <div className='searchbar'>
          <Search className='searchIcon' />
          <input
            placeholder='Search for friend or post'
            className='searchInput'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={(e) =>
              e.key === 'Enter' && navigate('/search/' + search)
            }
          />
        </div>
      </div>
      <div className='topbarRight'>
        {/* <div className='topbarLinks'>
          <span className='topbarLink'>Homepage</span>
          <span className='topbarLink'>
            
          </span>
        </div> */}
        <div className='topbarIcons' onClick={(e) => navigate('/home')}>
          <div className='topbarIconItem'>
            {/* <Home /> */}
            Timeline
          </div>
        </div>
        {/* <div className='topbarIcons'>
          <div className='topbarIconItem'>
            <Person />
            <span className='topbarIconBadge'>1</span>
          </div>
        </div> */}
        <div className='topbarIcons'>
          <div className='topbarIconItem'>
            <Chat />
            <span className='topbarIconBadge'>2</span>
          </div>
        </div>
        <div className='topbarIcons'>
          <div className='topbarIconItem'>
            <Notifications />
            <span className='topbarIconBadge'>4</span>
          </div>
        </div>
        <Topbarbutton />
      </div>
    </div>
  );
}
