import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import { useSelector } from "react-redux";

export const AppNavbar = () => {
  const cart = useSelector((state) => state.cart);
  return (
    <div className="mb-5">
      <Navbar collapseOnSelect expand="lg" fixed="top" className={styles.navbar}>
        <Container fluid>
          <Link to="/" className={styles.item}>
            <Navbar.Brand href="#home">E-Commerce</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto center">
              <Link to="/" className={styles.item}>
                <Nav.Link href="#/">Home</Nav.Link>
              </Link>
              <Link to="/products" className={styles.item}>
                <Nav.Link href="#features">All Products</Nav.Link>
              </Link>
              <Link to="/blogs" className={styles.item}>
                <Nav.Link href="#pricing">Blogs</Nav.Link>
              </Link>
              <Link to="/about" className={styles.item}>
                <Nav.Link href="#about">About Us</Nav.Link>
              </Link>
              <Link to="/contact" className={styles.item}>
                <Nav.Link href="#contact">Contact Us</Nav.Link>
              </Link>
            </Nav>
            <Nav>
              <Link to="./login" className={styles.item}>
                <Nav.Link href="#Login">
                  <i className="fa-solid fa-right-to-bracket"></i>
                </Nav.Link>
              </Link>
              <Link to="./cart" className={styles.item}>
                <Nav.Link href="#cart">
                  <i className="fa-solid fa-cart-shopping position-relative">
                    <span
                      style={{
                        fontSize: "10px",
                      }}
                      className="position-absolute top-0 start-100 translate-middle badge bg-danger"
                    >
                      {cart?.cartItems?.length || 0}
                      <span className="visually-hidden">unread messages</span>
                    </span>
                  </i>
                </Nav.Link>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};
