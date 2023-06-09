import React from 'react';
import { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from './Pages/Home';
import { BirthdayPage } from './Pages/Birthday';
import { AnniversaryPage } from './Pages/AnniversaryPage';
import { SpecialEvents } from './Pages/SpecialEvents';
import { LoginPage } from './Pages/LoginPage';
import { SignUpPage } from './Pages/SignUpPage';
import { RenderProduct } from './Components/RenderProduct/RenderProduct';
import Cart from './Pages/Cart/Cart';
import { useDispatch } from 'react-redux';
import { deleteProduct, getProducts } from "./reducers/product.js";


function App() 

{
const dispatch = useDispatch();

useEffect(() =>
 {
  dispatch(getProducts());
  dispatch(deleteProduct());
}, []);



  return (
    

  
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/birthday-decor" element={<BirthdayPage/>} />
        <Route path="/anniversary-decor" element={<AnniversaryPage/>} />
        <Route exact path="/login" element={<LoginPage/>} />
        <Route path ="/special-events" element={<SpecialEvents/>}/>
        <Route path = "/login" element = {<LoginPage/>}/>
        <Route path = "/sign-up" element={<SignUpPage/>}/>
        <Route path = "/product-detail/:id" element={<RenderProduct/>}/>
        <Route path= "/product-detail/:id/cart" element={<Cart/>}/>
        <Route path='/cart' element={<Cart/>}/>


      </Routes>
    </BrowserRouter>
  );
}

export default App;
