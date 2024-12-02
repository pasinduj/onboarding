import { useRef } from "react";
import { useDispatch } from "react-redux";
import { addProductName } from "../../actions";
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';

const ProductName = () => {
    const dispatch = useDispatch();
    const inputPNameRef = useRef(null);
    const inputPPriceRef = useRef(null);
  
    function addNewProduct() {
      const name = inputPNameRef.current.value.trim();
      const price = inputPPriceRef.current.value.trim();
      if (name !== "") {
        dispatch(addProductName(name,price));
        inputPNameRef.current.value = "";
        inputPPriceRef.current.value = "";
      }
    }
  
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