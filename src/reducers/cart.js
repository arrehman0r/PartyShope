import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (c) => c.id === action.payload.id
      );
      if (itemIndex !== -1) {
        state.cartItems[itemIndex].quantity =
          state.cartItems[itemIndex].quantity + 1;
      } else {
        state.cartItems.push(action.payload);
      }
    },
    deleteFromCart: (state) => {
      // logic needed
    },
    updateCartItem: (state) => {
      // logic to be filled
    },
  },
});

export const { addToCart, deleteFromCart } = cartSlice.actions;

export default cartSlice.reducer;