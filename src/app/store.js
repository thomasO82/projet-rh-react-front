// store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import companyReducer from '../feature/companySlice'; // Assurez-vous que ce chemin est correct
import employeeApi from '../services/employeeApi'; // Assurez-vous que ce chemin est correct

// Configuration de la persistance
const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  company: companyReducer,
  [employeeApi.reducerPath]: employeeApi.reducer, 
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }).concat(employeeApi.middleware), 
});

export const persistor = persistStore(store);