import { useRef,useEffect,useState} from "react";
import { useDispatch } from "react-redux";
import { addProductName,updateProductInfo } from "../../actions";
import { Button } from "@mui/material";
import axios from "axios";
import './ProductName.css';

const ProductName = ( {refreshProducts,selectedProduct} ) => {
    const dispatch = useDispatch();
    const inputPNameRef = useRef(null);
    const inputPPriceRef = useRef(null);
    const inputPIdRef = useRef(null);
    const [isEditing, setIsEditing] = useState(false); // Track edit mode
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState(""); 
    

    // Populate the input fields with the selected product's data
useEffect(() => {
  if (selectedProduct) {
    inputPIdRef.current.value = selectedProduct.id;
    inputPNameRef.current.value = selectedProduct.name;
    inputPPriceRef.current.value = selectedProduct.price;
    setIsEditing(true);
  }else{
    setIsEditing(false);
  }
}, [selectedProduct]);


    const addNewProduct = async () => {
      const name = inputPNameRef.current.value.trim();
      const price = inputPPriceRef.current.value.trim();

      if (name === "" || price === "") {
        setErrorMessage("Product Name and Price cannot be empty!");
        return;
      }


      if (name !== "") {
        try {
          const response = await axios.post(
            "https://onboardinginventryapp.azurewebsites.net/api/Product",
            { name, price }
          );
  
          // Assuming the response contains the created product with its correct ID
          const createdProduct = response.data;
  
          // Dispatch the action with the created product object
          dispatch(addProductName(createdProduct));
  
          // Optionally refresh the product list to stay in sync
          if (refreshProducts) refreshProducts();
  
          clearFields();
          setErrorMessage("");
          setSuccessMessage("Successfully Added");
        } catch (error) {
          console.error("Failed to save new product:", error);
        }
      }
    };

    const updateProduct = async () => {
      
      const id = inputPIdRef.current.value.trim();
      const name = inputPNameRef.current.value.trim();
      const price = inputPPriceRef.current.value.trim();

      console.log(id);
      if (name !== "") {
        try {


          const response = await axios.put(
            `https://onboardinginventryapp.azurewebsites.net/api/Product/${id}`, // URL
            { id,name, price }, // Data payload (body)
            {
              headers: {
                "Content-Type": "application/json",
              }, // Optional config (headers)
            }
          );
  
          // Assuming the response concidtains the created product with its correct ID
          const updatedProduct = response.data;
  
          // Dispatch the action with the created product object
          dispatch(updateProductInfo(updatedProduct));
  
          // Optionally refresh the product list to stay in sync
          if (refreshProducts) refreshProducts();
  
          clearFields();
          setErrorMessage("");
          setSuccessMessage("Successfully Updated");
        } catch (error) {

          if (error.response) {
            console.error("Error response:", error.response.data);
          } else {
            console.error("Failed to update product with id :" + id, error);
          }


         
        }
      }



    }


    const clearFields = () => {
      inputPIdRef.current.value = "";
      inputPNameRef.current.value = "";
      inputPPriceRef.current.value = "";
      setIsEditing(false); // Switch back to "Add Product" mode
    };
    
  
    return (
      
      <div>

         



        <div className="add-product">

        <input
            type="text"
            placeholder="Product Id"
            ref={inputPIdRef}
            className="productInput"
            readOnly
          />

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

<div id="errorNumber1" className="errormsg">
          {errorMessage}
        </div>

        <div id="success" className="successmsg">
          {successMessage}
        </div>

       {!isEditing ? (
          <Button variant="contained" onClick={addNewProduct} >Add Product </Button>
        ) : (
          <Button variant="contained" onClick={updateProduct} >Update Product </Button>
        )}
        </div>
      </div>
    );
  };
  
  export default ProductName;