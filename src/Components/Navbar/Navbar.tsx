import React from 'react';
import './Navbar.css';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { logout } from '../../Reducers/authReducer';
import { successPopup } from '../../Misc/toasts';
import { Link, Navigate, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { userLoggedIn } = useAppSelector((state) => state.auth);
  const location = useLocation().pathname;

  const logoutUser = (e: any) => {
    dispatch(logout());
    successPopup('Logged Out successfully!', 'light');
    return <Navigate to='/login' />;
  };

  return (
    <header className='header flex-center flex-col'>
      <nav className='navbar flex-center justify-between'>
        <section className='navbar-left'>
          <Link to='/home' className='h1'>
            NOTES
          </Link>
        </section>
        <section className='navbar-right'>
          {userLoggedIn ? (
            <button className='btn btn-outline' onClick={logoutUser}>
              Logout
            </button>
          ) : (
            <Link to='/' className='btn btn-outline'>
              Login
            </Link>
          )}
        </section>
      </nav>
      {
        location !== '/' && location !== '/signup' && <article className='user-controls flex-center'>
        <Link to='/home' className='btn btn-outline'>
          Home
        </Link>
        <Link to='/archive' className='btn btn-outline'>
          Archive
        </Link>
        <Link to='/trash' className='btn btn-outline'>
          Trash
        </Link>
      </article>
      }
    </header>
  );
};

export default Navbar;
