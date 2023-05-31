import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from './Pages/Home';
import { BirthdayPage } from './Pages/Birthday';
import { AnniversaryPage } from './Pages/AnniversaryPage';
import { SpecialEvents } from './Pages/SpecialEvents';
import { LoginPage } from './Pages/LoginPage';
import { SignUpPage } from './Pages/SignUpPage';
import { RenderProduct } from './Components/RenderProduct/RenderProduct';
import { Checkout } from './Pages/Checkout';


function App() {
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
        <Route path= "/product-detail/:id/checkout" element={<Checkout/>}/>


      </Routes>
    </BrowserRouter>
  );
}

export default App;
