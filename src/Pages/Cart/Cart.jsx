import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button } from "../../Components/Button/Button";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../actions/cartActions";
import styles from "./styles.module.scss";

function CartPage() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const handleRemove = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const getTotalPrice = (item) => {
    const itemQuantity = item.quantity || 1;
    return item.product.price * itemQuantity;
  };

  const totalPrice = cartItems.reduce(
    (total, cartItem) => total + getTotalPrice(cartItem),
    0
  );

  if (!cartItems.length) {
    return (
      <Container className={styles.emptyCart}>
        <h2>Your cart is empty</h2>
        <Link to="/shop">
          <Button title="Continue Shopping" />
        </Link>
      </Container>
    );
  }

  return (
    <Container className={styles.cart}>
      <div className={styles.shoppingCart}>
        <h2 className={styles.cartHeading}>Shopping Cart</h2>
        <div className={styles.cartHeader}>
          {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
        </div>
      </div>
      <Row>
        <div className={`${styles.singleProduct} ${styles.heading}`}>
          <div>
            <h4>Product Details</h4>
          </div>
          <div>
            <h4>Quantity</h4>
          </div>
          <div>
            <h4>Price</h4>
          </div>
          <div>
            <h4>Total</h4>
          </div>
          <div>
            <h4>Actions</h4>
          </div>
        </div>
        {cartItems.map((cartItem) => (
          <div key={cartItem.product.id} className={styles.singleProduct}>
            <div className={styles.productImage}>
              <img src={cartItem.product.image} alt="product" />
            </div>
            <div className={styles.title}>
              <span className={styles.cartItemTitle}>
                {cartItem.product.title}
              </span>
            </div>
            <div className={styles.quantity}>
              <div className={styles.cartItemQuantity}>
                <span className={styles.quantityValue}>{cartItem.quantity}</span>
              </div>
            </div>
            <div className={styles.price}>${cartItem.product.price}</div>
            <div className={styles.total}>
              ${getTotalPrice(cartItem).toFixed(2)}
            </div>
            <div className={styles.actions}>
              <Button
                title="Remove"
                onClick={() => handleRemove(cartItem.product.id)}
                className={styles.btnDanger}
              />
            </div>
          </div>
        ))}
      </Row>
      <div className={styles.cartActions}>
        <Link to="/shop">
          <Button title="Continue Shopping" />
        </Link>
        <div className={styles.cartGrandTotal}>
          Grand Total: ${totalPrice.toFixed(2)}
        </div>
      </div>
    </Container>
  );
}

export default CartPage;
