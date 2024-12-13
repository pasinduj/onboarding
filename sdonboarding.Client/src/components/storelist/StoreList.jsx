import React, { useEffect ,useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteStore } from "../../actions";
import { setStores } from "../../actions";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import axios from "axios";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from "@mui/material/DialogTitle";

const StoreList = () => {
  const stores = useSelector((state) => state.stores);
  console.log(stores);
  const dispatch = useDispatch();

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedStoreId, setSelectedStoreId] = useState(null);
  
    // Fetch stores from the REST API on component load
  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axios.get("https://localhost:7279/api/Store",{
          headers: {
            'Access-Control-Allow-Origin': '*'
        }
        });
        console.log(response.data);
        dispatch(setStores(response.data)); 
        console.log('found records from API'+ response);
      } catch (error) {
        console.error("Failed to fetch stores:", error);
      }
    };
    fetchStores();
  }, [dispatch]);

  const handleDelete = async () => {
    if (selectedStoreId === null) return;

    try {
      await axios.delete(`https://localhost:7279/api/Store/${selectedStoreId}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      dispatch(deleteStore(selectedStoreId));
    } catch (error) {
      console.error("Failed to delete store with store id:" + selectedStoreId, error);
    } finally {
      setOpenDialog(false);
      setSelectedStoreId(null);
    }
  };

  const handleDialogOpen = (id) => {
    setSelectedStoreId(id);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedStoreId(null);
  };



  const handleEdit = (id) => {
    dispatch(editStore(id));
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

  const rows = stores.map((store) => ({
    id: store.id,
    name: store.name,
    address: store.address,
  }));

  return (
    <div style={{ height: 400, width: "100%" }}>
      <h3>Stores:</h3>
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
  );
};

export default StoreList;
