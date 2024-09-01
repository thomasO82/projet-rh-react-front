import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import companyReducer from '../feature/companySlice'; 
import employeeApi from '../services/employeeApi'; 

// persist dans le local storge
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