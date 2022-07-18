import React, { useEffect, useState } from 'react'
import './Conversation.css';
import axios from 'axios';
import { API, PF } from '../../api';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Conversation = ({ conversation, currentUser}) => {
  const [user, setUser] = useState(null);
  const token = currentUser.token;
  const headers = { headers: { Authorization: `Bearer ${token}` } };
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser.user._id);

    const getUser = async () => {
      try {
        const res = await axios(`${API}/user/${friendId}`, headers);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className='conversation'>
      <img
        className='conversationImg'
        src={user?.profilePicture ? PF+user.profilePicture: PF+"defaultProfile.jpg"}
        alt=""
      />
      <span className="conversationName">{user?.name}</span>
    </div>
  )
}

export default Conversation