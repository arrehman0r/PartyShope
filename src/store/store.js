import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../reducers/product.js";
import cartReducer from "../reducers/cart.js";

const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer
  }
});

export default store;
