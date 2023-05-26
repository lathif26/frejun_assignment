

import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import rootReducer from "./src/redux/reducers";
import NavigationContainers from "./src/components/NavigationContainers";



const store = createStore(rootReducer, applyMiddleware(thunk));

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainers />
    </Provider>
  );
};

export default App;
