import { useRef } from "react";
import { useDispatch } from "react-redux";
import { addCustomerName } from "../../actions";
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import axios from "axios";

const CustomerName = () => {
    const dispatch = useDispatch();
    const inputCNameRef = useRef(null);
    const inputCAddressRef = useRef(null);
  
    function addNewCustomer() {
      const name = inputCNameRef.current.value.trim();
      const address = inputCAddressRef.current.value.trim();
      if (name !== "") {

        try{
          const response = axios.post('https://onboardinginventoryapp.azurewebsites.net/api/Customer', {          
            name: name,
          address: address
        })
      }catch(error){
        console.error("Failed to save new customers:", error);
      }   


        dispatch(addCustomerName(name,address));
        inputCNameRef.current.value = "";
        inputCAddressRef.current.value = "";
      }
    }
  
    return (
      <div >
        <div className="add-customer">
          <input
            type="text"
            placeholder="Customer Name"
            ref={inputCNameRef}
            className="customerInput"
          />
  
<input
            type="text"
            placeholder="Customer Address "
            ref={inputCAddressRef}
            className="customerInput"
          />


          <Button variant="contained" onClick={addNewCustomer} >Add Customer </Button>
        </div>
      </div>
    );
  };
  
  export default CustomerName;