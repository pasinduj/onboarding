
const initialState = {
    customers: [],
    products:[],
    stores:[]
  };
  
  const customerReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_CUSTOMER':
        return {
          ...state,
          customers: [...state.customers, action.payload]
        };
      case 'DELETE_CUSTOMER':
        return {
          ...state,
          customers: state.customers.filter(customer => customer.id !== action.payload)
        };

      case "SET_CUSTOMERS":
        return {
        ...state,
        customers: action.payload,
      };

      case 'ADD_PRODUCT':
        return {
          ...state,
          products: [...state.products, action.payload]
        };
      case 'DELETE_PRODUCT':
        return {
          ...state,
          products: state.products.filter(product => product.id !== action.payload)
        };

      case "SET_PRODUCTS":
        return {
        ...state,
        products: action.payload,
      };
    
      case 'ADD_STORE':
        return {
          ...state,
          stores: [...state.stores, action.payload]
        };
      case 'DELETE_STORE':
        return {
          ...state,
          stores: state.stores.filter(store => store.id !== action.payload)
        };

      case "SET_STORES":
        return {
        ...state,
        stores: action.payload,
      };


      case 'ADD_SALE':
        return {
          ...state,
          sales: [...state.sales, action.payload]
        };
      case 'DELETE_SALE':
        return {
          ...state,
          sales: state.sales.filter(sale => sale.id !== action.payload)
        };

      case "SET_SALES":
        return {
        ...state,
        sales: action.payload,
      };


      default:
        return state;
    }
  };
  
  export default customerReducer;