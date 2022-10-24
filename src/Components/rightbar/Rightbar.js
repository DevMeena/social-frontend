import './rightbar.css';
import { Users } from '../../dummyData';
import Online from '../online/Online';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { API, PF } from '../../api';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import { format, render, cancel, register } from 'timeago.js';
import { useFetch } from '../../useFetch';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { io } from 'socket.io-client';

export default function Rightbar({ profile, refresh }) {
  const socket = useRef(io('ws://localhost:8900'));
  const { user } = useContext(AuthContext);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const token = user.token;
  const headers = { headers: { Authorization: `Bearer ${token}` } };

  // useEffect(() => {
  //   // socket.current = io('ws://localhost:8900');
  //   socket.current.on('getMessage', (data) => {
  //     setArrivalMessage({
  //       sender: data.senderId,
  //       text: data.text,
  //       createdAt: Date.now(),
  //     });
  //   });
  // }, []);

  useEffect(() => {
    socket.current.emit('addUser', user.user._id);
    socket.current.on('getUsers', (users) => {
      setOnlineUsers(
        user.user.followings.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [user]);

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get(
        API + '/user/followings/' + user.user._id,
        headers
      );
      setFriends(res.data);
    };
    getFriends();
  }, [user]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  const HomeRightbar = () => {
    return (
      <div>
        <h4 className='rightbarTitle'>Online Friends</h4>
        <div className='chatOnline'>
          {onlineFriends.map((o) => (
            <div className='chatOnlineFriend' key={o._id}>
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
              <div className='chatOnlineName'>{o.name}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const ProfileRightbar = ({ data }) => {
    const { id } = useParams();
    const { user, dispatch } = useContext(AuthContext);
    const token = user?.token;
    // user?.user?.followings.includes(id)
    const { loading: loadFollowers, data: userFollowers } = useFetch(
      '/user/followers/' + id
    );
    const { loading: loadFollowing, data: userFollowings } = useFetch(
      '/user/followings/' + id
    );
    const headers = {
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
    };
    // const userId = '62b6af9ab8e3051a8fd92e96';

    console.log(user?.user);
    console.log(user?.user?.followings.includes(id));
    console.log('FOLLOWINGS ', user?.user?.followings);
    console.log(profile);
    console.log(id);
    const [followed, setFollowed] = useState(
      profile?.followers.includes(user?.user?._id)
    );
    // user?.user?.followings?.includes(id)

    console.log(followed);

    function formatDate(input) {
      if (!input) return 'yet to born';
      var datePart = input?.match(/\d+/g),
        year = datePart[0],
        month = datePart[1],
        day = datePart[2];

      return day + '/' + month + '/' + year;
    }

    // useEffect(() => {
    //   setFollowed(user?.user?.followings?.includes(id));
    // }, [user?.user?.followings, id]);

    const follow = async (e) => {
      console.log(e.target.value);
      try {
        await axios.put(API + `/user/${id}/follow`, {}, headers);
        // dispatch({ type: 'FOLLOW', payload: id });
        refresh();
        setFollowed(!followed);
        // window.location.reload();
      } catch (e) {
        console.log(e);
      }
    };

    console.log(token);

    const unfollow = async (e) => {
      console.log(e.target.value);
      try {
        await axios.put(API + `/user/${id}/unfollow`, {}, headers);
        // dispatch({ type: 'UNFOLLOW', payload: id });
        refresh();
        setFollowed(!followed);
        // window.location.reload();
      } catch (e) {
        console.log(e);
      }
    };
    // id !== user?.user?._id
    return (
      <>
        {/* {followed && <h3> YOU FOLLOWING THIS USER </h3>} */}

        {id !== user?.user._id && (
          <>
            {!followed ? (
              <Button variant='outlined' onClick={follow}>
                follow
              </Button>
            ) : (
              <Button variant='contained' onClick={unfollow}>
                unfollow
              </Button>
            )}
          </>
        )}

        <h4 className='rightbarTitle' style={{ marginTop: 20 }}>
          User information
        </h4>
        <div className='rightbarInfo'>
          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>followers:</span>
            <span className='rightbarInfoValue'>
              {profile?.followers.length}
            </span>
          </div>

          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>following:</span>
            <span className='rightbarInfoValue'>
              {profile?.followings.length}
            </span>
          </div>

          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>City:</span>
            <span className='rightbarInfoValue'>{profile?.city}</span>
          </div>
          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>From:</span>
            <span className='rightbarInfoValue'>{profile?.from}</span>
          </div>
          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>Gender:</span>
            <span className='rightbarInfoValue'>{profile?.gender}</span>
          </div>
          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>Relationship:</span>
            <span className='rightbarInfoValue'> {profile?.relationship} </span>
          </div>
          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>Birthday:</span>
            <span className='rightbarInfoValue'>
              {formatDate(profile?.birthDay?.slice(0, 10))}
            </span>
          </div>
          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>Joined:</span>
            <span className='rightbarInfoValue'>
              {format(profile?.createdAt)}
            </span>
          </div>
        </div>

        {/* <h1>Currently followers are : </h1>
        {profile && profile?.followers.map((p) => <h6>{p}</h6>)}
        <h1>Currently following : </h1>
        {profile && profile?.followings.map((p) => <h6>{p}</h6>)} */}

        <h4 className='rightbarTitle'>show followers:</h4>
        {loadFollowers ? (
          <h3>Loading...</h3>
        ) : (
          <div className='rightbarFollowings'>
            {userFollowers &&
              userFollowers.map((f) => (
                <Link
                  style={{ textDecoration: 'none', color: 'black' }}
                  to={'/profile/' + f._id}
                >
                  <div
                    className='rightbarFollowing'
                    key={f._id}
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <img
                      src={PF + f.profilePicture}
                      alt='follower'
                      className='rightbarFollowingImg'
                    />
                    <span className='rightbarFollowingName'>{f.name}</span>
                  </div>
                </Link>
              ))}
          </div>
        )}
        <h4 className='rightbarTitle'>show followings:</h4>
        {loadFollowing ? (
          <h3>Loading...</h3>
        ) : (
          <div className='rightbarFollowings'>
            {userFollowings &&
              userFollowings.map((f) => (
                <Link
                  style={{ textDecoration: 'none', color: 'black' }}
                  to={'/profile/' + f._id}
                >
                  <div
                    className='rightbarFollowing'
                    style={{ display: 'flex', alignItems: 'center' }}
                    key={f._id}
                  >
                    <img
                      src={PF + f.profilePicture}
                      alt='following'
                      className='rightbarFollowingImg'
                    />
                    <span className='rightbarFollowingName'>{f.name}</span>
                  </div>
                </Link>
              ))}
          </div>
        )}
      </>
    );
  };
  return (
    <div className='rightbar' style={{ flex: 2 }}>
      <div className='rightbarWrapper'>
        {profile ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
