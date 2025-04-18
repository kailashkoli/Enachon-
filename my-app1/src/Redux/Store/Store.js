// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../ProductSlice';


const Store = configureStore({
  reducer: {
    products: productReducer,

  },
});

export default Store;
