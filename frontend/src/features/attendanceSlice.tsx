// features/attendanceSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { api } from "../api/api";

// ======================
// Types
// ======================

export type AttendanceStatus = "PRESENT" | "ABSENT" | "LATE"; // selon ton enum Prisma

export interface Attendance {
  id: number;
  sessionId: number;
  studentId: number;
  status: AttendanceStatus;
  student: {
    id: number;
    firstName: string;
    lastName: string;
  };
  session?: {
    id: number;
    date: string;
    class?: { id: number; name: string };
    subject?: { id: number; name: string };
  };
}

export interface CreateAttendanceDTO {
  sessionId: number;
  attendances: {
    studentId: number;
    status: AttendanceStatus;
  }[];
}

interface AttendanceState {
  attendances: Attendance[];
  loading: boolean;
  error: string | null;
}

const initialState: AttendanceState = {
  attendances: [],
  loading: false,
  error: null,
};

// ======================
// Thunks Async
// ======================

// Créer des présences
export const createAttendance = createAsyncThunk<
Attendance[],
CreateAttendanceDTO
>("attendance/create", async (data, { rejectWithValue }) => {
    try {
      
    const res = await api.post<Attendance[]>("/attendance", data);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || "Erreur création présence");
  }
});

// Récupérer par session
export const fetchAttendanceBySession = createAsyncThunk<
  Attendance[],
  number
>("attendance/fetchBySession", async (sessionId, { rejectWithValue }) => {
  try {
    const res = await api.get<Attendance[]>(`/attendance/session/${sessionId}`);

    console.log(res);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || "Erreur chargement par session");
  }
});

// Récupérer par élève
export const fetchAttendanceByStudent = createAsyncThunk<
  Attendance[],
  number
>("attendance/fetchByStudent", async (studentId, { rejectWithValue }) => {
  try {
    const res = await api.get<Attendance[]>(`/attendance/student/${studentId}`);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || "Erreur chargement par élève");
  }
});

// Récupérer par classe
export const fetchAttendanceByClass = createAsyncThunk<
  Attendance[],
  number
>("attendance/fetchByClass", async (classId, { rejectWithValue }) => {
  try {
    const res = await api.get<Attendance[]>(`/attendance/class/${classId}`);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || "Erreur chargement par classe");
  }
});

// Récupérer par période
export const fetchAttendanceByPeriod = createAsyncThunk<
  Attendance[],
  { start: string; end: string }
>("attendance/fetchByPeriod", async ({ start, end }, { rejectWithValue }) => {
  try {
    const res = await api.get<Attendance[]>(`/attendance/period?start=${start}&end=${end}`);
    return res.data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || "Erreur chargement par période");
  }
});

// ======================
// Slice
// ======================

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    clearAttendanceError(state) {
      state.error = null;
    },
    clearAttendance(state) {
      state.attendances = [];
    },
  },
  extraReducers: (builder) => {
    // createAttendance
    builder
      .addCase(createAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAttendance.fulfilled, (state, action: PayloadAction<Attendance[]>) => {
        state.loading = false;
        // On peut ajouter les nouvelles présences ou remplacer complètement selon ton UX
        state.attendances = [...state.attendances, ...action.payload];
      })
      .addCase(createAttendance.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload || "Erreur création présence";
      });

    // fetchAttendanceBySession
    builder
      .addCase(fetchAttendanceBySession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAttendanceBySession.fulfilled, (state, action: PayloadAction<Attendance[]>) => {
        state.loading = false;
        state.attendances = action.payload;
      })
      .addCase(fetchAttendanceBySession.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });

    // fetchAttendanceByStudent
    builder
      .addCase(fetchAttendanceByStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAttendanceByStudent.fulfilled, (state, action: PayloadAction<Attendance[]>) => {
        state.loading = false;
        state.attendances = action.payload;
      })
      .addCase(fetchAttendanceByStudent.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });

    // fetchAttendanceByClass
    builder
      .addCase(fetchAttendanceByClass.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAttendanceByClass.fulfilled, (state, action: PayloadAction<Attendance[]>) => {
        state.loading = false;
        state.attendances = action.payload;
      })
      .addCase(fetchAttendanceByClass.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });

    // fetchAttendanceByPeriod
    builder
      .addCase(fetchAttendanceByPeriod.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAttendanceByPeriod.fulfilled, (state, action: PayloadAction<Attendance[]>) => {
        state.loading = false;
        state.attendances = action.payload;
      })
      .addCase(fetchAttendanceByPeriod.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// ======================
// Exports
// ======================

export const { clearAttendanceError, clearAttendance } = attendanceSlice.actions;
export default attendanceSlice.reducer;
