export const addCustomerName = (customer) => {
    return {
      type: "ADD_CUSTOMER",
      payload: {
        id: customer.id,
        name: customer.name,
        address: customer.address,
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


  export const addProductName = (product) => {
    return {
      type: "ADD_PRODUCT",
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
      },
    };
  };
  
  export const deleteProduct = (id) => {
    return {
      type: "DELETE_PRODUCT",
      payload: id,
    };
  };

  export const setProducts = (products) => ({
    type: "SET_PRODUCTS",
    payload: products,
  });


  export const addStoreName = (store) => {
    return {
      type: "ADD_STORE",
      payload: {
        id: store.id,
        name: store.name,
        address: store.address,
      },
    };
  };
  
  export const deleteStore = (id) => {
    return {
      type: "DELETE_STORE",
      payload: id,
    };
  };

  export const setStores = (stores) => ({
    type: "SET_STORES",
    payload: stores,
  });


  export const addSaleName = (customer,product,store) => {
    return {
      type: "ADD_SALE",
      payload: {
        id: new Date().getTime(),
        customer: customer,
        product: product,
        store:store
      },
    };
  };
  
  export const deleteSale = (id) => {
    return {
      type: "DELETE_SALE",
      payload: id,
    };
  };

  export const setSales = (sales) => ({
    type: "SET_SALES",
    payload: sales,
  });
 