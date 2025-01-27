import { useRef,useEffect  } from "react";
import { useDispatch } from "react-redux";
import { addCustomerName,updateCustomerInfo } from "../../actions";
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import axios from "axios";

const CustomerName = ({ refreshCustomers , selectedCustomer }) => {
    const dispatch = useDispatch();
    const inputCNameRef = useRef(null);
    const inputCAddressRef = useRef(null);
    const inputCIdRef = useRef(null);

// Populate the input fields with the selected customer's data
useEffect(() => {
  if (selectedCustomer) {
    inputCIdRef.current.value = selectedCustomer.id;
    inputCNameRef.current.value = selectedCustomer.name;
    inputCAddressRef.current.value = selectedCustomer.address;
  }
}, [selectedCustomer]);

  
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

    const updateCustomer = async () => {
      console.log('updateCustomer button press');
      const id = inputCIdRef.current.value.trim();
      const name = inputCNameRef.current.value.trim();
      const address = inputCAddressRef.current.value.trim();

      console.log(id);
      if (name !== "") {
        try {
        

          const response = await axios.put(
            `https://onboardinginventoryapp.azurewebsites.net/api/Customer/${id}`, // URL
            { id,name, address }, // Data payload (body)
            {
              headers: {
                "Content-Type": "application/json",
              }, // Optional config (headers)
            }
          );
  
          // Assuming the response concidtains the created customer with its correct ID
          const updatedCustomer = response.data;
  
          // Dispatch the action with the created customer object
          dispatch(updateCustomerInfo(updatedCustomer));
  
          // Optionally refresh the customer list to stay in sync
          if (refreshCustomers) refreshCustomers();
  
          // Clear the input fields
          inputCIdRef.current.value = "";
          inputCNameRef.current.value = "";
          inputCAddressRef.current.value = "";
        } catch (error) {

          if (error.response) {
            console.error("Error response:", error.response.data);
          } else {
            console.error("Failed to update customer with id :" + id, error);
          }


         
        }
      }



    }


    

    return (
      <div >
        <div className="add-customer">

        <input
            type="text"
            placeholder="Customer Id"
            ref={inputCIdRef}
            className="customerInput"
          />


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
          <Button variant="contained" onClick={updateCustomer} >Update Customer </Button>
        </div>
      </div>
    );
  };
  
  export default CustomerName;