import React from 'react'
import { useEffect, useState } from 'react';
import './Component_css/Admin.css'
// import SellerTempCollection from '../../../server/Backend/models/SellerFormModel';
import orders from '../images/admin-orders.png';
import seller from '../images/admin-seller.png';
import customers from '../images/admin-customers.png';

const Admin = () => {
    //state to store user data
    const [provider, setProvider] = useState([]);
    const [loading, setLoading] = useState(true);    //Loading state

    //useEfffect hook to fetch data when the component is mount
    useEffect(() => {
        fetch("https://doorstep-backend-yesa.onrender.com/api/tempProviderDetails")   //ensure correct API endpoint
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Http error! Status: ${res.status}`);
                }
                return res.json();
            })
            
            .then((data) => {
                
                setProvider(data); //store data in state
                setLoading(false);
            
            })
    }, [])
    // const fetchProviders = async () => {
    //     try {
    //         const response = await axios.get("http://localhost:5000/api/tempProviderDetails"); //API request to backend
    //         setProvider(response.data);    //Store fetched users in state
    //         // setShow(true);  //show user data after fetching
    //         // navigate("/provider");
    //     } catch (error) {
    //         console.log("❌ Error fetching provider data: ", error);
    //     }
    // }

    const handleDelete = async (providerId) => {
        try {
            // Check if providerId is valid
            if (!providerId || typeof providerId !== "string") {
                console.error("❌ Invalid provider ID:", providerId);
                return;
            }
            const response = await fetch(`https://doorstep-backend-yesa.onrender.com/api/tempProviderDetails/${providerId}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            });
            const data = await response.json();  // Read response JSON
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}, Messgae: ${data.message}`);
            }

            // Update state only if deletion was successful
            setProvider((provider) => provider.filter((provider) => provider._id !== providerId));
        } catch (error) {
            console.error("Error while deleting user: ", error.message);
        }
    }

    return (
        <div className='admin-container'>

            {/* Admin Heading */}
            <div className='admin-heading'>Welcome to Admin Page</div>

            {/* Stats */}
            <div className='admin-stats-container'>
                <div className='admin-stats'>
                    <img src={customers} />
                    <div>
                        <h2>10000+</h2>
                        <label>Customers</label>
                    </div>
                </div>

                <div className='admin-stats'>
                    <img src={seller} />
                    <div>
                        <h2>500+</h2>
                        <label>Sellers</label>
                    </div>
                </div>

                <div className='admin-stats'>
                    <img src={orders} />
                    <div>
                        <h2>13687+</h2>
                        <label>Orders</label>
                    </div>
                </div>
            </div>

            {/* Filter */}
            <div className='admin-filter'>
                <label>Select a Service - </label>
                <select className='admin-services'>
                    <option value="Plumbing Services">Plumbing Services</option>
                    <option value="Electrician Services">Electrician Services</option>
                    <option value="Cleaning Services">Cleaning Services</option>
                    <option value="Lawncare Services">Lawncare Services</option>
                    <option value="Painting Services">Painting Services</option>
                    <option value="Carpet Cleaning">Carpet Cleaning</option>
                    <option value="Handyman Services">Handyman Services</option>
                    <option value="Moving Services">Moving Services</option>
                    <option value="Computer Services">Computer Services</option>
                    <option value="Event Planning">Event Planning</option>
                    <option value="Photo Services">Photo Services</option>
                    <option value="Graphic Design">Graphic Design</option>
                    <option value="Web Developement">Web Developement</option>
                    <option value="Message Therapy">Message Therapy</option>
                    <option value="Tutor Services">Tutor Services</option>
                    <option value="Fitness Training">Fitness Training</option>
                    <option value="Message Therapy">Message Therapy</option>
                    <option value="Legal Services">Legal Services</option>
                    <option value="Interior Design">Interior Design</option>
                    <option value="Car Repair">Car Repair</option>
                    <option value="Personal Chef">Personal Chef</option>
                    <option value="Music Lessons">Music Lessons</option>
                    <option value="Wedding Planning">Wedding Planning</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Pet Grooming">Pet Grooming</option>
                    <option value="Financial Planning">Financial Planning</option>
                    <option value="Language Lessons">Language Lessons</option>
                    <option value="Art Classes">Art Classes</option>
                    <option value="Personal Stylist">Personal Stylist</option>
                    <option value="Yoga Classes">Yoga Classes</option>
                </select>
            </div>

            {/* Table Data */}
            <div className='admin-table'>
                <table>
                    <thead>
                        <tr>
                            <th>Unique Id</th>
                            <th>Provider Name</th>
                            <th>Service Name</th>
                            <th>Service Type</th>
                            <th>GSTIN No</th>
                            <th>Email Id</th>
                            <th>Ph. No</th>
                            <th>Location</th>
                            <th>Service Cost</th>
                            <th>Password</th>
                            <th>Description</th>
                            <th>Service Template</th>
                            <th>Make Changes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            provider.length > 0 ? (
                                provider.map((provider) => (
                                    <tr key={provider._id}>
                                        <td>{provider._id}</td>
                                        <td>{provider.name}</td>
                                        <td>{provider.serviceName}</td>
                                        <td>{provider.category}</td>
                                        <td>{provider.gstin}</td>
                                        <td>{provider.email}</td>
                                        <td>{provider.mobileNumber}</td>
                                        <td>{provider.serviceLocation}</td>
                                        <td>{provider.serviceCost}</td>
                                        <td>{provider.password}</td>
                                        <td>{provider.serviceDescription}</td>



                                        <td>
                                            
                                        {provider.imageSrc ? (
                                                <img src={provider.imageSrc} alt='Provider' style={{ width: "50px", height: "50px", borderRadius: "50%" }} />
                                            ) : (
                                                "No Image"
                                            )}
                                        </td>
                                        {/* <td><button className='admin-action-btn'><i class="fa-solid fa-trash admin-action-icon"></i></button>
                                    <button className='admin-action-btn'><i class="fa-solid fa-trash admin-action-icon"></i></button></td> */}

                                        <td>
                                            <button className='admin-action-btn'><i className="fa-solid fa-plus admin-action-icon"></i></button>
                                            <button className='admin-action-btn' onClick={() => handleDelete(provider._id)}><i className="fa-solid fa-trash admin-action-icon"></i></button>
                                        </td>

                                    </tr>

                                ))
                            ) : (
                                <tr>
                                    <td colSpan="13" className='noUsers'>No Users Found</td>
                                </tr>
                            )}
                    </tbody>
            
                </table>
            </div>

        </div>
    )
}

export default Admin