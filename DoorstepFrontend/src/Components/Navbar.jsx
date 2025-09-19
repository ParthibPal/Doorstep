import React, { useState, useEffect } from 'react';
import './Component_css/Navbar.css';
import ProfileDropdown from './ProfileDropdown';
import { NavLink, useNavigate } from 'react-router-dom';
import title from '../images/title.png';
import SearchLogo from '../images/search-b.png';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavAvatar from "../images/nav-avatar.png"
const Navbar = () => {
    const navigate = useNavigate();
    const [openProfile, setOpenProfie] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [modalId, setModalId] = useState(null);
    const [fetchedData, setFetchedData] = useState(null);
    const [searchActive, setSearchActive] = useState(false);
    const [addedItems, setAddedItems] = useState([]);

    const handleClick = () => navigate("/home");

    const addToCartHandler = async (item) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
                name: item.name,
                img: item.imageSrc,
                location: item.serviceLocation,
                salesdata: item.salesdata || 0,
                rating: item.rating && item.rating >= 1 ? item.rating : 1,
                serviceCost: item.serviceCost,
                serviceName: item.serviceName,
                description: item.serviceDescription,
                joiningdate: item.joiningdate || new Date(),
                phone: item.mobileNumber,
                loggedInEmail: localStorage.getItem('loggedInEmail'),
                providerEmail: item.email,
              }, {
                withCredentials: true
              });
              

            // ✅ Toast Notification
            toast.success("Item added to cart!", { autoClose: 2000 });

            // ✅ Add item id to state (temporary "Added" state)
            setAddedItems((prev) => [...prev, item._id]);

            // ✅ Remove the "added" state after 2 seconds
            setTimeout(() => {
                setAddedItems((prev) => prev.filter(id => id !== item._id));
            }, 2000);
        } catch (error) {
            console.error('Error adding to cart:', error);
            toast.error("Failed to add to cart.");
        }
    };

    const handleSearchKeyDown = async (e) => {
        if (e.key === 'Enter' && searchTerm.trim()) {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cards`);
                const data = await response.json();

                const filtered = data.filter((item) =>
                    item.category.toLowerCase().includes(searchTerm.toLowerCase())
                );

                setSearchResults(filtered);
                setSearchActive(true);
            } catch (error) {
                console.error("Search error", error);
                setSearchResults([]);
                setSearchActive(true);
            }
        }
    };

    const toggleModal = async (category) => {
        const newCategory = modalId === category ? null : category;
        setModalId(newCategory);

        if (newCategory) {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cards/${category}`);
                if (response.ok) {
                    const data = await response.json();
                    setFetchedData(data);
                } else {
                    console.error('Modal fetch error:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching modal data:', error);
            }
        } else {
            setFetchedData(null);
        }
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setSearchActive(false);
                setSearchResults([]);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div className='Nav-wrapper'>
            <ToastContainer/>
            <nav>
                <span className='components'>
                    <div className='logo' title='DoorStep' onClick={handleClick}>
                        <img src={title} />
                    </div>
                    <div className='links'>
                        <label><NavLink to='/home'>Home</NavLink></label>
                        <label><NavLink to='/services'>Services</NavLink></label>
                        <label><NavLink to='/seller'>Provider</NavLink></label>
                    </div>
                    {/* <div className='cart-logo' onClick={() => navigate('/cart')}>
                        <i className="fa-solid fa-cart-shopping "></i>
                        <label></label>
                    </div> */}
                    <div className='search-box'>
                        <input
                            type="text"
                            placeholder="Search here 🔎"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleSearchKeyDown}
                        />
                        {/* <img src={SearchLogo} alt='search' className='search-icon' /> */}
                    </div>
                    <img className="nav-avatar" src={NavAvatar} onClick={() => setOpenProfie((prev) => !prev)} />
                </span>
                {openProfile && <ProfileDropdown />}
            </nav>

            {searchActive && (
                <div className="search-overlay" onClick={() => {
                    setSearchActive(false);
                    setSearchResults([]);
                }}>
                    <div className="search-results-box" onClick={(e) => e.stopPropagation()}>
                        {searchResults.length > 0 ? (
                            searchResults.map((item) => (
                                <div
                                    key={item._id}
                                    className="search-result-item rich-result"
                                    onClick={() => toggleModal(item.category)}
                                >
                                    <img src={item.imageSrc} alt={item.title} className="result-image" />
                                    <div className="result-info">
                                        <h4>{item.serviceName}</h4>
                                        <p className="description">{item.serviceDescription}</p>
                                        <p className="cost">Cost: ₹{item.serviceCost}</p>
                                        <p className="location">Location: {item.serviceLocation}</p>
                                        {addedItems.includes(item._id) ? (
                                            <button className="add-to-cart-button added" disabled>
                                                ✔ Added
                                            </button>
                                        ) : (
                                            <button
                                                className="add-to-cart-button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    addToCartHandler(item);
                                                }}
                                            >
                                                Add to Cart
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p style={{ textAlign: 'center', color: '#888', fontSize: '14px' }}>
                                No results found.
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
