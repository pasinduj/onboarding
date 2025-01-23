import { useRef } from "react";
import { useDispatch } from "react-redux";
import { addProductName } from "../../actions";
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import axios from "axios";

const ProductName = ( refreshProducts ) => {
    const dispatch = useDispatch();
    const inputPNameRef = useRef(null);
    const inputPPriceRef = useRef(null);


    const addNewProduct = async () => {
      const name = inputPNameRef.current.value.trim();
      const price = inputPPriceRef.current.value.trim();
      if (name !== "") {
        try {
          const response = await axios.post(
            "https://onboardinginventoryapp.azurewebsites.net/api/Product",
            { name, price }
          );
  
          // Assuming the response contains the created product with its correct ID
          const createdProduct = response.data;
  
          // Dispatch the action with the created product object
          dispatch(addProductName(createdProduct));
  
          // Optionally refresh the product list to stay in sync
          if (refreshProducts) refreshProducts();
  
          // Clear the input fields
          inputPNameRef.current.value = "";
          inputPPriceRef.current.value = "";
        } catch (error) {
          console.error("Failed to save new product:", error);
        }
      }
    };

  
    
  
    return (
      <div >
        <div className="add-product">
          <input
            type="text"
            placeholder="Product Name"
            ref={inputPNameRef}
            className="productInput"
          />
  
<input
            type="text"
            placeholder="Product Price "
            ref={inputPPriceRef}
            className="productInput"
          />


          <Button variant="contained" onClick={addNewProduct} >Add Product </Button>
        </div>
      </div>
    );
  };
  
  export default ProductName;