import { useRef } from "react";
import { useDispatch } from "react-redux";
import { addCustomerName } from "../../actions";
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import axios from "axios";

const CustomerName = ({ refreshCustomers }) => {
    const dispatch = useDispatch();
    const inputCNameRef = useRef(null);
    const inputCAddressRef = useRef(null);
  
    const addNewCustomer = async () => {
      const name = inputCNameRef.current.value.trim();
      const address = inputCAddressRef.current.value.trim();
      if (name !== "") {
        try {
          const response = await axios.post(
            "https://onboardinginventoryapp.azurewebsites.net/api/Customer",
            { name, address }
          );
  
          // Assuming the response contains the created customer with its correct ID
          const createdCustomer = response.data;
  
          // Dispatch the action with the created customer object
          dispatch(addCustomerName(createdCustomer));
  
          // Optionally refresh the customer list to stay in sync
          if (refreshCustomers) refreshCustomers();
  
          // Clear the input fields
          inputCNameRef.current.value = "";
          inputCAddressRef.current.value = "";
        } catch (error) {
          console.error("Failed to save new customer:", error);
        }
      }
    };

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