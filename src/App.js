import './App.css';
import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Login from './Components/Login/Login';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer'
import Register from './Components/Register/Register';
import HomeScreen from './Components/HomeScreen/HomeScreen';
import ContestScreen from './Components/ContestScreen/ContestScreen'
import { auth } from './firebase';
import { logout, login, selectUser } from './Features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import User from './Components/User/User';

function App() {

  const user = useSelector(selectUser)
  const dispatch = useDispatch();
  const history = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(login({
          uid: authUser.uid,
          photoURL: authUser.photoURL,
          username: authUser.displayName,
          email: authUser.email
        }))
        console.log(user);
        history('/user')
      } else {
        console.log(user);
        dispatch(logout)
      }
    })
    console.log(user);
    return unsubscribe;
  }, [])

  return (
    <div className="App">
      <Routes>
        <Route exact path="/register" element={
          <div className='login__register'>
            <Navbar />
            <Register />
            <Footer />
          </div>
        } />
        <Route exact path="/login" element={
          <div className='login__register'>
            <Navbar />
            <Login />
            <Footer />
          </div>
        } />
        <Route path="/home" element={
          <HomeScreen />
        } />
        <Route path="/contests" element={
          <ContestScreen />
        } />
        <Route path='/user' element={
          <User />
        } />
        <Route path="/" element={
          <HomeScreen />
        } />
      </Routes>
    </div >
  );
}

export default App;