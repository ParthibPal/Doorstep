import React, { useState } from 'react';
import './ActualComponent_css/PopupcardContents.css';
import { CartState } from '../CartOperations/Context';
import axios from 'axios';  // Make sure axios is installed (`npm install axios`)
import { toast } from 'react-hot-toast';
const PopupcardContents = (person) => {

    const { dispatch, state: { cart } } = CartState();
    const [buttonText, setButtonText] = useState("Add to Cart"); // State to manage button text
    const isInCart = cart.some(item => item.id === person.id);

    // Function to add item to the cart and insert into the database
    const addToCartHandler = async () => {
        try {
            const response = await axios.post('https://doorstep-backend-yesa.onrender.com/api/cart', {
                name: person.name,
                img: person.img,
                location: person.location,
                salesdata: person.salesdata,
                rating: person.rating,
                serviceCost: person.serviceCost,
                serviceName: person.serviceName,
                description: person.description,
                joiningdate: person.joiningdate,
                phone: person.phone,
                loggedInEmail: localStorage.getItem('loggedInEmail'),
                providerEmail: person.providerEmail,
            });

            dispatch({ type: "ADD_TO_CART", payload: person });
            toast.success("✔ Added to Cart");

            // Change button text to "✔ Added"
            setButtonText("✔ Added");

            // Revert the button text back to "Add to Cart" after 2 seconds
            setTimeout(() => {
                setButtonText("Add to Cart");
            }, 2000); // 2000ms = 2 seconds
        } catch (error) {
            console.error('Error adding to cart:', error);
            toast.error("❌ Failed to Add");
        }
    };




    return (

        <div className='popupcardcontents-container' key={person.id}>
            <div className='popupcardcontents-dp'>
                <img src={person.img} alt={person.name} />
            </div>

            <div className='popupcardcontents-data'>
                <span className='category'><b>Category:</b> {person.category}</span>
                <span className='name'><b>Service:</b> {person.serviceName}</span>
                <span className='description'>{person.description}</span>
                <span className='location'><b>Location:</b> {person.location}</span>

                <div className='sales-data-conatiner'>
                    <div className='total-sales'><div>Total Sales</div><div>{person.salesdata}</div></div>
                    <div className='rating'><div>Rating</div><div>{person.rating}</div></div>
                    <div className='member'><div>Minimum Charges</div><div>{person.serviceCost}</div></div>
                </div>

                <div className='popupcardcontents-btn'>
                    <button className='call'>Call Now</button>
                    <button className='book' onClick={addToCartHandler}>
                        {buttonText}
                    </button>
                </div>
            </div>
        </div>

    );
};

export default PopupcardContents;
