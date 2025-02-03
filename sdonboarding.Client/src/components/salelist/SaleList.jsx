import React, { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteSale } from "../../actions";
import { setSales } from "../../actions";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import axios from "axios";
import dayjs from "dayjs"; 
import "./SaleList.css";
import SaleName from "./../sale/SaleName";

const SaleList = () => {
  const sales = useSelector((state) => state.sales|| []);
  console.log(sales);
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(dayjs()); 

  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [stores, setStores] = useState([]);
  const [selectedSale, setSelectedSale] = useState(null);
  const [selectedSaleId, setSelectedSaleId] = useState(null);

  const fetchSales = async () => {
    console.log('call fetch sales');
    try {
      const response = await axios.get("https://onboardinginventryapp.azurewebsites.net/api/Sales",{
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
  
    // Fetch products from the REST API on component load
  useEffect(() => {
    
    

    const fetchCustomers = async () => {
      try {
        const response = await axios.get(
          "https://onboardinginventryapp.azurewebsites.net/api/Customer",
          {
            headers: {
              'Access-Control-Allow-Origin': '*'
          }
          }
        );
        setCustomers(response.data);
      } catch (error) {
        console.error("Failed to fetch customers:", error);
      }
    };

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

    fetchSales();
    fetchCustomers();
    fetchProducts();
    fetchStores();

    
  }, [dispatch]);

  const handleDelete = (id) => {

    const saleId = id; 
    try{
      const response = axios.delete('https://onboardinginventryapp.azurewebsites.net/api/Sales/' + saleId ,

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
    console.log('Edit button press');
    console.log(id);
    setSelectedSaleId(id);
    const sale = sales.find((sale) => sale.id === id);
    console.log(sale);
    setSelectedSale(sale);
   
  };

  // Helper function to get name by ID
  const getCustomerName = (cid) => {
    console.log(cid);
   // console.log(customers);
  //  console.log(customers.length);
    if (!customers.length) return "Loading..."; 
    const customer = customers.find((c) => c.id === cid);
 //   console.log(customer);
    return customer ? customer.name : "Unknown";
  };

  const getProductName = (pid) => {
    console.log(pid);
 //    console.log(products);
    if (!products.length) return "Loading...";
    const product = products.find((p) => p.id === pid);
    return product ? product.name : "Unknown";
  };

  const getStoreName = (sid) => {
    if (!stores.length) return "Loading...";
    const store = stores.find((s) => s.id === sid);
    return store ? store.name : "Unknown";
  };


  const columns = [
    {field: "id", headerName: "Id",flex:1},
    { field: "customerName", headerName: "customer", flex: 1.5, minWidth: 200 },
    { field: "productName", headerName: "product", flex: 1.5, minWidth: 200 },
    { field: "storeName", headerName: "Store", flex: 1.5, minWidth: 200 },
    { field: "soldDate", headerName: "SoldDate", flex: 1.5, minWidth: 200 },
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
      flex: 1.5, minWidth: 150
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
      flex: 1.5, minWidth: 150
    },
  ];


  

  const rows = sales.map((sale) => ({
    id: sale.id,
    customerName: customers.length ? getCustomerName(sale.customerId) : "Loading...",
    productName: products.length ? getProductName(sale.productId) : "Loading...",
    storeName: stores.length ? getStoreName(sale.storeId) : "Loading...",
    soldDate: selectedDate.format("YYYY-MM-DD"),
  }));


  return (

   <div>
    
    <SaleName refreshSales={fetchSales} selectedSale={selectedSale} />
    <div style={{ height: "80vh", width: "100%", minHeight: "500px" }}>
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
    </div>
  );
};

export default SaleList;
