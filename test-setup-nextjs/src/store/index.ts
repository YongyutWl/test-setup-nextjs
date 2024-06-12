import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// // app/store.ts
// import { configureStore } from '@reduxjs/toolkit';

// const initialState = {
//   // ... your initial state
// };

// const rootReducer = (state = initialState, action) => {
//   // ... your reducers
// };

// export const store = configureStore({
//   reducer: rootReducer,
// });
