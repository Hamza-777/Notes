import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { signup } from '../../Reducers/authReducer';
import { errorPopup } from '../../Misc/toasts';

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { name, email, password, confirmPassword } = formData;

  const dispatch = useAppDispatch();
  const { userLoggedIn } = useAppSelector((state) => state.auth);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const signUpUser = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      errorPopup('Passwords do not match!', 'light');
      setFormData({ ...formData, password: '', confirmPassword: '' });
    } else {
      const userData = {
        avatar:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt-F5GQg8qB2fWquF1ltQvAT2Z8Dv5pJLb9w&usqp=CAU',
        name,
        email,
        password,
      };

      dispatch(signup(userData));
    }
  };

  if (userLoggedIn) {
    return <Navigate to='/home' />;
  }

  return (
    <section className='container' id='login-form'>
      <p className='h3' style={{ textAlign: 'center' }}>
        SIGNUP
      </p>
      <form className='form' onSubmit={signUpUser}>
        <div className='form-group'>
          <input
            type='text'
            name='name'
            placeholder='Enter Name'
            value={name}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            name='email'
            placeholder='Enter Email'
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            name='password'
            placeholder='Enter Password'
            value={password}
            onChange={handleChange}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            name='confirmPassword'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className='buttons flex-center flex-col'>
          <button className='btn btn-outline btn-submit'>Signup</button>
          <button className='btn btn-link'>
            Already have an account? <Link to='/'>Login</Link>
          </button>
        </div>
      </form>
    </section>
  );
};

export default Signup;
