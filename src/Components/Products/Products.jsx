import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardBody, CardTitle, Button, CardSubtitle } from "reactstrap";
import styles from "./styles.module.scss";
import {Link} from 'react-router-dom'

import { RanderProduct } from "../RenderProduct/RenderProduct";

export const ProductsApi = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  

  useEffect(() => {
    setError(false);
    setLoading(true);
    try {
      axios.get("https://fakestoreapi.com/products").then((response) => {
        console.log("response", response.data);
        setProducts(response.data);
        setLoading(false);
      });
    } catch (error) {
      console.error("error is", error);
      setError(true);
      setLoading(false);
    }
  }, []);

  
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching products.</p>;
  }

  

  return (
    <>
      <h3 className={styles.featuredtag}>Featured Products</h3>

      <ul className={styles.containerStyles}>
        {products.map((product) => (
          <Card 
            className={styles.cardStyles}
            key={product.id}
          >
            <Link to={`/product-detail/${product.id}`}>
            <img alt="Sample" src={product.image} />
            <CardBody>
              <CardTitle tag="h5">{product.name}</CardTitle>
              <CardSubtitle className="mb-2 text-muted" tag="h6">
                Rs {product.price}
              </CardSubtitle>

              <Button>View Item</Button>
            </CardBody></Link>
          </Card>
        ))}
      </ul>
    </>
  );
};
