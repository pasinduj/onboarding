import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteProduct } from "../../actions";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import axios from "axios";

const ProductList = () => {
  const products = useSelector((state) => state.products);
  console.log(products);
  const dispatch = useDispatch();
  
    // Fetch products from the REST API on component load
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://localhost:7279/api/Product");
        dispatch(setProducts(response.data)); 
        console.log('found records from API'+ response);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  const handleEdit = (id) => {
    dispatch(editProduct(id));
  };

  const columns = [
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
          onClick={() => handleDelete(params.id)}
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
    <div style={{ height: 400, width: "100%" }}>
      <h3>Products:</h3>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        pageSizeOptions={[5, 10, 25, { value: -1, label: 'All' }]}
        disableSelectionOnClick
      />
    </div>
  );
};

export default ProductList;
