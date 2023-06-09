import React from 'react';
import { AppNavbar } from '../Components/Navbar/Navbar';
import { TopBar } from '../Components/TopBar/TopBar';
import { Footer } from '../Components/Footer/Footer';

export const productpage=()=>{


    return(<>
    
    <TopBar/>

    <AppNavbar/>
    <h1>This is product page</h1>
    <Footer/>
    
    </>);

}
