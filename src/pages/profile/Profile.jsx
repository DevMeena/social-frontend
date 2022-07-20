import { useState, useEffect, useContext } from 'react';
import Feed from '../../Components/feed/Feed';
import Rightbar from '../../Components/rightbar/Rightbar';
import Sidebar from '../../Components/sidebar/Sidebar';
import Topbar from '../../Components/topbar/Topbar';
import { AuthContext } from '../../context/AuthContext';
import { useFetch } from '../../useFetch';
import './profile.css';
import { useParams } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import ModalImage from 'react-modal-image';

export default function Profile() {
  // const [followed, setFollowed] = useState(false);
  // const { user } = useContext(AuthContext);
  const { id } = useParams();
  // const userId = '62b6af9ab8e3051a8fd92e96';
  // const currentUser = 'CR';

  // useEffect(() => {
  //   setFollowed(currentUser?.followings.includes(user?.user?._id));
  // }, [currentUser, user?.user?._id]);
  // ! actually you have to use params
  const { loading, data, error, refetch } = useFetch(`/user/${id}`);

  // const follow = (e) => {
  //   console.log(e.target.value);
  // };

  // const unfollow = (e) => {
  //   console.log(e.target.value);
  // };

  console.log(data);

  return (
    <>
      <CssBaseline />
      <Topbar />

      <div className='profile'>
        <Sidebar />
        <div className='profileRight'>
          <div className='profileRightTop'>
            <div className='profileCover'>
              {/* <img
                className='profileCoverImg'
                src={'http://localhost:8000/images/' + data?.coverPicture}
                alt='cp'
              /> */}
              <ModalImage
                className='profileCoverImg'
                small={'http://localhost:8000/images/' + data?.coverPicture}
                large={'http://localhost:8000/images/' + data?.coverPicture}
              />
              <ModalImage
                className='profileUserImg'
                small={'http://localhost:8000/images/' + data?.profilePicture}
                large={'http://localhost:8000/images/' + data?.profilePicture}
              />
              {/* <img
                className='profileUserImg'
                src={'http://localhost:8000/images/' + data?.profilePicture}
                alt='dp'
              /> */}
            </div>
            <div className='profileInfo'>
              <h4 className='profileInfoName'>{data?.name}</h4>
              <span className='profileInfoDesc'>{data?.desc}</span>
              {/* <button value='62c5cb78da0993a0c1135ea2' onClick={follow}>
                follow
              </button>
              <button value='62c5cb78da0993a0c1135ea2' onClick={unfollow}>
                unfollow
              </button> */}
            </div>
          </div>
          <div className='profileRightBottom'>
            <Feed />
            <Rightbar profile={data} refresh={refetch} />
          </div>
        </div>
      </div>
    </>
  );
}
