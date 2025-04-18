// Redux/ProductSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Fetch Products (Thunk)
export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await fetch("https://dummyjson.com/products");
  const data = await response.json();
  return data.products;
});

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    status: "idle",
    error: null,
  },
  reducers: {
    // Add product locally (no async thunk)
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },

    // Update product
    updateProduct: (state, action) => {
      const index = state.products.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },

    // Delete product
    deleteProduct: (state, action) => {
      state.products = state.products.filter(p => p.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addProduct, updateProduct, deleteProduct } = productSlice.actions;

export default productSlice.reducer;
