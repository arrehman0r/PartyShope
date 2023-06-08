import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../reducers/product.js";
import cartReducer from "../reducers/cart.js";

export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer
  },
});