import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeCards from '../Components/HomeCards';
import CustomerSupport from '../Components/CustomerSupport';
import Navbar from '../Components/Navbar';
import Services from '../Components/Services'
import Cart from '../Components/Cart';
import ServicesPage from '../Components/ServicesPage';
import Dashboard from "../Components/Dashboard";
import LogIn from "../Components/LogIn.jsx";
import LogUp from "../Components/LogUp.jsx";
import AddCard from '../Components/AddCard.jsx';
import Protected from '../Components/Protected.jsx';
import Seller from '../Components/Seller.jsx';
import SellerForm from '../Components/SellerForm.jsx';

import Admin from '../Components/Admin.jsx';

const Router = () => {
  return (

    <BrowserRouter>
      <Navbar />
      <Routes>


        <Route path='/home' element={<Protected Component={HomeCards} />} />

        <Route path='/customersupport' element={<CustomerSupport />} />
        <Route path='/services' element={<Protected Component={ServicesPage} />} />
        <Route path='/addcard' element={<Protected Component={AddCard} />} />
        <Route path='/cart' element={<Protected Component={Cart} />} />
        <Route path='/dashboard' element={<Protected Component={Dashboard} />} />
        <Route path='/seller' element={<Protected Component={Seller} />} />
        <Route path='/sellerForm' element={<Protected Component={SellerForm} />} />
        <Route path='/admin' element={<Protected Component={Admin} />} />

        <Route path='/' element={<LogIn />} />
        <Route path='/Doorstep/' element={<LogIn />} />
      </Routes>
  
    </BrowserRouter>


  )
}

export default Router