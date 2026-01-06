// subjectSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { api } from "../api/api";



export interface Subject {
  id: number;
  name: string;
  code: string;
  createdAt: string; // côté frontend on reçoit JSON
}

export interface CreateSubjectDTO {
  name: string;
  code: string;
}

export interface UpdateSubjectDTO {
  name?: string;
  code?: string;
}

interface SubjectState {
  subjects: Subject[];
  currentSubject: Subject | null;
  loading: boolean;
  error: string | null;
}

const initialState: SubjectState = {
  subjects: [],
  currentSubject: null,
  loading: false,
  error: null,
};

// ======================
// Thunks async
// ======================

// GET /subjects
export const fetchSubjects = createAsyncThunk<Subject[]>(
  "subject/fetchAll",
  async () => {
    const response = await api.get<Subject[]>("/subjects");
    return response.data;
  }
);

// GET /subjects/:id
export const fetchSubjectById = createAsyncThunk<Subject, number>(
  "subject/fetchOne",
  async (id) => {
    const response = await api.get<Subject>(`/subjects/${id}`);
    return response.data;
  }
);

// POST /subjects
export const createSubject = createAsyncThunk<Subject, CreateSubjectDTO>(
  "subject/create",
  async (data) => {
    const response = await api.post<Subject>("/subjects", data);
    return response.data;
  }
);

// PUT /subjects/:id
export const updateSubject = createAsyncThunk<
  Subject,
  { id: number; data: UpdateSubjectDTO }
>("subject/update", async ({ id, data }) => {
  const response = await api.put<Subject>(`/subjects/${id}`, data);
  return response.data;
});

// DELETE /subjects/:id
export const deleteSubject = createAsyncThunk<number, number>(
  "subject/delete",
  async (id) => {
    await api.delete(`/subjects/${id}`);
    return id; // pour retirer du state
  }
);

// ======================
// Slice
// ======================

const subjectSlice = createSlice({
  name: "subject",
  initialState,
  reducers: {
    clearCurrentSubject(state) {
      state.currentSubject = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchSubjects
      .addCase(fetchSubjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubjects.fulfilled, (state, action: PayloadAction<Subject[]>) => {
        state.loading = false;
        state.subjects = action.payload;
      })
      .addCase(fetchSubjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors du chargement des matières";
      })

      // fetchSubjectById
      .addCase(fetchSubjectById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubjectById.fulfilled, (state, action: PayloadAction<Subject>) => {
        state.loading = false;
        state.currentSubject = action.payload;
      })
      .addCase(fetchSubjectById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Matière non trouvée";
      })

      // createSubject
      .addCase(createSubject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSubject.fulfilled, (state, action: PayloadAction<Subject>) => {
        state.loading = false;
        state.subjects.unshift(action.payload);
      })
      .addCase(createSubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors de la création";
      })

      // updateSubject
      .addCase(updateSubject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSubject.fulfilled, (state, action: PayloadAction<Subject>) => {
        state.loading = false;
        const index = state.subjects.findIndex((s) => s.id === action.payload.id);
        if (index !== -1) state.subjects[index] = action.payload;
        if (state.currentSubject?.id === action.payload.id) state.currentSubject = action.payload;
      })
      .addCase(updateSubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors de la mise à jour";
      })

      // deleteSubject
      .addCase(deleteSubject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSubject.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.subjects = state.subjects.filter((s) => s.id !== action.payload);
        if (state.currentSubject?.id === action.payload) state.currentSubject = null;
      })
      .addCase(deleteSubject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors de la suppression";
      });
  },
});


export const { clearCurrentSubject, clearError } = subjectSlice.actions;
export default subjectSlice.reducer;
