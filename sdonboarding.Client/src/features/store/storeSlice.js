import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stores: [],
};

const todoSlice = createSlice({
  name: "storeName",
  initialState,
  reducers: {
    addStore: (state, action) => {
      state.stores.push({ id: Date.now(), text: action.payload });
    },
    deleteStore: (state, action) => {
      state.stores = state.stores.filter((store) => store.id !== action.payload);
    },
  },
});

export const { addStore, deleteStore } = storeSlice.actions;

export default storeSlice.reducer;