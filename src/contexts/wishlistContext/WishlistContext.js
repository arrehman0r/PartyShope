import { createContext, useEffect, useReducer, useState } from "react";
import { initialState, wishlistReducer } from "../../reducers/wishlistReducer";
import {
  deleteProductFromWishlistService,
  getWishlistItemsService,
  postAddProductToWishlistService,
} from "../../api/apiServices";
import { actionTypes } from "../../utils/actionTypes";
import { useAuthContext, useProductsContext } from "..";
import { notify } from "../../utils/utils";

export const WishlistContext = createContext();

const WISHLIST_STORAGE_KEY = "wishlist";

const WishlistContextProvider = ({ children }) => {
  const { token } = useAuthContext();
  const { updateInCartOrInWish } = useProductsContext();
  const [loadingWishlist, setLoadingWishlist] = useState(false);
  const [disableWish, setDisableWish] = useState(false);
  const [state, dispatch] = useReducer(wishlistReducer, initialState);

  useEffect(() => {
    setLoadingWishlist(true);
    (async () => {
      try {
        // Retrieve wishlist from local storage
        const storedWishlist =
          JSON.parse(localStorage.getItem(WISHLIST_STORAGE_KEY)) || [];

        // If there are items in local storage, initialize the state with them
        if (storedWishlist.length > 0) {
          dispatch({
            type: actionTypes.INITIALIZE_WISHLIST,
            payload: storedWishlist,
          });
        } else {
          // If local storage is empty, fetch wishlist from the server
          const wishlistRes = await getWishlistItemsService();

          if (wishlistRes.status === 200) {
            dispatch({
              type: actionTypes.INITIALIZE_WISHLIST,
              payload: wishlistRes.data.wishlist,
            });

            // Save the fetched wishlist to local storage
            localStorage.setItem(
              WISHLIST_STORAGE_KEY,
              JSON.stringify(wishlistRes.data.wishlist)
            );
          }
        }
      } catch (err) {
        console.log(err);
        // notify(
        //   "error",
        //   err?.response?.data?.errors
        //     ? err?.response?.data?.errors[0]
        //     : err?.response?.data?.message
        // );
      } finally {
        setLoadingWishlist(false);
      }
    })();
  }, []);

  const addProductToWishlist = async (product) => {
    setDisableWish(true);
    try {
      const response = await postAddProductToWishlistService(product);
      if (response.status === 200 || response.status === 201) {
        dispatch({
          type: actionTypes.ADD_PRODUCT_TO_WISHLIST,
          payload: [{ ...product, inWish: true }, ...state.wishlist],
        });

        // Update local storage with the modified wishlist
        localStorage.setItem(
          WISHLIST_STORAGE_KEY,
          JSON.stringify([{ ...product, inWish: true }, ...state.wishlist])
        );

        updateInCartOrInWish(product._id, "inWish", true);
      }
      notify("success", "Added to wishlist");
    } catch (err) {
      console.log(err);
      // notify(
      //   "error",
      //   err?.response?.data?.errors
      //     ? err?.response?.data?.errors[0]
      //     : "Some Error Occurred!!"
      // );
    } finally {
      setDisableWish(false);
    }
  };

  const deleteProductFromWishlist = async (productId) => {
    setDisableWish(true);
    try {
      const response = await deleteProductFromWishlistService(productId);
      console.log({ response });
      if (response.status === 200 || response.status === 201) {
        dispatch({
          type: actionTypes.DELETE_PRODUCTS_FROM_WISHLIST,
          payload: state.wishlist.filter(({ _id }) => _id !== productId),
        });

        // Update local storage with the modified wishlist
        localStorage.setItem(
          WISHLIST_STORAGE_KEY,
          JSON.stringify(state.wishlist.filter(({ _id }) => _id !== productId))
        );

        updateInCartOrInWish(productId, "inWish", false);
        notify("warn", "Removed from wishlist");
      }
    } catch (err) {
      console.log(err);
      // notify(
      //   "error",
      //   err?.response?.data?.errors
      //     ? err?.response?.data?.errors[0]
      //     : "Some Error Occurred!!"
      // );
    } finally {
      setDisableWish(false);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist: state.wishlist,
        disableWish,
        loadingWishlist,
        addProductToWishlist,
        deleteProductFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistContextProvider;

// import { createContext, useEffect, useReducer, useState } from "react";
// import { initialState, wishlistReducer } from "../../reducers/wishlistReducer";
// import {
//   deleteProductFromWishlistService,
//   getWishlistItemsService,
//   postAddProductToWishlistService,
// } from "../../api/apiServices";
// import { actionTypes } from "../../utils/actionTypes";
// import { useAuthContext, useProductsContext } from "..";
// import { notify } from "../../utils/utils";

// export const WishlistContext = createContext();

// const WishlistContextProvider = ({ children }) => {
//   const { token } = useAuthContext();
//   const { updateInCartOrInWish } = useProductsContext();
//   const [loadingWishlist, setLoadingWishlist] = useState(false);
//   const [disableWish, setDisableWish] = useState(false);
//   const [state, dispatch] = useReducer(wishlistReducer, initialState);

//   useEffect(() => {
//     setLoadingWishlist(true);
//     (async () => {
//       try {
//         const wishlistRes = await getWishlistItemsService();

//         if (wishlistRes.status === 200) {
//           dispatch({
//             type: actionTypes.INITIALIZE_WISHLIST,
//             payload: wishlistRes.data.wishlist,
//           });
//         }
//       } catch (err) {
//         console.log(err);
//         // notify(
//         //   "error",
//         //   err?.response?.data?.errors
//         //     ? err?.response?.data?.errors[0]
//         //     : err?.response?.data?.message
//         // );
//       } finally {
//         setLoadingWishlist(false);
//       }
//     })();
//   }, []);

//   const addProductToWishlist = async (product) => {
//     setDisableWish(true);
//     try {
//       const response = await postAddProductToWishlistService(product);
//       if (response.status === 200 || response.status === 201) {
//         dispatch({
//           type: actionTypes.ADD_PRODUCT_TO_WISHLIST,
//           payload: [{ ...product, inWish: true }, ...state.wishlist],
//         });
//         updateInCartOrInWish(product._id, "inWish", true);
//       }
//       notify("success", "Added to wishlist");
//     } catch (err) {
//       console.log(err);
//       notify(
//         "error",
//         err?.response?.data?.errors
//           ? err?.response?.data?.errors[0]
//           : "Some Error Occurred!!"
//       );
//     } finally {
//       setDisableWish(false);
//     }
//   };

//   const deleteProductFromWishlist = async (productId) => {
//     setDisableWish(true);
//     try {
//       const response = await deleteProductFromWishlistService(productId);
//       console.log({ response });
//       if (response.status === 200 || response.status === 201) {
//         dispatch({
//           type: actionTypes.DELETE_PRODUCTS_FROM_WISHLIST,
//           payload: state.wishlist.filter(({ _id }) => _id !== productId),
//         });
//         updateInCartOrInWish(productId, "inWish", false);
//         notify("warn", "Removed from wishlist");
//       }
//     } catch (err) {
//       console.log(err);
//       notify(
//         "error",
//         err?.response?.data?.errors
//           ? err?.response?.data?.errors[0]
//           : "Some Error Occurred!!"
//       );
//     } finally {
//       setDisableWish(false);
//     }
//   };

//   return (
//     <WishlistContext.Provider
//       value={{
//         wishlist: state.wishlist,
//         disableWish,
//         loadingWishlist,
//         addProductToWishlist,
//         deleteProductFromWishlist,
//       }}
//     >
//       {children}
//     </WishlistContext.Provider>
//   );
// };

// export default WishlistContextProvider;
