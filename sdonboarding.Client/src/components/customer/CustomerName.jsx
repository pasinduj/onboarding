import { useRef,useEffect,useState   } from "react";
import { useDispatch } from "react-redux";
import { addCustomerName,updateCustomerInfo } from "../../actions";
import { Button } from "@mui/material";
import axios from "axios";

const CustomerName = ({ refreshCustomers , selectedCustomer }) => {
    const dispatch = useDispatch();
    const inputCNameRef = useRef(null);
    const inputCAddressRef = useRef(null);
    const inputCIdRef = useRef(null);
    const [isEditing, setIsEditing] = useState(false); // Track edit mode

// Populate the input fields with the selected customer's data
useEffect(() => {
  if (selectedCustomer) {
    inputCIdRef.current.value = selectedCustomer.id;
    inputCNameRef.current.value = selectedCustomer.name;
    inputCAddressRef.current.value = selectedCustomer.address;
    setIsEditing(true);
  }else{
    setIsEditing(false); 
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
  
          clearFields();
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
  
          clearFields();
        } catch (error) {

          if (error.response) {
            console.error("Error response:", error.response.data);
          } else {
            console.error("Failed to update customer with id :" + id, error);
          }


         
        }
      }



    }


    const clearFields = () => {
      inputCIdRef.current.value = "";
      inputCNameRef.current.value = "";
      inputCAddressRef.current.value = "";
      setIsEditing(false); // Switch back to "Add Customer" mode
    };


    

    return (
      <div >
        <div className="add-customer">

        <input
            type="text"
            placeholder="Customer Id"
            ref={inputCIdRef}
            className="customerInput"
            readOnly
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

       {!isEditing ? (
          <Button variant="contained" onClick={addNewCustomer} >Add Customer </Button>
        ) : (
          <Button variant="contained" onClick={updateCustomer} >Update Customer </Button>
        )}
        </div>
      </div>
    );
  };
  
  export default CustomerName;