import Conversation from "../../Components/conversations/Conversation";
import Message from "../../Components/message/Message";
import Topbar from "../../Components/topbar/Topbar";
import ChatOnline from "../../Components/chatOnline/ChatOnline";
import "./messenger.css";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { API, PF } from '../../api';
import { useRef } from "react";
import { io } from 'socket.io-client';

const Messenger = () => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);;
  const socket = useRef(io("ws://localhost:8900"));
  const { user } = useContext(AuthContext);
  const token = user.token;
  const headers = { headers: { Authorization: `Bearer ${token}` } };
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", data => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    })
  }, [])
  
  useEffect(() => {
    arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) && setMessages((prev) => [...prev, arrivalMessage])
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user.user._id);
    socket.current.on("getUsers", users => {
      setOnlineUsers(user.user.followings.filter(f=>users.some(u=> u.userId === f)));
    })
  }, [user])

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(`${API}/conversations/${user.user._id}`, headers);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(API+"/messages/" + currentChat?._id, headers);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    const message = {
      sender: user.user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(member => member !== user.user._id)

    socket.current.emit("sendMessage", {
      senderId: user.user._id, 
      receiverId,
      text: newMessage,
    })

    try {
      const res = await axios.post(API + "/messages/", message, headers);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  },[messages])

  return (
    <>
      <Topbar/>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {conversations.map((c) => (
              <div key={c._id} onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {
              currentChat ?
                <>
                  <div className="chatBoxTop">
                    {messages.map((m) => {
                      return (
                        <div ref={scrollRef} key={m._id}>
                        <Message message={m} own={m.sender === user.user._id} />
                        </div>
                      )
                    })}
                  </div>
                  <div className="chatBoxBottom">
                    <textarea
                      className="chatMessageInput" placeholder="Message"
                      onChange={(e) => setNewMessage(e.target.value)}
                      value={newMessage}
                    ></textarea>
                    <button className="chatSubmitButton" onClick={handleSubmit}>Send</button>
                  </div>
                </>:<span className="noConversationText">Open a conversation to start a chat.</span>}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline onlineUsers={onlineUsers}
              currentId={user.user._id}
              setCurrentChat = {setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Messenger