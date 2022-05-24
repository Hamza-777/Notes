import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { createANote, updateANote } from '../../Reducers/noteReducer';

const NoteEditor = () => {
  const dispatch = useAppDispatch();
  const { currentNote } = useAppSelector((state) => state.note);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: '',
    color: '#fff',
    priority: 'low',
  });

  const { title, content, tags, color, priority } = formData;

  useEffect(() => {
    currentNote
      ? setFormData({
          title: currentNote.title,
          content: currentNote.content,
          tags: currentNote.tags ? currentNote.tags.toString() : '',
          color: currentNote.color,
          priority: currentNote.priority,
        })
      : setFormData({
          title: '',
          content: '',
          tags: '',
          color: '#fff',
          priority: 'low',
        });
  }, [currentNote]);

  const changeHandler = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    currentNote
      ? dispatch(
          updateANote({
            note: {
              title,
              content,
              tags: tags.split(',').map((item) => item.trim()),
              color,
              priority,
            },
            noteId: currentNote._id,
          })
        )
      : dispatch(
          createANote({
            title,
            content,
            tags: tags.split(',').map((item) => item.trim()),
            color,
            priority,
          })
        );
    setFormData({
      ...formData,
      title: '',
      content: '',
      tags: '',
      color: '#fff',
      priority: 'low',
    });
  };

  return (
    <form
      className='form note-form flex-center flex-col'
      onSubmit={submitHandler}
    >
      <input
        type='text'
        name='title'
        value={title}
        placeholder='Set a title for your note...'
        onChange={changeHandler}
      />
      <textarea
        rows={4}
        name='content'
        value={content}
        placeholder='Set a content for your note...'
        onChange={changeHandler}
      ></textarea>
      <input
        type='text'
        name='tags'
        value={tags}
        placeholder='Set tags for your note separated by commas...'
        onChange={changeHandler}
      />
      <div className='form-group flex-center justify-between'>
        <div className='flex-center colors'>
          <div className='flex-center flex-col'>
            <p className='h4'>COLOR</p>
            <p
              className='color color-sm'
              style={{ backgroundColor: color }}
            ></p>
          </div>
          <div
            className='color white'
            onClick={(_e) => setFormData({ ...formData, color: '#fff' })}
          ></div>
          <div
            className='color red'
            onClick={(_e) => setFormData({ ...formData, color: '#ff8c8c' })}
          ></div>
          <div
            className='color blue'
            onClick={(_e) => setFormData({ ...formData, color: '#b3e8e5' })}
          ></div>
          <div
            className='color green'
            onClick={(_e) => setFormData({ ...formData, color: '#e3fcbf' })}
          ></div>
          <div
            className='color yellow'
            onClick={(_e) => setFormData({ ...formData, color: '#ffe69a' })}
          ></div>
        </div>
        <div className='flex-center priority'>
          <div className='flex-center flex-col'>
            <p className='h4'>PRIORITY</p>
            <p className='h6'>{`<${priority}>`}</p>
          </div>
          <button
            type='button'
            className='btn btn-outline'
            onClick={(_e) => setFormData({ ...formData, priority: 'low' })}
          >
            Low
          </button>
          <button
            type='button'
            className='btn btn-outline'
            onClick={(_e) => setFormData({ ...formData, priority: 'medium' })}
          >
            Medium
          </button>
          <button
            type='button'
            className='btn btn-outline'
            onClick={(_e) => setFormData({ ...formData, priority: 'high' })}
          >
            High
          </button>
        </div>
      </div>
      <button className='btn btn-outline'>
        {currentNote ? 'Update' : 'Create'}
      </button>
    </form>
  );
};

export default NoteEditor;
