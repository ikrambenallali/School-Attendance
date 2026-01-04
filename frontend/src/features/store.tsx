import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
  
  },
});

// Types pour TS
// ReturnType<typeof store.getState> récupère le type que retourne cette fonction, donc l’état complet du store.
export type RootState = ReturnType<typeof store.getState>;
// typeof store.getState récupère le type de cette fonction.
export type AppDispatch = typeof store.dispatch;
