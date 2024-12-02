
const initialState = {
    customers: [],
    products:[]
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

      case "SET_PRODUCT":
        return {
        ...state,
        products: action.payload,
      };
    
      default:
        return state;
    }
  };
  
  export default customerReducer;