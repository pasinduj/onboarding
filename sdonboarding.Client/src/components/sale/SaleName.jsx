import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { addSaleName } from "../../actions";
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import axios from "axios";
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import './SaleName.css';

const SaleName = () => {
    const dispatch = useDispatch();
    

    const [customerId, setCustomerId] = useState('');
    const [customers, setCustomers] = useState([]);

    const [productId, setProductId] = useState('');
    const [products, setProducts] = useState([]);

    const [storeId, setStoreId] = useState('');
    const [stores, setStores] = useState([]);

      // Fetch customer names from API
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("https://localhost:7279/api/Customer");
        setCustomers(response.data); // Assuming response.data is an array of customers
      } catch (error) {
        console.error("Failed to fetch customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://localhost:7279/api/Product");
        setProducts(response.data); // Assuming response.data is an array of Products
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axios.get("https://localhost:7279/api/Store");
        setStores(response.data); // Assuming response.data is an array of stores
      } catch (error) {
        console.error("Failed to fetch stores:", error);
      }
    };

    fetchStores();
  }, []);

    const handleCustomerChange = (event) => {
        setCustomerId(event.target.value);
      };

      const handleProductChange = (event) => {
        setProductId(event.target.value);
      };

      const handleStoreChange = (event) => {
        setStoreId(event.target.value);
      };
  
    function addNewSale() {
      
     // const product = inputSProductRef.current.value.trim();
     // const store = inputSStoreRef.current.value.trim();
   console.log(customerId);

      if (customerId !== "") {

        try{
            const response = axios.post('https://localhost:7279/api/Sales', {          
                customerId: customerId,
                productId: productId,
                storeId: storeId,
                dateSold: new Date()
          })

          dispatch(addSaleName(customerId,productId,storeId));
          //  inputSCustomerRef.current.value = "";
           // Reset inputs
           setCustomerId("");
           setProductId("");
           setStoreId("");
          // inputSProductRef.current.value = "";
          // inputSStoreRef.current.value = "";
    


        }catch(error){
          console.error("Failed to save new Sale:", error);
        }   


      
      }
    }
  
    return (
      <div >
        <div className="add-sale">
        <div className="flex-container">
  <InputLabel id="customer-select-label">Customer</InputLabel>
  <Select
    className="customer-dropdown"
    labelId="customer-select-label"
    id="customer-select"
    value={customerId}
    onChange={handleCustomerChange}    
  >
    <MenuItem value="">
      <em>None</em>
    </MenuItem>
    {customers.map((customer) => (
      <MenuItem key={customer.id} value={customer.id}>
        {customer.name}
      </MenuItem>
    ))}
  </Select>
</div>

        <div className="flex-container">
        <InputLabel id="product-select-label">Product</InputLabel>
        <Select
          labelId="product-select-label"
          className="product-dropdown"
          id="product-select"
          value={productId}
          onChange={handleProductChange}
         
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {products.map((product) => (
            <MenuItem key={product.id} value={product.id}>
              {product.name}
            </MenuItem>
          ))}

        </Select>
       </div>
  
        
       <div className="flex-container">
        <InputLabel id="store-select-label">Store</InputLabel>
        <Select
          labelId="store-select-label"
          id="store-select"
          value={storeId}
          onChange={handleStoreChange}
          className="store-dropdown"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {stores.map((store) => (
            <MenuItem key={store.id} value={store.id}>
              {store.name}
            </MenuItem>
          ))}

        </Select>
        </div>
 
         <div></div>

          <Button variant="contained" onClick={addNewSale} >Add Sale </Button>
        </div>
      </div>
    );
  };
  
  export default SaleName;