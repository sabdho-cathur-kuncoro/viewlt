import {configureStore} from '@reduxjs/toolkit';
import reducer from './reducer';

const store = configureStore({reducer});

export default store;

export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
