import axios from 'axios';
import {
  getTheme,
  setAuth,
  getAuth,
  setUser,
  removeAuth,
  removeUser,
} from './localStorage';
import { successPopup, errorPopup } from './toasts';

// Auth Requests

const sendLoginReq = async (body) => {
  try {
    const response = await axios.post('/api/auth/login', body);
    setAuth(response.data.encodedToken);
    setUser(response.data.foundUser);
    successPopup('Logged In successfully!', getTheme());
    return response.data.encodedToken === undefined
      ? null
      : [response.data.encodedToken, response.data.foundUser];
  } catch (err) {
    err.response.status === 401
      ? errorPopup('Authorization denied! Wrong credentials.', getTheme())
      : errorPopup('No such user exists!', getTheme());
  }
};

const sendSignupReq = async (body) => {
  try {
    const response = await axios.post('/api/auth/signup', body);
    setAuth(response.data.encodedToken);
    setUser(response.data.createdUser);
    successPopup('Signed Up successfully!', getTheme());
    return response.data.encodedToken === undefined
      ? null
      : [response.data.encodedToken, response.data.createdUser];
  } catch (err) {
    if (err.response.status === 422) {
      errorPopup('User already exists!', getTheme());
    }
  }
};

const logoutUser = () => {
  removeAuth();
  removeUser();
};

// Post Requests

const getNotes = async () => {
  const config = {
    headers: {
      authorization: getAuth(),
    },
  };
  try {
    const response = await axios.get('/api/notes', config);
    return response.data.notes.reverse();
  } catch (err) {
    errorPopup('No such user exists!', getTheme());
  }
};

const getNote = async (id) => {
  const config = {
    headers: {
      authorization: getAuth(),
    },
  };
  try {
    const response = await axios.get(`/api/notes/${id}`, config);
    return response.data.note;
  } catch (err) {
    errorPopup('No such user exists!', getTheme());
  }
};

const createNote = async (body) => {
  const config = {
    headers: {
      authorization: getAuth(),
    },
  };
  try {
    const response = await axios.post('/api/notes', { note: body }, config);
    successPopup('Note Created!', getTheme());
    return response.data.notes.reverse();
  } catch (err) {
    errorPopup('No such user exists!', getTheme());
  }
};

const deleteNote = async (id) => {
  const config = {
    headers: {
      authorization: getAuth(),
    },
  };
  try {
    const response = await axios.delete(`/api/notes/${id}`, config);
    successPopup('Note Deleted!', getTheme());
    return response.data.notes.reverse();
  } catch (err) {
    errorPopup('No such user exists!', getTheme());
  }
};

const updateNote = async (body, id) => {
  const config = {
    headers: {
      authorization: getAuth(),
    },
  };
  try {
    const response = await axios.post(
      `/api/notes/${id}`,
      { note: body },
      config
    );
    successPopup('Note Updated!', getTheme());
    return response.data.notes.reverse();
  } catch (err) {
    errorPopup('No such user exists!', getTheme());
  }
};

const getArchived = async () => {
  const config = {
    headers: {
      authorization: getAuth(),
    },
  };
  try {
    const response = await axios.get('/api/archives', config);
    return response.data.archives.reverse();
  } catch (err) {
    errorPopup('No such user exists!', getTheme());
  }
};

const archiveNote = async (id) => {
  const config = {
    headers: {
      authorization: getAuth(),
    },
  };
  try {
    const response = await axios.post(`/api/notes/archives/${id}`, {}, config);
    successPopup('Note Archived!', getTheme());
    return [response.data.archives.reverse(), response.data.notes.reverse()];
  } catch (err) {
    errorPopup('No such user exists!', getTheme());
  }
};

const deleteNoteArchive = async (id) => {
  const config = {
    headers: {
      authorization: getAuth(),
    },
  };
  try {
    const response = await axios.delete(`/api/archives/delete/${id}`, config);
    successPopup('Note Deleted!', getTheme());
    return response.data.archives.reverse();
  } catch (err) {
    errorPopup('No such user exists!', getTheme());
  }
};

const unarchiveNote = async (id) => {
  const config = {
    headers: {
      authorization: getAuth(),
    },
  };
  try {
    const response = await axios.post(
      `/api/archives/restore/${id}`,
      {},
      config
    );
    successPopup('Note Unarchived!', getTheme());
    return [response.data.archives.reverse(), response.data.notes.reverse()];
  } catch (err) {
    errorPopup('No such user exists!', getTheme());
  }
};

const getTrash = async () => {
  const config = {
    headers: {
      authorization: getAuth(),
    },
  };
  try {
    const response = await axios.get('/api/trash', config);
    return response.data.trash.reverse();
  } catch (err) {
    errorPopup('No such user exists!', getTheme());
  }
};

const trashNote = async (id) => {
  const config = {
    headers: {
      authorization: getAuth(),
    },
  };
  try {
    const response = await axios.post(`/api/notes/trash/${id}`, {}, config);
    successPopup('Note Trashed!', getTheme());
    return [response.data.trash.reverse(), response.data.notes.reverse()];
  } catch (err) {
    errorPopup('No such user exists!', getTheme());
  }
};

const deleteNoteTrash = async (id) => {
  const config = {
    headers: {
      authorization: getAuth(),
    },
  };
  try {
    const response = await axios.delete(`/api/trash/delete/${id}`, config);
    successPopup('Note Deleted!', getTheme());
    return response.data.trash.reverse();
  } catch (err) {
    errorPopup('No such user exists!', getTheme());
  }
};

const restoreNote = async (id) => {
  const config = {
    headers: {
      authorization: getAuth(),
    },
  };
  try {
    const response = await axios.post(`/api/trash/restore/${id}`, {}, config);
    successPopup('Note Restored!', getTheme());
    return [response.data.trash.reverse(), response.data.notes.reverse()];
  } catch (err) {
    errorPopup('No such user exists!', getTheme());
  }
};

export {
  sendLoginReq,
  sendSignupReq,
  logoutUser,
  getNotes,
  getNote,
  createNote,
  deleteNote,
  updateNote,
  getArchived,
  archiveNote,
  deleteNoteArchive,
  unarchiveNote,
  getTrash,
  trashNote,
  deleteNoteTrash,
  restoreNote,
};
