const initialState = {
    tables: [],
    error: null,
  };
  
  const tableReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_TABLES_SUCCESS':
        return {
          ...state,
          tables: action.payload,
          error: null,
        };
      case 'FETCH_TABLES_FAILURE':
        return {
          ...state,
          tables: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default tableReducer;
  