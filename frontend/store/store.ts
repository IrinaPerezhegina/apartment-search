/* eslint-disable import/no-cycle */
/* eslint-disable import/no-extraneous-dependencies */

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import FlatsSlice from '../slices/FlatsSlice';

const rootReducer = combineReducers({
  flats: FlatsSlice,
});

export const store = () => configureStore({
  reducer: rootReducer,
});

export const wrapper = createWrapper(configureStore as any);
export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = AppStore['dispatch'];
