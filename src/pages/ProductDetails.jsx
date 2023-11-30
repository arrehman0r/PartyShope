import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { BsBookmarkHeart, BsFillBookmarkHeartFill } from "react-icons/bs";

import {
  useAuthContext,
  useCartContext,
  useProductsContext,
  useWishlistContext,
} from "../contexts";
import { getProductByIdService } from "../api/apiServices";
import { StarRating } from "../components";
import { notify } from "../utils/utils";

const ProductDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { productId } = useParams();
  const { token } = useAuthContext();
  const { getProductById, allProducts } = useProductsContext();
  const { addProductToCart, disableCart } = useCartContext();
  const { addProductToWishlist, deleteProductFromWishlist, disableWish } =
    useWishlistContext();
  const [loading, setLoading] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const product = getProductById(productId);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await getProductByIdService(productId);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [allProducts]);

  return (
    <div className="md:min-h-[80vh] flex justify-center items-center pt-5 sm:pt-3 pb-2 relative">
      <main className="grid grid-rows-1 sm:grid-cols-2 gap-2 sm:gap-10 ">
        <section className="relative p-0.5 bg-black/[0.015]  flex items-center justify-center rounded-lg">
          <img
            src={product?.image}
            alt=""
            className="w-full object-contain max-w-xs"
          />
        </section>

        <section className="p-7 px-10 rounded-md shadow-sm bg-white/[0.7] flex flex-col gap-3 sm:gap-5 ">
          <div className="flex flex-col gap-2">
            <h1 className=" text-2xl sm:text-4xl font-bold">{product?.name}</h1>
            <p className=" text-gray-600 text-sm sm:text-base">
              {product?.description}
            </p>
            <div className="flex items-center gap-1">
              <StarRating />

              <span className="text-xs text-gray-400">
                ({product?.rating}) Rating
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2  ">
            <h2 className="  text-lg font-semibold">About Product</h2>
            <ul className="flex gap-5">
              <div>
                <li>
                  <span className="text-gray-500 text-sm">Brand: </span>
                  {product?.brand}
                </li>
                <li>
                  <span className="text-gray-500 text-sm">Category: </span>
                  {product?.category}
                </li>
              </div>
              <div>
                <li>
                  {/* <span className="text-gray-500 text-sm">Gender: </span>
                  {product?.gender} */}
                </li>
                <li>
                  {/* <span className="text-gray-500 text-sm">Heavy: </span>
                  {product?.weight} */}
                </li>
              </div>
            </ul>
          </div>

          <div className="flex gap-2 items-center pb-10 sm:pb-0">
            Price:
            <span className="ms-1 text-xl sm:text-2xl text-amber-600">
              Rs{product?.newPrice}
            </span>
            <span className="text-sm text-gray-600 line-through">
              Rs{product?.price}
            </span>
          </div>

          <div className={`w-full   flex gap-4 items-center   flex-wrap  `}>
            <button
              className="btn-rounded-secondary flex items-center gap-2 text-sm disabled:cursor-not-allowed"
              disabled={disableCart}
              onClick={() => {
                // if (false) {
                //   navigate("/login", { state: { from: location.pathname } });
                //   notify("warn", "Please Login to continue");
                // } else {
                if (localStorage.getItem("cart")?.includes(product._id)) {
                  // If the product is already in the cart, throw an error
                  notify("error", "Product is already in the cart");
                } else {
                  addProductToCart(product);
                  console.log("Product added to cart", product);
                  notify("success", "Product Added to Cart");
                }
                // }
              }}
            >
              <HiOutlineShoppingBag />{" "}
              {product?.inCart ? "Go to Bag" : "Add to Bag"}
            </button>

            <button
              className="btn-rounded-primary rounded-full flex items-center gap-2 text-sm disabled:cursor-not-allowed"
              disabled={disableWish}
              onClick={
                () => {
                  // if (!token) {
                  // if (false) {
                  //   navigate("/login", { state: { from: location.pathname } });
                  //   notify("warn", "Please Login to continue");
                  // } else {
                  if (product?.inWish) {
                    deleteProductFromWishlist(product._id);
                  } else {
                    addProductToWishlist(product);
                    notify("success", "Product Added to Wishlist");
                  }
                }
                // }
              }
            >
              {product?.inWish ? (
                <>
                  <BsFillBookmarkHeartFill />
                  <span>Remove from Wishlist</span>
                </>
              ) : (
                <>
                  {" "}
                  <BsBookmarkHeart /> <span>Wishlist Item</span>
                </>
              )}{" "}
            </button>
          </div>
        </section>
        <section className="relative p-0.5 bg-black/[0.015]  flex items-center justify-center rounded-lg">
          {/* <img
            src={product?.images[selectedImageIndex]}
            alt=""
            className="w-full object-contain max-w-xs"
          />
          <div className="flex gap-2 mt-4">
            {product?.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index}`}
                className={`w-12 h-12 cursor-pointer border border-gray-300 ${
                  index === selectedImageIndex ? "border-amber-500" : ""
                }`}
                onClick={() => setSelectedImageIndex(index)}
              />
            ))}
          </div> */}
        </section>

        <section className="p-7 px-10 rounded-md shadow-sm bg-white/[0.7] flex flex-col gap-3 sm:gap-5 ">
          <div className="flex flex-col gap-2">
            <h1 className=" text-xs sm:text-2xl font-bold">Long Description</h1>
            <p className=" text-gray-600 text-sm sm:text-base">
              {product?.longDescription}
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProductDetails;
