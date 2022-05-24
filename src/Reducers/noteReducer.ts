import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AnyAction } from 'redux';
import {
  archiveNote,
  createNote,
  deleteNote,
  getNotes,
  getNote,
  trashNote,
  updateNote,
  getArchived,
  getTrash,
  deleteNoteArchive,
  deleteNoteTrash,
  restoreNote,
  unarchiveNote,
} from '../Misc/requests';

interface Note {
  _id: string;
  title: string;
  content: string;
  tags: Array<string>;
  color: string;
  priority: string;
}

interface NoteState {
  notes: Note[];
  archived: Note[];
  trashed: Note[];
  currentNote: null | Note;
  loading: boolean;
}

const initialState: NoteState = {
  notes: [],
  archived: [],
  trashed: [],
  currentNote: null,
  loading: false,
};

export const getAllNotes = createAsyncThunk(
  'note/getAllNotes',
  async (thunkAPI) => {
    try {
      return await getNotes();
    } catch (err: any) {}
  }
);

export const getANote = createAsyncThunk(
  'note/getANote',
  async (noteId: string, thunkAPI) => {
    try {
      return await getNote(noteId);
    } catch (err: any) {
      const message =
        err?.response?.data?.message || err.message || err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createANote = createAsyncThunk(
  'note/create',
  async (note: {}, thunkAPI) => {
    try {
      return await createNote(note);
    } catch (err: any) {
      const message =
        err?.response?.data?.message || err.message || err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateANote = createAsyncThunk(
  'note/update',
  async (data: { note: {}; noteId: string }, thunkAPI) => {
    const { note, noteId } = data;
    try {
      return await updateNote(note, noteId);
    } catch (err: any) {
      const message =
        err?.response?.data?.message || err.message || err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteANote = createAsyncThunk(
  'note/delete',
  async (noteId: string, thunkAPI) => {
    try {
      return await deleteNote(noteId);
    } catch (err: any) {
      const message =
        err?.response?.data?.message || err.message || err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllArchived = createAsyncThunk(
  'note/getAllArchived',
  async (thunkAPI) => {
    try {
      return await getArchived();
    } catch (err: any) {}
  }
);

export const archiveANote = createAsyncThunk(
  'note/archive',
  async (noteId: string, thunkAPI) => {
    try {
      return await archiveNote(noteId);
    } catch (err: any) {
      const message =
        err?.response?.data?.message || err.message || err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const unarchiveANote = createAsyncThunk(
  'note/unarchive',
  async (noteId: string, thunkAPI) => {
    try {
      return await unarchiveNote(noteId);
    } catch (err: any) {
      const message =
        err?.response?.data?.message || err.message || err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteANoteArchive = createAsyncThunk(
  'note/deleteArchive',
  async (noteId: string, thunkAPI) => {
    try {
      return await deleteNoteArchive(noteId);
    } catch (err: any) {
      const message =
        err?.response?.data?.message || err.message || err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllTrashed = createAsyncThunk(
  'note/getAllTrashed',
  async (thunkAPI) => {
    try {
      return await getTrash();
    } catch (err: any) {}
  }
);

export const trashANote = createAsyncThunk(
  'note/trash',
  async (noteId: string, thunkAPI) => {
    try {
      return await trashNote(noteId);
    } catch (err: any) {
      const message =
        err?.response?.data?.message || err.message || err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteANoteTrash = createAsyncThunk(
  'note/deleteTrash',
  async (noteId: string, thunkAPI) => {
    try {
      return await deleteNoteTrash(noteId);
    } catch (err: any) {
      const message =
        err?.response?.data?.message || err.message || err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const restoreANote = createAsyncThunk(
  'note/restore',
  async (noteId: string, thunkAPI) => {
    try {
      return await restoreNote(noteId);
    } catch (err: any) {
      const message =
        err?.response?.data?.message || err.message || err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    resetNotes: (state) => {
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllNotes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllNotes.fulfilled, (state, action: AnyAction) => {
        state.loading = false;
        state.notes = action.payload;
        state.currentNote = null;
      })
      .addCase(getAllNotes.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getANote.pending, (state) => {
        state.loading = true;
      })
      .addCase(getANote.fulfilled, (state, action: AnyAction) => {
        state.loading = false;
        state.currentNote = action.payload;
      })
      .addCase(getANote.rejected, (state) => {
        state.loading = false;
      })
      .addCase(createANote.pending, (state) => {
        state.loading = true;
      })
      .addCase(createANote.fulfilled, (state, action: AnyAction) => {
        state.loading = false;
        state.notes = action.payload;
        state.currentNote = null;
      })
      .addCase(createANote.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateANote.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateANote.fulfilled, (state, action: AnyAction) => {
        state.loading = false;
        state.notes = action.payload;
        state.currentNote = null;
      })
      .addCase(updateANote.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteANote.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteANote.fulfilled, (state, action: AnyAction) => {
        state.loading = false;
        state.notes = action.payload;
        state.currentNote = null;
      })
      .addCase(deleteANote.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getAllArchived.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllArchived.fulfilled, (state, action: AnyAction) => {
        state.loading = false;
        state.archived = action.payload;
        state.currentNote = null;
      })
      .addCase(getAllArchived.rejected, (state) => {
        state.loading = false;
      })
      .addCase(archiveANote.pending, (state) => {
        state.loading = true;
      })
      .addCase(archiveANote.fulfilled, (state, action: AnyAction) => {
        state.loading = false;
        state.archived = action.payload[0];
        state.notes = action.payload[1];
        state.currentNote = null;
      })
      .addCase(archiveANote.rejected, (state) => {
        state.loading = false;
      })
      .addCase(unarchiveANote.pending, (state) => {
        state.loading = true;
      })
      .addCase(unarchiveANote.fulfilled, (state, action: AnyAction) => {
        state.loading = false;
        state.archived = action.payload[0];
        state.notes = action.payload[1];
        state.currentNote = null;
      })
      .addCase(unarchiveANote.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteANoteArchive.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteANoteArchive.fulfilled, (state, action: AnyAction) => {
        state.loading = false;
        state.archived = action.payload;
        state.currentNote = null;
      })
      .addCase(deleteANoteArchive.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getAllTrashed.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllTrashed.fulfilled, (state, action: AnyAction) => {
        state.loading = false;
        state.trashed = action.payload;
        state.currentNote = null;
      })
      .addCase(getAllTrashed.rejected, (state) => {
        state.loading = false;
      })
      .addCase(trashANote.pending, (state) => {
        state.loading = true;
      })
      .addCase(trashANote.fulfilled, (state, action: AnyAction) => {
        state.loading = false;
        state.trashed = action.payload[0];
        state.notes = action.payload[1];
        state.currentNote = null;
      })
      .addCase(trashANote.rejected, (state) => {
        state.loading = false;
      })
      .addCase(restoreANote.pending, (state) => {
        state.loading = true;
      })
      .addCase(restoreANote.fulfilled, (state, action: AnyAction) => {
        state.loading = false;
        state.trashed = action.payload[0];
        state.notes = action.payload[1];
        state.currentNote = null;
      })
      .addCase(restoreANote.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteANoteTrash.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteANoteTrash.fulfilled, (state, action: AnyAction) => {
        state.loading = false;
        state.trashed = action.payload;
        state.currentNote = null;
      })
      .addCase(deleteANoteTrash.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { resetNotes } = noteSlice.actions;
export default noteSlice.reducer;
