import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { login } from '../../Reducers/authReducer';
import './Login.css';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const dispatch = useAppDispatch();
  const { userLoggedIn } = useAppSelector((state) => state.auth);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const logInUser = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };

  const loginAsGuest = () => {
    setFormData({
      ...formData,
      email: 'guest@gmail.com',
      password: 'guest777',
    });
    dispatch(
      login({
        email: 'guest@gmail.com',
        password: 'guest777',
      })
    );
  };

  if (userLoggedIn) {
    return <Navigate to='/home' />;
  }

  return (
    <section className='container' id='login-form'>
      <p className='h3' style={{ textAlign: 'center' }}>
        LOGIN
      </p>
      <form className='form' onSubmit={logInUser}>
        <div className='form-group'>
          <input
            type='email'
            name='email'
            placeholder='Your Email'
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            name='password'
            placeholder='Your Password'
            value={password}
            onChange={handleChange}
            required
          />
        </div>
        <div className='buttons flex-center flex-col'>
          <button className='btn btn-outline btn-submit'>Login</button>
          <div className='or flex-center'>
            <hr className='hr' />
            <p className='h5'>or</p>
            <hr className='hr' />
          </div>
          <button
            type='button'
            className='btn btn-outline btn-submit'
            onClick={loginAsGuest}
          >
            Login with guest credentials
          </button>

          <button type='button' className='btn btn-link'>
            Don't have an account? <Link to='/signup'>Create Account</Link>
          </button>
        </div>
      </form>
    </section>
  );
};

export default Login;
