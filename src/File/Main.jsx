import React from 'react';
import './Main.css';
import Router from './Router';
import Footer from '../Components/ActualComponent/Footer';
import { Toaster } from 'react-hot-toast';
const Main = () => {
  return (
    <>
      <Toaster 
        position="top-center" 
        toastOptions={{ duration: 2000 }} 
        containerStyle={{ marginTop: "10vh" }}
      />
      <style>{`
        .Toastify__toast-container {
          margin-top: 10vh !important;
        }
      `}</style>
      <Router />
      <Footer />
    </>
  );
};

export default Main;
