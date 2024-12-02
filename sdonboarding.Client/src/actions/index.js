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

  export const setCustomers = (customers) => ({
    type: "SET_CUSTOMERS",
    payload: customers,
  });


  export const addProductName = (name,price) => {
    return {
      type: "ADD_PRODUCT",
      payload: {
        id: new Date().getTime(),
        name: name,
        price: price,
      },
    };
  };
  
  export const deleteProduct = (id) => {
    return {
      type: "DELETE_PRODUCT",
      payload: id,
    };
  };