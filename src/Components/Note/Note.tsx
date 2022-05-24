import React from 'react';
import { FaRegEdit, FaTrashRestore, FaTimes } from 'react-icons/fa';
import {
  RiDeleteBin5Line,
  RiInboxArchiveLine,
  RiInboxUnarchiveLine,
} from 'react-icons/ri';
import { useAppDispatch } from '../../hooks';
import {
  getANote,
  trashANote,
  archiveANote,
  deleteANote,
  deleteANoteArchive,
  deleteANoteTrash,
  restoreANote,
  unarchiveANote,
} from '../../Reducers/noteReducer';
import { useLocation } from 'react-router-dom';
import './Note.css';

interface Props {
  note: {
    _id: string;
    title: string;
    content: string;
    tags: Array<string>;
    color: string;
    priority: string;
  };
}

const Note: React.FC<Props> = ({
  note: { _id, title, content, tags, color, priority },
}) => {
  const dispatch = useAppDispatch();
  const location = useLocation().pathname;

  return (
    <div
      className='note flex flex-col align-start justify-center'
      style={{ backgroundColor: color }}
    >
      <p className='note-title h2'>
        {title.charAt(0).toUpperCase() + title.slice(1)}
      </p>
      <p className='note-content h5'>
        {content.charAt(0).toUpperCase() + content.slice(1)}
      </p>
      <div className='note-tags flex flex-row-wrap align-center justify-start'>
        <h5>TAGS: </h5>
        {tags && tags.filter((tag) => tag !== '').length > 0 ? (
          tags.map((tag, idx) => (
            <div key={idx} className='tag'>
              {tag}
            </div>
          ))
        ) : (
          <p>None</p>
        )}
      </div>
      <div className='h4'>Priority: {priority}</div>
      <div className='todo-icons flex-center'>
        {location === '/home' && (
          <FaRegEdit
            className='icon'
            onClick={(_e) => dispatch(getANote(_id))}
          />
        )}
        {location === '/archive' ? (
          <RiInboxUnarchiveLine
            className='icon'
            onClick={(_e) => dispatch(unarchiveANote(_id))}
          />
        ) : (
          location !== '/trash' && (
            <RiInboxArchiveLine
              className='icon'
              onClick={(_e) => dispatch(archiveANote(_id))}
            />
          )
        )}
        {location === '/trash' ? (
          <FaTrashRestore
            className='icon'
            onClick={(_e) => dispatch(restoreANote(_id))}
          />
        ) : (
          location !== '/archive' && (
            <RiDeleteBin5Line
              className='icon'
              onClick={(_e) => dispatch(trashANote(_id))}
            />
          )
        )}
        <FaTimes
          className='icon'
          onClick={(_e) =>
            location === '/home'
              ? dispatch(deleteANote(_id))
              : location === '/archive'
              ? dispatch(deleteANoteArchive(_id))
              : dispatch(deleteANoteTrash(_id))
          }
        />
      </div>
    </div>
  );
};

export default Note;
