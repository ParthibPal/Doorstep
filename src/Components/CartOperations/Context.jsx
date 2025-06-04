import { createContext, useContext, useReducer } from 'react'
// import { faker } from '@faker-js/faker';



const cart = createContext();

import React from 'react'
import { cartReducer } from './Reducer';

const Context = ({ children }) => {

    const productList = [
        { img: "/images/Samrat.jpg", name: "Samrat Kumar", phone: "7980660633", location: "Bally", salesdata: "660", rating: "4.5", price: "509" ,id:'1'},
        { img: "/images/Softy.jpg", name: "Softy Sharma", phone: "6289992544", location: "Hindmotor", salesdata: "532", rating: "3.9", price: "455",id:'2' },
        { img: "/images/Supriti.jpg", name: "Supriti Das", phone: "8697219189", location: "Liluah", salesdata: "532", rating: "4.1", price: "799",id:'3' },
        { img: "/images/Parthib.jpg", name: "Parthib Pal", phone: "8777246552", location: "Uttarpara", salesdata: "660", rating: "4.9", price: "289",id:'4' },
        { img: "/images/Rajdeep.jpg", name: "Rajdeep Patra", phone: "6290671725", location: "Maniktala", salesdata: "532", rating: "3.5", price: "629",id:'5' }
    ];

    


    const products = Array.from({ length: 5 }, (_, index) => productList[index % productList.length]);

    // console.log(products)

    const [state, dispatch] = useReducer(cartReducer, {
        products: products,
        cart: []
    })






    return (
        <cart.Provider value={{ state, dispatch }}>
            {children}
        </cart.Provider>
    )
}

export default Context;

export const CartState = () => {
    return useContext(cart)
}