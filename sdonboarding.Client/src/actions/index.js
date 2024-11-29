export const addCustomerName = (name,address) => {
    return {
      type: "ADD_CUSTOMER",
      payload: {
        id: new Date().getTime(),
        name: name,
        address: address,
      },
    };
  };
  
  export const deleteCustomer = (id) => {
    return {
      type: "DELETE_CUSTOMER",
      payload: id,
    };
  };

  export const editCustomer = (id) => {
    return {
      type: "EDIT_CUSTOMER",
      payload: id,
    };
  };