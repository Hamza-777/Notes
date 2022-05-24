import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getAllTrashed } from '../../Reducers/noteReducer';
import Note from '../Note/Note';

const Trash: React.FC = () => {
  const dispatch = useAppDispatch();
  const { trashed } = useAppSelector((state) => state.note);

  useEffect(() => {
    dispatch(getAllTrashed());
  }, [dispatch]);

  return (
    <section className='container'>
      <p className='h1 all-notes'>Trash</p>
      <div className='notes flex-center flex-col'>
        {trashed && trashed.length > 0 ? (
          trashed.map((note) => <Note note={note} />)
        ) : (
          <div className='flex-center'>
            <img
              className='img'
              src='https://cdn.dribbble.com/users/144388/screenshots/1364170/spaceman.gif'
              alt='no content'
              style={{ width: 'auto', height: 'auto' }}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Trash;
