import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sales: [],
};

const todoSlice = createSlice({
  name: "saleName",
  initialState,
  reducers: {
    addSale: (state, action) => {
      state.sales.push({ id: Date.now(), text: action.payload });
    },
    deleteSale: (state, action) => {
      state.sales = state.sales.filter((sale) => sale.id !== action.payload);
    },
  },
});

export const { addSale, deleteSale} = saleSlice.actions;

export default saleSlice.reducer;