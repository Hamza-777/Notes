import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getAllArchived } from '../../Reducers/noteReducer';
import Note from '../Note/Note';

const Archive: React.FC = () => {
  const dispatch = useAppDispatch();
  const { archived } = useAppSelector((state) => state.note);

  useEffect(() => {
    dispatch(getAllArchived());
  }, [dispatch]);

  return (
    <section className='container'>
      <p className='h1 all-notes'>Archive</p>
      <div className='notes flex-center flex-col'>
        {archived && archived.map((note) => <Note note={note} />)}
      </div>
    </section>
  );
};

export default Archive;
