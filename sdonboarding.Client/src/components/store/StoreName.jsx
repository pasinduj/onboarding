import { useRef } from "react";
import { useDispatch } from "react-redux";
import { addStoreName } from "../../actions";
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import axios from "axios";

const StoreName = ({ refreshStores }) => {
    const dispatch = useDispatch();
    const inputSNameRef = useRef(null);
    const inputSAddressRef = useRef(null);


    const addNewStore = async () => {
      const name = inputSNameRef.current.value.trim();
      const address = inputSAddressRef.current.value.trim();
      if (name !== "") {
        try {
          const response = await axios.post(
            "https://onboardinginventoryapp.azurewebsites.net/api/Store",
            { name, address }
          );
  
          // Assuming the response contains the created store with its correct ID
          const createdStore = response.data;
  
          // Dispatch the action with the created store object
          dispatch(addStoreName(createdStore));
  
          // Optionally refresh the store list to stay in sync
          if (refreshStores) refreshStores();
  
          // Clear the input fields
          inputSNameRef.current.value = "";
          inputSAddressRef.current.value = "";
        } catch (error) {
          console.error("Failed to save new store:", error);
        }
      }
    };
  
    
  
    return (
      <div >
        <div className="add-store">
          <input
            type="text"
            placeholder="Store Name"
            ref={inputSNameRef}
            className="storeInput"
          />
  
<input
            type="text"
            placeholder="Store Address "
            ref={inputSAddressRef}
            className="storeInput"
          />


          <Button variant="contained" onClick={addNewStore} >Add Store </Button>
        </div>
      </div>
    );
  };
  
  export default StoreName;