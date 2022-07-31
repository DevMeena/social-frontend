import Conversation from '../../Components/conversations/Conversation';
import Message from '../../Components/message/Message';
import Topbar from '../../Components/topbar/Topbar';
import ChatOnline from '../../Components/chatOnline/ChatOnline';
import './messenger.css';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { API, PF } from '../../api';
import { useRef } from 'react';
import { io } from 'socket.io-client';
import {
  CssBaseline,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';

const Messenger = () => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [followingsList, setFollowingsList] = useState([]);
  const [currentChatName, setCurrentChatName] = useState(null);
  const socket = useRef(io('https://connectbook-chat-api.herokuapp.com/'));
  const { user } = useContext(AuthContext);
  const token = user.token;
  const headers = { headers: { Authorization: `Bearer ${token}` } };
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io('https://connectbook-chat-api.herokuapp.com/');
    socket.current.on('getMessage', (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit('addUser', user.user._id);
    socket.current.on('getUsers', (users) => {
      setOnlineUsers(
        user.user.followings.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          `${API}/conversations/${user.user._id}`,
          headers
        );
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();

    const getFollowings = async () => {
      try {
        const res = await axios.get(
          `${API}/user/followings/${user.user._id}`,
          headers
        );
        setFollowingsList(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFollowings();
  }, [user]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          API + '/messages/' + currentChat?._id,
          headers
        );
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user.user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user.user._id
    );

    socket.current.emit('sendMessage', {
      senderId: user.user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post(API + '/messages/', message, headers);
      setMessages([...messages, res.data]);
      setNewMessage('');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleFollowingChange = async (e) => {
    let res = await axios.get(
      `${API}/conversations/find/${user.user._id}/${e.target.value.id}`,
      headers
    );
    if (res.data === null) {
      res = await axios.post(
        `${API}/conversations/`,
        { senderId: user.user._id, receiverId: e.target.value.id },
        headers
      );
    }
    const result = conversations.every((c) => {
      if (c._id === res.data._id) {
        return false;
      }

      return true;
    });
    if (result) {
      conversations.push(res.data);
    }
    setCurrentChat(res.data);
    setCurrentChatName(e.target.value.name);
  };

  const onConversationSelect = async (conversation, user) => {
    setCurrentChat(conversation);
    const friendId = conversation.members.find(
      (member) => member !== user.user._id
    );
    const res = await axios.get(`${API}/user/${friendId}`, headers);
    setCurrentChatName(res.data.name);
  };

  return (
    <>
      <CssBaseline />
      <Topbar />
      <div className='messenger'>
        <div className='chatMenu'>
          <div className='chatMenuWrapper'>
            <FormControl style={{ margin: 10 }} className='chatMenuInput'>
              <InputLabel id='demo-simple-select-label' label='relationship'>
                New Conversation
              </InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value=''
                placeholder=''
                label='New Conversation'
                onChange={handleFollowingChange}
              >
                {followingsList.map((f) => {
                  return (
                    <MenuItem value={{ name: f.name, id: f._id }} key={f._id}>
                      {f.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            {conversations?.map((c) => (
              <div key={c._id} onClick={() => onConversationSelect(c, user)}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className='chatBox'>
          <div className='chatBoxWrapper'>
            {currentChat ? (
              <>
                <div className='chatName'>{currentChatName}</div>
                <div className='chatBoxTop'>
                  {messages.map((m) => {
                    return (
                      <div ref={scrollRef} key={m._id}>
                        <Message message={m} own={m.sender === user.user._id} />
                      </div>
                    );
                  })}
                </div>
                <div className='chatBoxBottom'>
                  <textarea
                    className='chatMessageInput'
                    placeholder='Message'
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className='chatSubmitButton' onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className='noConversationText'>
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
        <div className='chatOnline'>
          <div className='chatOnlineWrapper'>
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user.user._id}
              setCurrentChat={setCurrentChat}
              setCurrentChatName={setCurrentChatName}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Messenger;
