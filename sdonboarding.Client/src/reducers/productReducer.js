
const initialState = {
    products: [],
    customer: []
  };
  
  const productReducer = (state = initialState, action) => {
    switch (action.type) {
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
  
  export default productReducer;