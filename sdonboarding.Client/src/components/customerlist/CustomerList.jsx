import React, { useEffect ,useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteCustomer } from "../../actions";
import { setCustomers } from "../../actions";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import axios from "axios";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from "@mui/material/DialogTitle";
import CustomerName from "./../customer/CustomerName";
import './CustomerList.css';


const CustomerList = () => {
  const customers = useSelector((state) => state.customers);
  console.log(customers);
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [successMessage, setSuccessMessage] = useState(""); 
  
    // Fetch customers from the REST API on component load
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("https://onboardinginventoryapp.azurewebsites.net/api/Customer",{
          headers: {
            'Access-Control-Allow-Origin': '*'
        }
        });
        console.log(response.data);
        dispatch(setCustomers(response.data)); 
        console.log('found records from API'+ response);
      } catch (error) {
        console.error("Failed to fetch customers:", error);
      }
    };

    fetchCustomers();
  }, [dispatch]);

  const handleDelete = async () => {
    if (selectedCustomerId === null) return;

    try {
      await axios.delete(`https://onboardinginventoryapp.azurewebsites.net/api/Customer/${selectedCustomerId}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      dispatch(deleteCustomer(selectedCustomerId));
    } catch (error) {
      console.error("Failed to delete customer with customer id:" + selectedCustomerId, error);
    } finally {
      setOpenDialog(false);
      setSelectedCustomerId(null);
    }
  };

  const handleEdit = (id) => {
    setErrorMessage("");
    setSuccessMessage("");
    setSelectedCustomerId(id);
    const customer = customers.find((customer) => customer.id === id);
    setSelectedCustomer(customer);
  };

  const handleDialogOpen = (id) => {
    setSelectedCustomerId(id);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedCustomerId(null);
  };



  

  const columns = [
    {field: "id", headerName: "Id",flex:1},
    { field: "name", headerName: "Name", flex: 1 },
    { field: "address", headerName: "Address", flex: 2 },
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
      flex:1,
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
      flex: 1,
    },
  ];

  const rows = customers.map((customer) => ({
    id: customer.id,
    name: customer.name,
    address: customer.address,
  }));

  return (
    <div>

   <CustomerName refreshCustomers={() => {}} selectedCustomer={selectedCustomer} />
    <div className="customerlist" >
      <h3>Customers:</h3>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}       
        disableSelectionOnClick
      />

<Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this customer? 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>


    </div>
    </div>
  );
};

export default CustomerList;
