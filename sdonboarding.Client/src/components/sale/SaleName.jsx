import React, { useState, useEffect,useRef } from "react";
import { useDispatch } from "react-redux";
import { addSaleName,updateSaleInfo } from "../../actions";
import { Button, TextField, InputLabel, Select, MenuItem } from "@mui/material";
import axios from "axios";
import "./SaleName.css";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"; 
import dayjs from "dayjs"; 

const SaleName = ({ refreshSales ,selectedSale }) => {
  const dispatch = useDispatch();

  const [saleId, setSaleId] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [customers, setCustomers] = useState([]);

  const [productId, setProductId] = useState("");
  const [products, setProducts] = useState([]);

  const [storeId, setStoreId] = useState("");
  const [stores, setStores] = useState([]);
  const [csoldDate, setcsoldDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(dayjs()); 
  const inputSIdRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false); // Track edit mode
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); 

  useEffect(() => {
    if (selectedSale) {
      inputSIdRef.current.value = selectedSale.id;
      setSaleId(selectedSale.id || "");
      setCustomerId(selectedSale.customerId || "");
      setProductId(selectedSale.productId || "");
      setStoreId(selectedSale.storeId || "");
      setSelectedDate(dayjs(selectedSale.soldDate) || dayjs());
      setIsEditing(true);
    }else{
      setIsEditing(false);
    }
  }, [selectedSale]);

  // Fetch customer names from API
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(
          "https://onboardinginventryapp.azurewebsites.net/api/Customer"
        );
        setCustomers(response.data);
      } catch (error) {
        console.error("Failed to fetch customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://onboardinginventryapp.azurewebsites.net/api/Product"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  const fetchStores = async () => {
    try {
      const response = await axios.get(
        "https://onboardinginventryapp.azurewebsites.net/api/Store"
      );
      setStores(response.data);
    } catch (error) {
      console.error("Failed to fetch stores:", error);
    }
  };

  useEffect(() => {    

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

  const addNewSale = async () => {
  //  console.log(saleId);

  if (customerId === "" || customerId === "" || storeId === "" ) {
    setErrorMessage("Product , Customer and Store  cannot be empty!");
    return;
  }

    if (customerId !== "") {
      try {
        await axios.post(
          "https://onboardinginventryapp.azurewebsites.net/api/Sales",
          {
            customerId: customerId,
            productId: productId,
            storeId: storeId,
            dateSold: selectedDate.toISOString(), 
          }
        );

        dispatch(addSaleName(customerId, productId, storeId));


        if (refreshSales) refreshSales(); 

        clearFields();
        setErrorMessage("");
        setSuccessMessage("Successfully Added");
   
      } catch (error) {
        console.error("Failed to save new Sale:", error);
      }
    }
  };


  const updateNewSale = async () => {
  

    if (saleId !== "") {
      var id = saleId;
     

      const response = await axios.put(
        `https://onboardinginventryapp.azurewebsites.net/api/Sales/${saleId}`, // URL
        { id,customerId, productId,storeId }, // Data payload (body)
        {
          headers: {
            "Content-Type": "application/json",
          }, // Optional config (headers)
        }
      );

      // Assuming the response concidtains the created customer with its correct ID
      const updatedSale = response.data;

      // Dispatch the action with the created customer object
      dispatch(updateSaleInfo(updatedSale));

      // Optionally refresh the customer list to stay in sync
      if (refreshSales) refreshSales();

      // Clear the input fields
     // inputCIdRef.current.value = "";
     // inputCNameRef.current.value = "";
     // inputCAddressRef.current.value = "";

     clearFields();
     id="";
     setErrorMessage("");
     setSuccessMessage("Successfully Updated"); 


    }
  };


  const clearFields = () => {
    // Reset inputs
    setSaleId("");
    inputSIdRef.current.value = "";
    setCustomerId("");
    setProductId("");
    setStoreId("");
    setSelectedDate(dayjs()); // ✅ Reset date
    setIsEditing(false); // Switch back to "Add Product" mode
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}> 
      <div style= {{ height: 400, width: "100%" }}>
        <div className="add-sale">

        <div className="flex-container">

        <InputLabel id="sale-select-label">Sale Id</InputLabel>
        <input
            type="text"
            placeholder="Sale Id"
            ref={inputSIdRef}
            className="saleInput"
            readOnly
          />

          </div>

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

          <div className="solddate">
            
            <DatePicker
              label="Sold Date"
              value={selectedDate} 
              onChange={(newValue) => setSelectedDate(newValue)}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>

          <div>
            </div>

            <div id="errorNumber1" className="errormsg">
          {errorMessage}
        </div>

        <div id="success" className="successmsg">
          {successMessage}
        </div>

            {!isEditing ? (
          <Button variant="contained" onClick={addNewSale}>
            Add Sale
          </Button>
            ) : (
          <Button variant="contained" onClick={updateNewSale}>
            Update Sale
          </Button>
           )}
        </div>
      </div>
    </LocalizationProvider> // ✅ Closing tag for LocalizationProvider
  );
};

export default SaleName;
