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

const CustomerList = () => {
  const customers = useSelector((state) => state.customers);
  console.log(customers);
  const dispatch = useDispatch();

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  
    // Fetch customers from the REST API on component load
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("https://localhost:7279/api/Customer",{
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
      await axios.delete(`https://localhost:7279/api/Customer/${selectedCustomerId}`, {
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

  const handleDialogOpen = (id) => {
    setSelectedCustomerId(id);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedCustomerId(null);
  };



  const handleEdit = (id) => {  

   
    dispatch(editCustomer(id));
  };

  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "address", headerName: "Address", flex: 1 },
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

  const rows = customers.map((customer) => ({
    id: customer.id,
    name: customer.name,
    address: customer.address,
  }));

  return (
    <div style={{ height: 400, width: "100%" }}>
      <h3>Customers:</h3>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        pageSizeOptions={[5, 10, 25, { value: -1, label: 'All' }]}
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
  );
};

export default CustomerList;
