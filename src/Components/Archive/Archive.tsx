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
        {archived && archived.length > 0 ? (
          archived.map((note) => <Note note={note} />)
        ) : (
          <img
            className='img'
            src='https://static.vecteezy.com/system/resources/previews/005/006/031/original/no-result-data-document-or-file-not-found-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-etc-vector.jpg'
            alt='no content'
          />
        )}
      </div>
    </section>
  );
};

export default Archive;
