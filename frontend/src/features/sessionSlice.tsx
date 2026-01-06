// slices/sessionSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { api } from "../api/api";

// ======================
// Types intégrés
// ======================
export interface Session {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
  classId: number;
  subjectId: number;
  teacherId: number;

  class: { id: number; name: string };
  subject: { id: number; name: string };
  teacher: { id: number; name: string };

  createdAt: string;
}

export interface CreateSessionDTO {
  date: string;
  startTime: string;
  endTime: string;
  classId: number;
  subjectId: number;
  teacherId: number;
}

// State
interface SessionState {
  sessions: Session[];
  loading: boolean;
  error: string | null;
}

const initialState: SessionState = {
  sessions: [],
  loading: false,
  error: null,
};

// ======================
// Thunks async
// ======================

// GET /sessions
export const fetchSessions = createAsyncThunk<Session[]>(
  "session/fetchAll",
  async () => {
    const response = await api.get<Session[]>("/sessions");
    return response.data;
  }
);

// POST /sessions
export const createSession = createAsyncThunk<Session, CreateSessionDTO>(
  "session/create",
  async (data) => {
    const response = await api.post<Session>("/sessions", data);
    return response.data;
  }
);

// ======================
// Slice
// ======================
const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchSessions
      .addCase(fetchSessions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSessions.fulfilled, (state, action: PayloadAction<Session[]>) => {
        state.loading = false;
        state.sessions = action.payload;
      })
      .addCase(fetchSessions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors du chargement des sessions";
      })

      // createSession
      .addCase(createSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSession.fulfilled, (state, action: PayloadAction<Session>) => {
        state.loading = false;
        state.sessions.unshift(action.payload);
      })
      .addCase(createSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors de la création de la session";
      });
  },
});

// ======================
// Exports
// ======================
export const { clearError } = sessionSlice.actions;
export default sessionSlice.reducer;
