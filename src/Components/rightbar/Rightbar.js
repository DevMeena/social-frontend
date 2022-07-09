import './rightbar.css';
import { Users } from '../../dummyData';
import Online from '../online/Online';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { API } from '../../api';
import { useParams } from 'react-router-dom';

export default function Rightbar({ profile }) {
  const HomeRightbar = () => {
    return (
      <div>
        {/* <div className='birthdayContainer'>
          <img className='birthdayImg' src='assets/gift.png' alt='' />
          <span className='birthdayText'>
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div> */}
        {/* <img className='rightbarAd' src='assets/ad.png' alt='' /> */}
        <h4 className='rightbarTitle'>Online Friends</h4>
        <ul className='rightbarFriendList'>
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </div>
    );
  };

  const ProfileRightbar = ({ data }) => {
    const { id } = useParams();
    const [followed, setFollowed] = useState(data?.followings.includes(id));
    const { user } = useContext(AuthContext);
    const token = user?.token;
    const headers = {
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
    };
    // const userId = '62b6af9ab8e3051a8fd92e96';

    const currentUser = data;
    console.log(currentUser?.followings.includes(user?.user?._id));
    useEffect(() => {
      setFollowed(currentUser?.followings.includes(user?.user?._id));
    }, [currentUser, user?.user?._id]);

    const follow = async (e) => {
      console.log(e.target.value);
      try {
        await axios.put(API + `/user/${id}/follow`, {}, headers);
        window.location.reload();
      } catch (e) {
        console.log(e);
      }
    };

    console.log(token);

    const unfollow = async (e) => {
      console.log(e.target.value);
      try {
        await axios.put(API + `/user/${id}/unfollow`, {}, headers);
        window.location.reload();
      } catch (e) {
        console.log(e);
      }
    };
    // id !== user?.user?._id
    return (
      <>
        <h4 className='rightbarTitle'>User information</h4>

        {followed && <h3> YOU FOLLOWING THIS USER </h3>}

        {/* {followed ? ( */}
        <button value='62adf725fff3590e9d18cc14' onClick={unfollow}>
          unfollow
        </button>
        {/* ) : ( */}
        <button value='62adf725fff3590e9d18cc14' onClick={follow}>
          follow
        </button>
        {/* )} */}

        <div className='rightbarInfo'>
          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>followers:</span>
            <span className='rightbarInfoValue'>69</span>
          </div>

          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>following:</span>
            <span className='rightbarInfoValue'>69</span>
          </div>

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
          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>Birthday:</span>
            <span className='rightbarInfoValue'>01/01/2001</span>
          </div>
          <div className='rightbarInfoItem'>
            <span className='rightbarInfoKey'>Joined:</span>
            <span className='rightbarInfoValue'>1 month ago</span>
          </div>
        </div>

        <h1>Currently followers are : </h1>
        {profile && profile?.followers.map((p) => <h6>{p}</h6>)}
        <h1>Currently following : </h1>
        {profile && profile?.followings.map((p) => <h6>{p}</h6>)}
        {/* <h4 className='rightbarTitle'>User friends</h4>
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
        </div> */}
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
