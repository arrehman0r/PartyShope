// AddressContext.js
import React, { createContext, useContext, useReducer } from "react";

const AddressContext = createContext();

const addressReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ADDRESS":
      return [...state, action.payload];
    default:
      return state;
  }
};

const AddressProvider = ({ children }) => {
  const [addresses, dispatch] = useReducer(addressReducer, []);

  const addAddress = (address) => {
    dispatch({ type: "ADD_ADDRESS", payload: address });
  };

  return (
    <AddressContext.Provider value={{ addresses, addAddress }}>
      {children}
    </AddressContext.Provider>
  );
};

const useAddressContext = () => {
  return useContext(AddressContext);
};

export { AddressProvider, useAddressContext };

// // AddressContext.js
// import React, { createContext, useContext, useReducer } from "react";

// const AddressContext = createContext();

// const addressReducer = (state, action) => {
//   switch (action.type) {
//     case "ADD_ADDRESS":
//       return [...state, action.payload];
//     case "UPDATE_ADDRESS":
//       return state.map((address) =>
//         address.id === action.payload.id ? action.payload : address
//       );
//     case "DELETE_ADDRESS":
//       return state.filter((address) => address.id !== action.payload);
//     // Add other cases as needed
//     default:
//       return state;
//   }
// };

// const AddressProvider = ({ children }) => {
//   const [addressList, dispatch] = useReducer(addressReducer, []);

//   const addAddress = (newAddress) => {
//     dispatch({ type: "ADD_ADDRESS", payload: newAddress });
//   };

//   const updateAddress = (id, updatedAddress) => {
//     dispatch({ type: "UPDATE_ADDRESS", payload: { id, ...updatedAddress } });
//   };

//   const deleteAddress = (id) => {
//     dispatch({ type: "DELETE_ADDRESS", payload: id });
//   };

//   return (
//     <AddressContext.Provider value={{ addressList, addAddress, updateAddress, deleteAddress }}>
//       {children}
//     </AddressContext.Provider>
//   );
// };

// const useAddressContext = () => {
//   return useContext(AddressContext);
// };

// export { AddressProvider, useAddressContext };
