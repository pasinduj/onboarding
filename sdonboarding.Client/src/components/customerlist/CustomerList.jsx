import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteCustomer } from "../../actions";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";

const CustomerList = () => {
  const customers = useSelector((state) => state.customers);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteCustomer(id));
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
          onClick={() => handleDelete(params.id)}
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
    </div>
  );
};

export default CustomerList;
