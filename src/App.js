import Home from './pages/home/Home.js';
import Profile from './pages/profile/Profile';
import SignInSide from './Components/SignInSide.js';
import SignUpSide from './Components/SignUpSide.js';
import Messenger from './pages/messenger/Messenger.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './Components/PrivateRoute';
import ForgotPassword from './Components/ForgotPassword.js';
import ResetPassword from './Components/ResetPassword.js';
import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import Test from './Test.js';
import EditPost from './Components/share/EditPost.js';
import Search from './pages/search/search.jsx';
import UpdateProfile from './pages/updateProfile/updateProfile.jsx';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <div className='App'>
        <div className='content'>
          <Routes>
            <Route
              exact
              path='/'
              element={user ? <Navigate to='/home' /> : <SignInSide />}
            ></Route>

            <Route
              exact
              path='/signup'
              element={user ? <Navigate to='/home' /> : <SignUpSide />}
            ></Route>

            <Route
              exact
              path='/messenger'
              element={user ? <Messenger /> : <Navigate to='/' />}
            ></Route>

            <Route element={<PrivateRoute />}>
              <Route
                exact
                path='/editpost/:postId'
                element={<EditPost />}
              ></Route>
              <Route exact path='/home' element={<Home />}></Route>
              <Route exact path='/profile/:id' element={<Profile />}></Route>
              <Route exact path='/update' element={<UpdateProfile />}></Route>
              <Route exact path='/reset' element={<ResetPassword />}></Route>
              <Route exact path='/search/:key' element={<Search />}></Route>
            </Route>

            <Route exact path='/forgot' element={<ForgotPassword />}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
