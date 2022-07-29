import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import './chatOnline.css';
import { API, PF } from '../../api';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';

const ChatOnline = ({
  onlineUsers,
  currentId,
  setCurrentChat,
  setCurrentChatName,
}) => {
  const [frineds, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const { user } = useContext(AuthContext);
  const token = user.token;
  const headers = { headers: { Authorization: `Bearer ${token}` } };
  /* eslint-disable */
  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get(
        API + '/user/followings/' + currentId,
        headers
      );
      setFriends(res.data);
    };
    getFriends();
  }, [currentId]);
  /* eslint-enable */
  useEffect(() => {
    setOnlineFriends(frineds.filter((f) => onlineUsers.includes(f._id)));
  }, [frineds, onlineUsers]);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `${API}/conversations/find/${currentId}/${user._id}`,
        headers
      );
      setCurrentChat(res.data);
      setCurrentChatName(user.name);
    } catch (err) {}
  };

  return (
    <div className='chatOnline'>
      {onlineFriends.map((o) => (
        <div
          className='chatOnlineFriend'
          key={o._id}
          onClick={() => handleClick(o)}
        >
          <div className='chatOnlineImgContainer'>
            <img
              className='chatOnlineImg'
              src={
                o?.profilePicture
                  ? PF + o.profilePicture
                  : PF + 'defaultProfile.jpg'
              }
              alt=''
            />
            <div className='chatOnlineBadge'></div>
          </div>
          <span className='chatOnlineName'>{o.name}</span>
        </div>
      ))}
    </div>
  );
};

export default ChatOnline;
