import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const todoSlice = createSlice({
  name: "productName",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push({ id: Date.now(), text: action.payload });
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter((product) => product.id !== action.payload);
    },
  },
});

export const { addProduct, deleteProduct } = productSlice.actions;

export default productSlice.reducer;