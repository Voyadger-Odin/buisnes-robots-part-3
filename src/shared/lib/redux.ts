/* eslint-disable @typescript-eslint/no-explicit-any */

import { combineReducers, configureStore, Slice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

const appReducer = combineReducers({
  app: (store = {}) => store,
});

export const store = configureStore({
  reducer: (state, action) => appReducer(state, action),
});

const slicesSet = new Set<Slice>();

export const registerSlice = (slices: Slice[]) => {
  slices.forEach((slice) => {
    slicesSet.add(slice);
  });

  store.replaceReducer(
    combineReducers({
      ...Array.from(slicesSet).reduce(
        (acc, slice) => {
          acc[slice.name] = slice.reducer;
          return acc;
        },
        {} as Record<string, any>,
      ),
    }),
  );
};

export const createBaseSelector = <S, N extends string>(
  slice: Slice<S, any, N>,
) => {
  return (store: unknown) => {
    const anyStore = store as Record<string, unknown>;
    return anyStore[slice.name] as S;
  };
};

export const useAppDispatch = (): AppDispatch => {
  return useDispatch();
};

export const useAppSelector = useSelector;

// Тип хранилища
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
