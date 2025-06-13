// store.js
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    flights: true,
  },
});

export default store;
