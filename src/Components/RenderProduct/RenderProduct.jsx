import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Button, Col, Container, Row } from "reactstrap";
import axios from "axios";
import { Navbar } from "../Navbar/Navbar";
import { Footer } from "../Footer/Footer";
import styles from "./styles.module.scss";
import { useDispatch } from "react-redux";
import { addToCart } from "../../reducers/cart";

export const RenderProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`).then((response) => {
      setProduct(response.data);
    });
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product.id));
      setShowPopup(true);
    }
  };

  

  return (
    <>
      <Navbar />
      <Container className={styles.containerStyles}>
        {product ? (
          <div>
            <Row>
              <Col md="6">
                <img
                  src={product.image}
                  alt={product.title}
                  className="img-fluid img-responsive"
                />
              </Col>
              <Col md="6">
                <h1>{product.title}</h1>
                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
                <p>Category: {product.category}</p>
                <p>
                  Rating: {product.rating.rate} ({product.rating.count}{" "}
                  reviews)
                </p>
                <Button
                  color="primary"
                  className={`mr-3 ${styles.BuyNowButton}`}
                >
                  Buy Now
                </Button>
                <Button
                  color="success"
                  className={`mr-3 ${styles.AddtoCartButton}`}
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
              </Col>
            </Row>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </Container>
      <Footer />
    </>
  );
};
