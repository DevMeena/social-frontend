import Home from './pages/home/Home.js';
import SignInSide from './Components/SignInSide.js';
import SignUpSide from './Components/SignUpSide.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GoogleAuth from './Components/GoogleLogin';
import PrivateRoute from './Components/PrivateRoute';
import ForgotPassword from "./Components/ForgotPassword.js";
import ResetPassword from "./Components/ResetPassword.js";

function App() {
  return (
    <Router>
      <div className='App'>
        <div className='content'>
          <Routes>
            <Route exact path='/' element={<SignInSide />}></Route>
            <Route exact path='/signup' element={<SignUpSide />}></Route>

            <Route element={<PrivateRoute />}>
              <Route exact path='/home' element={<Home />}></Route>
            </Route>
            
            <Route exact path='/forgot' element={<ForgotPassword />}></Route>
            <Route exact path='/reset' element={<ResetPassword />}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
