import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getProducts: (state) => {
      state.products = ["prod1", "prod2"];
    },
    deleteProduct: (state) => {
      console.log("product deleted");
    },
  },
});

export const { getProducts, deleteProduct } = productSlice.actions;

export default productSlice.reducer;