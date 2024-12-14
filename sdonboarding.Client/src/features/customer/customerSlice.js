import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customers: [],
};

const todoSlice = createSlice({
  name: "customerName",
  initialState,
  reducers: {
    addCustomer: (state, action) => {
      state.customers.push({ id: Date.now(), text: action.payload });
    },
    deleteCustomer: (state, action) => {
      state.customers = state.customers.filter((customer) => customer.id !== action.payload);
    },
  },
});

export const { addCustomer, deleteCustomer } = customerSlice.actions;

export default customerSlice.reducer;