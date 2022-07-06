import './rightbar.css';
import { Users } from '../../dummyData';
import Online from '../online/Online';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { API } from '../../api';

export default function Rightbar({ profile }) {
  const HomeRightbar = () => {
    return (
      <>
        <div className='birthdayContainer'>
          <img className='birthdayImg' src='assets/gift.png' alt='' />
          <span className='birthdayText'>
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className='rightbarAd' src='assets/ad.png' alt='' />
        <h4 className='rightbarTitle'>Online Friends</h4>
        <ul className='rightbarFriendList'>
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = ({ data }) => {
    const [followed, setFollowed] = useState(false);
    const { user } = useContext(AuthContext);
    const token = user?.token;
    const headers = {
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
    };
    const userId = '62b6af9ab8e3051a8fd92e96';
    const currentUser = data;

    useEffect(() => {
      setFollowed(currentUser?.followings.includes(userId));
    }, [currentUser, userId]);

    const follow = async (e) => {
      console.log(e.target.value);
      try {
        await axios.put(API + `/user/${userId}/follow`, {}, headers);
      } catch (e) {
        console.log(e);
      }
    };

    console.log(token);

    const unfollow = async (e) => {
      console.log(e.target.value);
      try {
        await axios.put(API + `/user/${userId}/unfollow`, {}, headers);
      } catch (e) {
        console.log(e);
      }
    };

    return (
      <>
        <h4 className='rightbarTitle'>User information</h4>
        <button value='62adf725fff3590e9d18cc14' onClick={follow}>
          follow
        </button>
        <button value='62adf725fff3590e9d18cc14' onClick={unfollow}>
          unfollow
        </button>
        <h1>Currently following is : </h1>
        {profile && profile?.followers.map((p) => <h6>{p}</h6>)}
        <div className='rightbarInfo'>
          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>City:</span>
            <span className='rightbarInfoValue'>New York</span>
          </div>
          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>From:</span>
            <span className='rightbarInfoValue'>Madrid</span>
          </div>
          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>Relationship:</span>
            <span className='rightbarInfoValue'>Single</span>
          </div>
        </div>
        <h4 className='rightbarTitle'>User friends</h4>
        <div className='rightbarFollowings'>
          <div className='rightbarFollowing'>
            <img
              src='assets/person/1.jpeg'
              alt=''
              className='rightbarFollowingImg'
            />
            <span className='rightbarFollowingName'>John Carter</span>
          </div>
          <div className='rightbarFollowing'>
            <img
              src='assets/person/2.jpeg'
              alt=''
              className='rightbarFollowingImg'
            />
            <span className='rightbarFollowingName'>John Carter</span>
          </div>
          <div className='rightbarFollowing'>
            <img
              src='assets/person/3.jpeg'
              alt=''
              className='rightbarFollowingImg'
            />
            <span className='rightbarFollowingName'>John Carter</span>
          </div>
          <div className='rightbarFollowing'>
            <img
              src='assets/person/4.jpeg'
              alt=''
              className='rightbarFollowingImg'
            />
            <span className='rightbarFollowingName'>John Carter</span>
          </div>
          <div className='rightbarFollowing'>
            <img
              src='assets/person/5.jpeg'
              alt=''
              className='rightbarFollowingImg'
            />
            <span className='rightbarFollowingName'>John Carter</span>
          </div>
          <div className='rightbarFollowing'>
            <img
              src='assets/person/6.jpeg'
              alt=''
              className='rightbarFollowingImg'
            />
            <span className='rightbarFollowingName'>John Carter</span>
          </div>
        </div>
      </>
    );
  };
  return (
    <div className='rightbar'>
      <div className='rightbarWrapper'>
        {profile ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
