import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getAllNotes } from '../../Reducers/noteReducer';
import NoteEditor from '../Editor/NoteEditor';
import Note from '../Note/Note';
import './Home.css';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { notes } = useAppSelector((state) => state.note);
  const [filterOptions, setFilterOptions] = useState({
    byPriority: 'all',
    byTag: '',
  });

  const { byPriority, byTag } = filterOptions;

  const changeHandler = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFilterOptions({ ...filterOptions, [name]: value });
  };

  useEffect(() => {
    dispatch(getAllNotes());
  }, [dispatch]);

  return (
    <section className='container'>
      <NoteEditor />
      <p className='h1 all-notes'>Notes</p>
      <div className='filter-panel form flex-center justify-around'>
        <p className='h3'>Filter</p>
        <div className='form-group flex-center'>
          <label htmlFor='priority' className='h5'>
            Filter by priority:
          </label>
          <select
            name='byPriority'
            id='priority'
            value={byPriority}
            onChange={changeHandler}
          >
            <option value='all'>All</option>
            <option value='low'>Low</option>
            <option value='medium'>Medium</option>
            <option value='high'>High</option>
          </select>
        </div>
        <div className='form-group flex-center'>
          <p className='h5'>Filter by tags:</p>
          <input
            name='byTag'
            type='text'
            placeholder='Search for a tag'
            value={byTag}
            onChange={changeHandler}
          />
        </div>
      </div>
      <div className='notes flex-center flex-col'>
        {notes && notes.length > 0 ? (
          notes.map((note) =>
            byPriority === 'all'
              ? note.tags.filter((item) => item.includes(byTag)).length > 0 && (
                  <Note key={note._id} note={note} />
                )
              : note.tags.filter((item) => item.includes(byTag)).length > 0 &&
                note.priority === byPriority && (
                  <Note key={note._id} note={note} />
                )
          )
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

export default Home;
