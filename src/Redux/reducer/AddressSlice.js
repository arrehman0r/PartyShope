// src/store/slices/shippingAddressSlice.js
import { createSlice } from "@reduxjs/toolkit";

const shippingAddressSlice = createSlice({
  name: "shippingAddress",
  initialState: {
    fullname: "",
    mobile: "",
    address: "",
    area: "",
    city: "",
  },
  reducers: {
    setAddress: (state, action) => {
      // action.payload should contain the new address details
      return { ...state, ...action.payload };
    },
    clearAddress: (state) => {
      // Reset the address fields
      return {
        fullname: "",
        mobile: "",
        address: "",
        area: "",
        city: "",
      };
    },
  },
});

export const { setAddress, clearAddress } = shippingAddressSlice.actions;
export default shippingAddressSlice.reducer;
