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

export default Trash;
