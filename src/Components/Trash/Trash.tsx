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
        {trashed && trashed.map((note) => <Note note={note} />)}
      </div>
    </section>
  );
};

export default Trash;
