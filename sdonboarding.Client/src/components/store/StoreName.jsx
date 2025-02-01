import { useRef,useEffect } from "react";
import { useDispatch } from "react-redux";
import { addStoreName,updateStoreInfo } from "../../actions";
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import axios from "axios";

const StoreName = ({ refreshStores,selectedStore }) => {
    const dispatch = useDispatch();
    const inputSNameRef = useRef(null);
    const inputSAddressRef = useRef(null);
    const inputSIdRef = useRef(null);

      // Populate the input fields with the selected store's data
useEffect(() => {
  if (selectedStore) {
    inputSIdRef.current.value = selectedStore.id;
    inputSNameRef.current.value = selectedStore.name;
    inputSAddressRef.current.value = selectedStore.address;
  }
}, [selectedStore]);

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
  


    const updateStore = async () => {
      console.log('updateStore button press');
      const id = inputSIdRef.current.value.trim();
      const name = inputSNameRef.current.value.trim();
      const address = inputSAddressRef.current.value.trim();

      console.log({ id, name, address });
  
      console.log(id);
      console.log(address);
      if (name !== "") {
        try {


          const response = await axios.put(
            `https://onboardinginventoryapp.azurewebsites.net/api/Store/${id}`, // URL
            { id,name, address }, // Data payload (body)
            {
              headers: {
                "Content-Type": "application/json",
              }, // Optional config (headers)
            }
          );


        
  
          // Assuming the response concidtains the created store with its correct ID
          const updatedStore = response.data;
  
          // Dispatch the action with the created store object
          dispatch(updateStoreInfo(updatedStore));
  
          // Optionally refresh the product list to stay in sync
          if (refreshStores) refreshStores();
  
          // Clear the input fields
          inputSNameRef.current.value = "";
          inputSAddressRef.current.value = "";
          inputSIdRef.current.value = "";
        } catch (error) {

          if (error.response) {
            console.error("Error response:", error.response.data);
          } else {
            console.error("Failed to update store with id :" + id, error);
          }
         
        }
      }



    }
    
  
    return (
      <div >
        <div className="add-store">


        <input
            type="text"
            placeholder="Store Id"
            ref={inputSIdRef}
            className="storeInput"
            readOnly
          />

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
          <Button variant="contained" onClick={updateStore} >Update Store </Button>
        </div>
      </div>
    );
  };
  
  export default StoreName;