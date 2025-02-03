import React, { useEffect ,useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteProduct } from "../../actions";
import { setProducts } from "../../actions";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import axios from "axios";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from "@mui/material/DialogTitle";
import ProductName from "./../product/ProductName";
import './ProductList.css';


const ProductList = () => {
  const products = useSelector((state) => state.products);
  console.log(products);
  const dispatch = useDispatch();

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);


  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://onboardinginventryapp.azurewebsites.net/api/Product",{
          headers: {
            'Access-Control-Allow-Origin': '*'
        }
        }

      );
      console.log(response);
      dispatch(setProducts(response.data)); 
      console.log('found records from API'+ response);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };
  
    // Fetch products from the REST API on component load
  useEffect(() => {   

    fetchProducts();
  }, [dispatch]);

  const handleDelete = async () => {
    if (selectedProductId === null) return;

    try {
      await axios.delete(`https://onboardinginventryapp.azurewebsites.net/api/Product/${selectedProductId}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      dispatch(deleteProduct(selectedProductId));
    } catch (error) {
      console.error("Failed to delete product with product id:" + selectedProductId, error);
    } finally {
      setOpenDialog(false);
      setSelectedProductId(null);

    }
  };

  const handleDialogOpen = (id) => {
    setSelectedProductId(id);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedProductId(null);
  };


  const handleEdit = (id) => {
    console.log('Edit button press');
    console.log(id);
    setSelectedProductId(id);
    const product = products.find((product) => product.id === id);
    setSelectedProduct(product);
  };

  const columns = [
    {field:"id",headerName:"Id",flex: 1},
    { field: "name", headerName: "Name", flex: 1 },
    { field: "price", headerName: "Price", flex: 1 },
    {
      field: "edit",
      headerName: "",
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleEdit(params.id)}
        >
          Edit
        </Button>
      ),
      flex: 0.5,
    },
    {
      field: "delete",
      headerName: "",
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleDialogOpen(params.id) }
        >
          Delete
        </Button>

      ),
      flex: 0.8,
    },
  ];


  const rows = products.map((product) => ({
    id: product.id,
    name: product.name,
    price: product.price,
  }));

  return (
    <div>


<ProductName refreshProducts={fetchProducts} selectedProduct={selectedProduct} />
    <div className="productlist">
      <h3>Products:</h3>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        pageSizeOptions={[5, 10, 25, { value: -1, label: 'All' }]}
        disableSelectionOnClick
      />

<Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle> Deletion Store</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this ? 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>



      </div>

    </div>
  );
};

export default ProductList;
