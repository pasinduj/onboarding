import { combineReducers } from "redux";
import customerReducer from "./customerReducer";
import productReducer from "./productReducer";


const rootReducer = combineReducers({
  customers: customerReducer
  
});

export default rootReducer;