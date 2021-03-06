import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Components/Home/Home';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import Navbar from './Components/Navbar/Navbar';
import Archive from './Components/Archive/Archive';
import Trash from './Components/Trash/Trash';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route
          path='/home'
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path='/archive'
          element={
            <PrivateRoute>
              <Archive />
            </PrivateRoute>
          }
        />
        <Route
          path='/trash'
          element={
            <PrivateRoute>
              <Trash />
            </PrivateRoute>
          }
        />
        <Route
          path='*'
          element={
            <section className='container flex-center'>
              <img
                className='img'
                src='https://cdn.dribbble.com/users/144388/screenshots/1364170/spaceman.gif'
                alt='no content'
                style={{ width: 'auto', height: 'auto' }}
              />
            </section>
          }
        />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
