import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteSale } from "../../actions";
import { setSales } from "../../actions";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import axios from "axios";



const SaleList = () => {
  const sales = useSelector((state) => state.sales);
  console.log(sales);
  const dispatch = useDispatch();
  
    // Fetch products from the REST API on component load
  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await axios.get("https://onboardinginventoryapp.azurewebsites.net/api/Sales",{
            headers: {
              'Access-Control-Allow-Origin': '*'
          }
          }

        );
        console.log(response);
        dispatch(setSales(response.data)); 
        console.log('found records from API'+ response);
      } catch (error) {
        console.error("Failed to fetch sales:", error);
      }
    };

    fetchSales();
  }, [dispatch]);

  const handleDelete = (id) => {

    const saleId = id; 
    try{
      const response = axios.delete('https://onboardinginventoryapp.azurewebsites.net/api/Sales/' + saleId ,

        {
          headers: {
            'Access-Control-Allow-Origin': '*'
        }
        }

      )
    }catch(error){
        console.error("Failed to delete sale with sale id:"+saleId , error);
      } 

    dispatch(deleteSale(id));
  };

  const handleEdit = (id) => {
    dispatch(editSale(id));
  };

  const columns = [
    { field: "customerId", headerName: "customer", flex: 1 },
    { field: "productId", headerName: "product", flex: 0.8 },
    { field: "storeId", headerName: "Store", flex: 0.5 },
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
      flex: 0.8,
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


  const rows =(sales|| []) .map((sale) => (
      {    
    id: sale.id,
    customerId:sale.customerId,
    productId: sale.productId,
    storeId: sale.storeId
  })
);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <h3>Sales:</h3>
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

export default SaleList;
