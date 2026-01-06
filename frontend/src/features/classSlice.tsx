import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// PayloadAction => C’est le type de l’objet action que Redux envoie au reducer.
// import api from "api";
import {api} from "../api/api.ts"

// Type pour une classe
export interface Class {
  id: number;
  name: string;
  level: string;
  academicYear: string;
  createdAt: string;
}

// Types pour créer et mettre à jour
export interface CreateClassDTO {
  name: string;
  level: string;
  academicYear: string;
}

export interface UpdateClassDTO {
  name?: string;
  level?: string;
  academicYear?: string;
}

// State du slice
interface ClassState {
    classes: Class[];
    currentClass: Class | null;
    loading: boolean;
    error: string | null;
}

const initialState: ClassState = {
  classes: [],
  currentClass: null,
  loading: false,
  error: null,
};

// Thunks async
export const fetchClasses = createAsyncThunk("class/fetchAll", async () => {
  const response = await api.get<Class[]>("/classes");
  console.log(response);
  
  return response.data;
});

export const fetchClassById = createAsyncThunk(
  "class/fetchOne",
  async (id: number) => {
    const response = await api.get<Class>(`/classes/${id}`);
    return response.data;
  }
);

export const createClass = createAsyncThunk(
  "class/create",
  async (data: CreateClassDTO) => {
    const response = await api.post<Class>("/classes", data);
    return response.data;
  }
);

export const updateClass = createAsyncThunk(
  "class/update",
  async ({ id, data }: { id: number; data: UpdateClassDTO }) => {
    const response = await api.put<Class>(`/classes/${id}`, data);
    return response.data;
  }
);

export const deleteClass = createAsyncThunk(
  "class/delete",
  async (id: number) => {
    await api.delete(`/classes/${id}`);
    return id; 
  }
);

// Slice
const classSlice = createSlice({
  name: "class",
  initialState,
  reducers: {
    clearCurrentClass(state) {
      state.currentClass = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchClasses
      .addCase(fetchClasses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClasses.fulfilled, (state, action: PayloadAction<Class[]>) => {
        state.loading = false;
        state.classes = action.payload;
      })
      .addCase(fetchClasses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors du chargement des classes";
      })

      // fetchClassById
      .addCase(fetchClassById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClassById.fulfilled, (state, action: PayloadAction<Class>) => {
        state.loading = false;
        state.currentClass = action.payload;
      })
      .addCase(fetchClassById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Classe non trouvée";
      })

      // createClass
      .addCase(createClass.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createClass.fulfilled, (state, action: PayloadAction<Class>) => {
        state.loading = false;
        state.classes.unshift(action.payload); // ajouter en début
      })
      .addCase(createClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors de la création";
      })

      // updateClass
      .addCase(updateClass.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateClass.fulfilled, (state, action: PayloadAction<Class>) => {
        state.loading = false;
        const index = state.classes.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) state.classes[index] = action.payload;
        if (state.currentClass?.id === action.payload.id) state.currentClass = action.payload;
      })
      .addCase(updateClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors de la mise à jour";
      })

      // deleteClass
      .addCase(deleteClass.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteClass.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.classes = state.classes.filter((c) => c.id !== action.payload);
        if (state.currentClass?.id === action.payload) state.currentClass = null;
      })
      .addCase(deleteClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erreur lors de la suppression";
      });
  },
});

export const { clearCurrentClass, clearError } = classSlice.actions;
export default classSlice.reducer;
