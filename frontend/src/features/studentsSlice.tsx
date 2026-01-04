import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import {api} from "../api/api"

/* =======================
   TYPES
======================= */

export interface Class {
  id: number;
  name: string;
}

export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email?: string;
  classId: number;
  class: Class;
}

export interface CreateStudentDTO {
  firstName: string;
  lastName: string;
  email?: string;
  classId: number;
}

export interface UpdateStudentDTO {
  firstName?: string;
  lastName?: string;
  email?: string;
  classId?: number;
}

interface StudentsState {
  students: Student[];
  selectedStudent: Student | null;
  loading: boolean;
  error: string | null;
}

/* =======================
   INITIAL STATE
======================= */

const initialState: StudentsState = {
  students: [],
  selectedStudent: null,
  loading: false,
  error: null,
};

/* =======================
   ASYNC THUNKS
======================= */

// GET /students
export const fetchStudents = createAsyncThunk(
  "students/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get<Student[]>("/students");
console.log(res);

      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// GET /students/:id
export const fetchStudentById = createAsyncThunk(
  "students/fetchOne",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await api.get<Student>(`/students/${id}`);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// POST /students
export const createStudent = createAsyncThunk(
  "students/create",
  async (data: CreateStudentDTO, { rejectWithValue }) => {
    try {
      const res = await api.post<Student>("/students", data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// PUT /students/:id
export const updateStudent = createAsyncThunk(
  "students/update",
  async (
    { id, data }: { id: number; data: UpdateStudentDTO },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.put<Student>(`/students/${id}`, data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// DELETE /students/:id
export const deleteStudent = createAsyncThunk(
  "students/delete",
  async (id: number, { rejectWithValue }) => {
    try {
      await api.delete(`/students/${id}`);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

/* =======================
   SLICE
======================= */

const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    clearSelectedStudent(state) {
      state.selectedStudent = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // FETCH ALL
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action: PayloadAction<Student[]>) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // FETCH ONE
      .addCase(fetchStudentById.fulfilled, (state, action: PayloadAction<Student>) => {
        state.selectedStudent = action.payload;
      })

      // CREATE
      .addCase(createStudent.fulfilled, (state, action: PayloadAction<Student>) => {
        state.students.unshift(action.payload);
      })

      // UPDATE
      .addCase(updateStudent.fulfilled, (state, action: PayloadAction<Student>) => {
        const index = state.students.findIndex(s => s.id === action.payload.id);
        if (index !== -1) {
          state.students[index] = action.payload;
        }
      })

      // DELETE
      .addCase(deleteStudent.fulfilled, (state, action: PayloadAction<number>) => {
        state.students = state.students.filter(s => s.id !== action.payload);
      });
  },
});

export const { clearSelectedStudent } = studentsSlice.actions;
export default studentsSlice.reducer;
