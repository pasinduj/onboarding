import { useRef } from "react";
import { useDispatch } from "react-redux";
import { addStoreName } from "../../actions";
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import axios from "axios";

const StoreName = () => {
    const dispatch = useDispatch();
    const inputSNameRef = useRef(null);
    const inputSAddressRef = useRef(null);
  
    function addNewStore() {
      const name = inputSNameRef.current.value.trim();
      const address = inputSAddressRef.current.value.trim();
      if (name !== "") {

        try{
          const response = axios.post('https://onboardinginventoryapp.azurewebsites.net/api/Store', {          
            name: name,
          address: address
        })
      }catch(error){
        console.error("Failed to save new Store:", error);
      }   


        dispatch(addStoreName(name,address));
        inputSNameRef.current.value = "";
        inputSAddressRef.current.value = "";
      }
    }
  
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