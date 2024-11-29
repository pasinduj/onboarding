import { configureStore } from '@reduxjs/toolkit';
import customerReducer from './reducers/customerReducer';

const store = configureStore({
  reducer: customerReducer,
  devTools: true, // DevTools are enabled by default in development mode
}); 

//const store = createStore(customerReducer);

export default store;