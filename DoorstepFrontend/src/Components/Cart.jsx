import React, { useEffect, useState } from 'react';
import './Component_css/Cart.css';
import axios from 'axios';
import toast from 'react-hot-toast';




const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    // useEffect(() => {
    // Log the userEmail once the component mounts
    // console.log(localStorage.getItem('loggedInEmail')); // Should print the email of the logged-in user
    // }, []);
    const totalAmount = cartItems.reduce((acc, item) => acc + (item.serviceCost || 0), 0);

    // Fetch cart items from database
    const fetchCartItems = async () => {
        try {
            const email = localStorage.getItem('loggedInEmail');
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/cart?email=${email}`, {
                withCredentials: true
              });              
            setCartItems(response.data);
        } catch (error) {
            console.error('Error fetching cart items:', error);
            toast.error("⚠ Unable to load cart items");
          }
          
    };

    


    // Delete cart item from DB
    const removeCartItem = async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/cart/${id}`, {
                withCredentials: true
              });              
            // After deletion, refresh the list
            setCartItems((prevItems) => prevItems.filter(item => item._id !== id));
            toast.success("🗑️ Item removed from cart");
        } catch (error) {
            console.error('Error deleting cart item:', error);
            toast.error("❌ Failed to remove item");
          }          
    };

    useEffect(() => {
        fetchCartItems();
    }, []);

    return (
        <div className='cart-container' style={{ marginTop: "12vh" }}>
            <div className='shopping-cart-container'>
                <h2>Shopping Cart</h2>

                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    cartItems.map((item, index) => (
                        <div className='shopping-cart-items' key={`${item._id}-${index}`}>
                            <img src={item.img} alt={item.name} />
                            <div className='shopping-cart-items-desc'>
                                <label className='shopping-cart-items-heading'>{item.name}</label>
                                <label className='shopping-cart-items-stock'>Location: {item.location}</label>
                                <label className='shopping-cart-items-price'>
                                    ₹ {item.serviceCost ? item.serviceCost : 'N/A'}
                                </label>


                            </div>
                            <button onClick={() => removeCartItem(item._id)}>
                                Remove
                            </button>
                        </div>
                    ))
                )}
                {cartItems.length > 0 && (
                    <div className='cart-total'>
                        {/* <button onClick={() => {
                            console.log("Items in cart:");
                            cartItems.forEach(item => console.log(item));
                            // Later: call API to store data in DB
                        }}>
                            Pay: ₹ {totalAmount}
                        </button> */}
                        <button onClick={async () => {
                            const loggedInEmail = localStorage.getItem('loggedInEmail');

                            // Remove _id before sending to sales-table
                            const salesData = cartItems.map(({ _id, ...rest }) => ({
                                
                                ...rest,
                                loggedInEmail,
                                joiningdate: new Date(),
                            }));

                            try {
                                // 1. Save to sales-table
                                await axios.post('https://doorstep-backend-yesa.onrender.com/api/sales-table', { sales: salesData });

                                // 2. Remove items from cart table (reuse your function)
                                for (const item of cartItems) {
                                    await removeCartItem(item._id);
                                }

                                toast.success("Payment Successful! 🎉");
                            } catch (error) {
                                console.error("Error saving sales:", error);
                                toast.error("Failed to complete checkout. 😞");
                            }
                        }}>
                            Pay: ₹ {totalAmount}
                        </button>



                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
