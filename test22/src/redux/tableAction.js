export const fetchTables = () => {
    return async (dispatch) => {
      try {
        // Make an API request to fetch tables from the backend
        const response = await fetch('http://192.168.1.6:3000/api/tables');
        const data = await response.json();
        console.log(data);
  
        // Dispatch an action to update the tables state in Redux store
        dispatch({ type: 'FETCH_TABLES_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'FETCH_TABLES_FAILURE', payload: error.message });
      }
    };
  };
  