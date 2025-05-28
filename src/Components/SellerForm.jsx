import React, { useState, useEffect } from 'react';
import '../Components/Component_css/SellerForm.css';
import axios from 'axios'
import toast from 'react-hot-toast';
import Register from "../images/register.png";
import SellerLogin from "../images/sellerLogin.png";
import PassCreation from "../images/passCreation.png"
const SellerForm = () => {
    const [mobileNumber, setMobileNumber] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");  //unused
    const [serviceName, setServiceName] = useState("");  //REPLACED FROM INPUT TO SELECT
    const [serviceLocation, setServiceLocation] = useState("");  //unused
    const [serviceCost, setServiceCost] = useState("");  //unused
    const [imageSrc, setImageSrc] = useState(null);  //unused
    const [gstin, setGstin] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [serviceDescription, setServiceDescription] = useState("");
    const [step, setStep] = useState(1);   //step navigatopn step

    const handleNextStep = async (e) => {
        e.preventDefault();
        const formData = {
            mobileNumber,
            email,
            gstin,
        };

        try {
            const response = await axios.post("https://doorstep-backend-yesa.onrender.com/api/sellerTempForm", formData, {
                headers: { "Content-Type": "application/json" }
            })

            if (response.status === 201) {
                alert("✅ Service Provider request submitted successfully!")
                sessionStorage.setItem("sellerEmail", email);
                setStep(step + 1)
            } else {
                alert("❌ Failed to submit request. Please try again.")
            }
        } catch (error) {
            console.log(error);
            alert("❌ Failed to submit request. Please try again.")
        }
    }

    useEffect(() => {
        if (email) {
            sessionStorage.setItem("sellerEmail", email)
        }
    }, [email]);

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();

        if (!name) {
            alert("Please enter your name 😊");
            return;
        }
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        if (password.length < 5 || password.length > 10) {
            alert("Password must be between 5 and 10 characters.");
            return;
        }
        if (email && password.includes(email.split("@")[0])) {
            alert("Password must be different from the email address.");
            return;
        }

        try {
            const response = await axios.post("https://doorstep-backend-yesa.onrender.com/api/sellerTempForm/step2", {
                email: sessionStorage.getItem("sellerEmail"),
                name,
                password,
                confirmPassword
            }, { headers: { "Content-Type": "application/json" } });
            if (response.status === 201) {
                alert("✅ Password set successfully!");
                setStep(3);
            } else {
                alert("❌ Failed to set password.");
            }
        } catch (error) {
            console.error(error);
            alert("❌ Error setting password.");
        }
    };

    const handleServiceDetails = async (e) => {
        e.preventDefault();
        if (!category || !serviceName || !serviceLocation || !serviceCost || !imageSrc || !serviceDescription) {
            alert("Fill all the details 😊")
            return
        }
        const email = sessionStorage.getItem("sellerEmail");
        if (!email) {
            alert("❌ Error: No email found in session storage.");
            return;
        }
        const formData = new FormData();
        formData.append("email", email);
        formData.append("category", category);
        formData.append("serviceName", serviceName);
        formData.append("serviceDescription", serviceDescription);
        formData.append("serviceLocation", serviceLocation);
        formData.append("serviceCost", serviceCost);
        formData.append("imageSrc", imageSrc);
        try {
            const response = await axios.post("https://doorstep-backend-yesa.onrender.com/api/sellerTempForm/step3",
                formData, { headers: { "Content-Type": "multipart/form-data" } });
            if (response.status === 200) {
                // alert("✅ Service details added succesfully!");
                toast.success("Service details added succesfully!")
            } else {
                // alert("❌ Failed to add service details.");
                toast.dismiss("Failed to add service details.")
            }
        } catch (error) {
            console.error(error);
            // alert("❌ Error in adding service details.");
            toast.error("Error in adding service details.")
        }
    }

    return (
        <>
            <div className="afterseller" >
                <header className="progress-bar" >
                    <button className={`step ${step === 1 ? "active" : ""}`} onClick={() => { setStep(1) }}>Email Id & GST</button>
                    <button className={`step ${step === 2 ? "active" : ""}`} onClick={() => setStep(2)}>Password Creation</button>
                    <button className={`step ${step === 3 ? "active" : ""}`} onClick={() => setStep(3)}>Service Details</button>
                </header>

                {step === 1 && (
                    <div className="form-container" style={{ marginTop: "7vh" }}>
                        <div className="form-section" >
                            <label htmlFor="mobile-number">Enter Mobile Number *</label>
                            <div className="input-with-otp">
                                <input
                                    type="tel"
                                    id="mobile-number"
                                    placeholder="Enter Mobile Number"
                                    value={mobileNumber}
                                    onChange={(e) => setMobileNumber(e.target.value)}
                                />
                                <button className="otp-btn">Send OTP</button>
                            </div>

                            <label htmlFor="email">Email ID *</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Email ID"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <label htmlFor="gstin">Enter GSTIN</label>
                            <input
                                type="text"
                                id="gstin"
                                placeholder="Enter GSTIN"
                                value={gstin}
                                onChange={(e) => setGstin(e.target.value)}
                            />

                            <p className="gst-disclaimer">
                                GSTIN is required to sell products on Doorstep. You can also share it in the final step.
                            </p>
                            <p className="terms">
                                By continuing, I agree to Doorstep's
                                <a href="#"> Terms of Use </a> & <a href="#"> Privacy Policy</a>.
                            </p>

                            <button className="submit-btn" onClick={handleNextStep}>Register & Continue →</button>
                        </div>
                        <div className="info-section">
                            <img src={Register} alt='Register Illutrator' />
                        </div>
                    </div>
                )}
            </div>

            {step === 2 && (
                <div className="passContainer" style={{ marginTop: "3vh" }}>
                    <div className='password-img'>
                        <img src={PassCreation} alt='Password setup' />
                    </div>
                    <div className="passwordCreation">
                        <h2>Choose your secret password secretly</h2>
                        <p>You will use this password to Sign In to Door Step.</p>
                        <form className="setPassword" onSubmit={handlePasswordSubmit}>
                            <h3>Enter your name: </h3>
                            <input
                                type='text'
                                placeholder='Enter name'
                                value={name}
                                onChange={(e) => setName(e.target.value)} />
                            <h3>Enter your password: </h3>
                            <input
                                type='password'
                                placeholder='Enter Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                            <h3>Confirm  your password: </h3>
                            <input
                                type='password'
                                placeholder='Confirm Your Password'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)} />
                            <h3>Password requirements</h3>
                            <ul>
                                <li>must be at least 5 characters</li>
                                <li>must be fewer than 10</li>
                                <li>must be different from email address</li>
                            </ul>
                            <button type='submit'>Submit</button>
                        </form>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className="sellerLogin" >
                    <div className="seller-form">
                        <h1>Provide the service information carefully</h1>
                        <form className='enterPasswordSeller' onSubmit={handleServiceDetails}>
                            <h2>Choose Category</h2>
                            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option value="">Select a Category</option>
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
                                <option value="Photography Services">Photo Services</option>
                                <option value="Graphic Design">Graphic Design</option>
                                <option value="Web Developement">Web Developement</option>
                                <option value="Message Therapy">Massage Therapy</option>
                                <option value="Tutor Services">Tutor Services</option>
                                <option value="Fitness Training">Fitness Training</option>
                                <option value="Legal Services">Legal Services</option>
                                <option value="Interior Design">Interior Design</option>
                                <option value="Car Repair">Car Repair</option>
                                <option value="Personal Chef">Personal Chef</option>
                                <option value="Music Lessons">Music Lessons</option>
                                <option value="Wedding Planning">Wedding Planning</option>
                                <option value="Real Estate">Real Estate</option>
                                <option value="Planting Services">Painting Services</option>
                                <option value="Pet Grooming">Pet Grooming</option>
                                <option value="Financial Planning">Financial Planning</option>
                                <option value="Language Lessons">Language Lessons</option>
                                <option value="Art Classes">Art Classes</option>
                                <option value="Personal Stylist">Personal Stylist</option>
                                <option value="Yoga Classes">Yoga Classes</option>
                            </select>

                            <h2>Select Subcategory (with details)</h2>
                            <select value={serviceName} onChange={(e) => setServiceName(e.target.value)}>
                                <option value="">Select a Subcategory</option>

                                <optgroup label="Tutor Services">
                                    <option value="Math - School - 1hr - ₹500 - Material Included">Math (School) - 1hr - ₹500 - Material Included</option>
                                    <option value="Math - College - 1hr - ₹700 - Material Not Included">Math (College) - 1hr - ₹700 - Material Not Included</option>
                                    <option value="Science - College - 5hr Pack - ₹3000 - Material Included">Science (College) - 5hr Pack - ₹3000 - Material Included</option>
                                    <option value="Language - Beginner - 1 Month - ₹4000 - Material Included">Language (Beginner) - 1 Month - ₹4000 - Material Included</option>
                                </optgroup>
                                <optgroup label="Personal Stylist Services">
                                    <option value="Wardrobe Makeover - 2hrs - ₹2,000 - Closet Audit & Outfit Planning">Wardrobe Makeover – 2hrs – ₹2,000 – Closet Audit & Outfit Planning</option>
                                    <option value="Personal Shopping - Half Day - ₹3,500 - In-store or Online Styling">Personal Shopping – Half Day – ₹3,500 – In-store or Online Styling</option>
                                    <option value="Occasion Styling - 1.5hrs - ₹2,000 - Event-Specific Outfit Curation">Occasion Styling – 1.5hrs – ₹2,000 – Event-Specific Outfit Curation</option>
                                    <option value="Virtual Style Session - 1hr - ₹1,000 - Online Consultation">Virtual Style Session – 1hr – ₹1,000 – Online Consultation</option>
                                    <option value="Seasonal Styling - 2hrs - ₹2,200 - Trends & Layering Advice">Seasonal Styling – 2hrs – ₹2,200 – Trends & Layering Advice</option>
                                </optgroup>
                                <optgroup label="Language Lessons">
                                    <option value="English - Beginner - 1 Month - ₹3,000 - Basic Grammar, Speaking Practice">English - Beginner – 1 Month – ₹3,000 – Basic Grammar, Speaking Practice</option>
                                    <option value="French - Intermediate - 1 Month - ₹4,500 - Conversation, Grammar, Culture">French - Intermediate – 1 Month – ₹4,500 – Conversation, Grammar, Culture</option>
                                    <option value="Spanish - Crash Course - 2 Weeks - ₹2,500 - Travel Basics, Vocabulary">Spanish - Crash Course – 2 Weeks – ₹2,500 – Travel Basics, Vocabulary</option>
                                    <option value="Hindi - Advanced - 1 Month - ₹3,800 - Writing Skills, Formal Language">Hindi - Advanced – 1 Month – ₹3,800 – Writing Skills, Formal Language</option>
                                </optgroup>

                                <optgroup label="Graphic Design">
                                    <option value="Logo Design - ₹5,000 - Custom Logo, 3 Revisions, PNG/Vector Formats">Logo Design – ₹5,000 – Custom Logo, 3 Revisions, PNG/Vector Formats</option>
                                    <option value="Brand Identity - ₹12,000 - Logo, Business Card, Letterhead, Color Palette">Brand Identity – ₹12,000 – Logo, Business Card, Letterhead, Color Palette</option>
                                    <option value="Social Media Graphics - ₹3,000 - 5 Designs, Custom Layout, Platform Optimized">Social Media Graphics – ₹3,000 – 5 Designs, Custom Layout, Platform Optimized</option>
                                    <option value="Web Design - ₹15,000 - Custom Design, 3 Pages, Mobile Responsive">Web Design – ₹15,000 – Custom Design, 3 Pages, Mobile Responsive</option>
                                    <option value="Brochure Design - ₹8,000 - Tri-Fold Design, 2 Revisions, High-Resolution Files">Brochure Design – ₹8,000 – Tri-Fold Design, 2 Revisions, High-Resolution Files</option>
                                    <option value="Illustration Design - ₹10,000 - Custom Artwork, 3 Revisions, Digital Format">Illustration Design – ₹10,000 – Custom Artwork, 3 Revisions, Digital Format</option>
                                </optgroup>
                                <optgroup label="Legal Services">
                                    <option value="Will Drafting - 2hrs - ₹3,000 - Personalized Legal Document">Will Drafting – 2hrs – ₹3,000 – Personalized Legal Document</option>
                                    <option value="Property Dispute Consultation - 1hr - ₹2,000 - Legal Advice & Strategy">Property Dispute Consultation – 1hr – ₹2,000 – Legal Advice & Strategy</option>
                                    <option value="Contract Review - 1hr - ₹1,500 - Risk Assessment, Revisions">Contract Review – 1hr – ₹1,500 – Risk Assessment, Revisions</option>
                                    <option value="Legal Notice Drafting - 1.5hrs - ₹2,200 - Official Communication with Client Input">Legal Notice Drafting – 1.5hrs – ₹2,200 – Official Communication with Client Input</option>
                                    <option value="Business Setup Advice - 2hrs - ₹3,500 - Licensing, Registration Help">Business Setup Advice – 2hrs – ₹3,500 – Licensing, Registration Help</option>
                                </optgroup>
                                <optgroup label="Massage Therapy">
                                    <option value="Swedish Massage - 60min - ₹2,000 - Relaxation, Light Pressure">Swedish Massage – 60min – ₹2,000 – Relaxation, Light Pressure</option>
                                    <option value="Deep Tissue Massage - 90min - ₹2,800 - Muscle Recovery, High Pressure">Deep Tissue Massage – 90min – ₹2,800 – Muscle Recovery, High Pressure</option>
                                    <option value="Aromatherapy Massage - 60min - ₹2,500 - Essential Oils, Mood Enhancement">Aromatherapy Massage – 60min – ₹2,500 – Essential Oils, Mood Enhancement</option>
                                    <option value="Foot Reflexology - 45min - ₹1,200 - Pressure Points, Improved Circulation">Foot Reflexology – 45min – ₹1,200 – Pressure Points, Improved Circulation</option>
                                    <option value="Prenatal Massage - 60min - ₹2,300 - Pregnancy Support, Gentle Touch">Prenatal Massage – 60min – ₹2,300 – Pregnancy Support, Gentle Touch</option>
                                </optgroup>
                                <optgroup label="Planting Services">
                                    <option value="Garden Setup - ₹8,000 - Includes Soil, Plants, Pots, and Maintenance for 1 Month">Garden Setup – ₹8,000 – Includes Soil, Plants, Pots, and Maintenance for 1 Month</option>
                                    <option value="Indoor Planting - ₹4,000 - 10 Plants with Pots, Indoor Setup, Care Guide">Indoor Planting – ₹4,000 – 10 Plants with Pots, Indoor Setup, Care Guide</option>
                                    <option value="Terrace Garden Installation - ₹12,000 - Plants, Soil, Pots, Drip Irrigation System">Terrace Garden Installation – ₹12,000 – Plants, Soil, Pots, Drip Irrigation System</option>
                                    <option value="Vertical Garden Setup - ₹7,500 - Vertical Planters, Plants, Installation">Vertical Garden Setup – ₹7,500 – Vertical Planters, Plants, Installation</option>
                                    <option value="Lawn Care & Grass Planting - ₹10,000 - Includes Lawn Preparation and Seed Plantation">Lawn Care & Grass Planting – ₹10,000 – Includes Lawn Preparation and Seed Plantation</option>
                                </optgroup>

                                <optgroup label="Handyman Services">
                                    <option value="Plumbing - ₹1,500 - Pipe Repair, Leaks, Faucet Installation">Plumbing – ₹1,500 – Pipe Repair, Leaks, Faucet Installation</option>
                                    <option value="Electrical - ₹2,000 - Wiring, Socket Installation, Light Fixtures">Electrical – ₹2,000 – Wiring, Socket Installation, Light Fixtures</option>
                                    <option value="Furniture Assembly - ₹1,000 - Tables, Chairs, Bed Frames, Cabinets">Furniture Assembly – ₹1,000 – Tables, Chairs, Bed Frames, Cabinets</option>
                                    <option value="Painting - ₹3,000 - Walls, Doors, Furniture, Custom Colors">Painting – ₹3,000 – Walls, Doors, Furniture, Custom Colors</option>
                                    <option value="Carpentry - ₹2,500 - Cabinet Installation, Wooden Repairs, Custom Projects">Carpentry – ₹2,500 – Cabinet Installation, Wooden Repairs, Custom Projects</option>
                                    <option value="General Repairs - ₹1,200 - Minor Repairs, Fixing Doors, Windows, and More">General Repairs – ₹1,200 – Minor Repairs, Fixing Doors, Windows, and More</option>
                                    <option value="Tiling & Flooring - ₹3,500 - Tile Installation, Floor Repairs, Grouting">Tiling & Flooring – ₹3,500 – Tile Installation, Floor Repairs, Grouting</option>
                                    <option value="Pressure Washing - ₹2,000 - Driveways, Siding, Patios, Decks">Pressure Washing – ₹2,000 – Driveways, Siding, Patios, Decks</option>
                                </optgroup>
                                <optgroup label="Lawn Care Services">
                                    <option value="Basic Lawn Mowing - 500 Sq Ft - ₹1,000 - Mowing, Edging, Blowing">Basic Lawn Mowing – 500 Sq Ft – ₹1,000 – Mowing, Edging, Blowing</option>
                                    <option value="Seasonal Lawn Treatment - 1 Visit - ₹2,500 - Fertilizer, Weed Control">Seasonal Lawn Treatment – 1 Visit – ₹2,500 – Fertilizer, Weed Control</option>
                                </optgroup>

                                <optgroup label="Interior Design Services">
                                    <option value="Living Room Makeover - 1 Room - ₹15,000 - Layout, Lighting, Decor">Living Room Makeover – 1 Room – ₹15,000 – Layout, Lighting, Decor</option>
                                    <option value="Bedroom Design - 1 Room - ₹12,000 - Furniture, Wall Art, Theme">Bedroom Design – 1 Room – ₹12,000 – Furniture, Wall Art, Theme</option>
                                    <option value="Kitchen Interior - Modular Setup - ₹25,000 - Cabinets, Layout, Finishing">Kitchen Interior – Modular Setup – ₹25,000 – Cabinets, Layout, Finishing</option>
                                    <option value="Office Space Planning - 500 Sq Ft - ₹30,000 - Workstations, Lighting, Branding">Office Space Planning – 500 Sq Ft – ₹30,000 – Workstations, Lighting, Branding</option>
                                    <option value="Full Home Interior - 2BHK - ₹1,20,000 - End-to-End Design & Setup">Full Home Interior – 2BHK – ₹1,20,000 – End-to-End Design & Setup</option>
                                </optgroup>

                                <optgroup label="Cleaning Services">
                                    <option value="Home Cleaning - Deep Clean - 3hr - ₹1500 - Equipment Included">Home Cleaning (Deep Clean) - 3hr - ₹1500 - Equipment Included</option>
                                    <option value="Office Cleaning - Daily - 2hr - ₹1200 - Equipment Not Included">Office Cleaning (Daily) - 2hr - ₹1200 - Equipment Not Included</option>
                                    <option value="Sofa Cleaning - Fabric - 1hr - ₹800 - Shampoo Included">Sofa Cleaning (Fabric) - 1hr - ₹800 - Shampoo Included</option>
                                    <option value="Carpet Cleaning - Steam - 2hr - ₹1000 - Equipment Included">Carpet Cleaning (Steam) - 2hr - ₹1000 - Equipment Included</option>
                                    <option value="Kitchen Cleaning - Deep - 1.5hr - ₹900 - Equipment Included">Kitchen Cleaning (Deep) - 1.5hr - ₹900 - Equipment Included</option>
                                    <option value="Bathroom Cleaning - Intensive - 1hr - ₹700 - Equipment Included">Bathroom Cleaning (Intensive) - 1hr - ₹700 - Equipment Included</option>
                                    <option value="Vehicle Cleaning - Car Interior - 1hr - ₹600 - Equipment Included">Vehicle Cleaning (Car Interior) - 1hr - ₹600 - Equipment Included</option>
                                    <option value="Disinfection - Full Home - 1.5hr - ₹1200 - Eco-Friendly">Disinfection (Full Home) - 1.5hr - ₹1200 - Eco-Friendly</option>
                                </optgroup>
                                <optgroup label="Event Planning Services">
                                    <option value="Birthday Party - 4hrs - ₹10,000 - Decoration + Catering">Birthday Party – 4hrs – ₹10,000 – Decoration + Catering</option>
                                    <option value="Wedding Planning - Full Day - ₹50,000 - Full Service Package">Wedding Planning – Full Day – ₹50,000 – Full Service Package</option>
                                    <option value="Corporate Event - 5hrs - ₹25,000 - AV Setup + Catering">Corporate Event – 5hrs – ₹25,000 – AV Setup + Catering</option>
                                    <option value="Private Gathering - 3hrs - ₹8,000 - Seating + Snacks">Private Gathering – 3hrs – ₹8,000 – Seating + Snacks</option>
                                    <option value="Kids Theme Party - 4hrs - ₹12,000 - Balloons, Games, Cake">Kids Theme Party – 4hrs – ₹12,000 – Balloons, Games, Cake</option>
                                    <option value="Cultural Program - 6hrs - ₹18,000 - Stage + Lighting + Artist">Cultural Program – 6hrs – ₹18,000 – Stage + Lighting + Artist</option>
                                </optgroup>

                                <optgroup label="Electrician Services">
                                    <option value="Fan Installation - 30min - ₹300 - Installation Only">Fan Installation – 30min – ₹300 – Installation Only</option>
                                    <option value="Switchboard Repair - 1hr - ₹500 - Spare Parts Extra">Switchboard Repair – 1hr – ₹500 – Spare Parts Extra</option>
                                    <option value="New Wiring Setup - 2hr - ₹2000 - Materials Not Included">New Wiring Setup – 2hr – ₹2000 – Materials Not Included</option>
                                    <option value="Inverter Installation - 1.5hr - ₹1200 - Basic Setup Only">Inverter Installation – 1.5hr – ₹1200 – Basic Setup Only</option>
                                    <option value="Lighting Fixture Replacement - 1hr - ₹400 - Includes Safety Check">Lighting Fixture Replacement – 1hr – ₹400 – Includes Safety Check</option>
                                    <option value="Power Backup Maintenance - 1hr - ₹700 - Diagnostics Included">Power Backup Maintenance – 1hr – ₹700 – Diagnostics Included</option>
                                </optgroup>

                                <optgroup label="Computer Repair Services">
                                    <option value="Laptop Screen Replacement - 1hr - ₹1500 - Hardware Cost Extra">Laptop Screen Replacement - 1hr - ₹1500 - Hardware Cost Extra</option>
                                    <option value="Software Installation - 30min - ₹500 - Licensed Software Only">Software Installation - 30min - ₹500 - Licensed Software Only</option>
                                    <option value="Virus & Malware Removal - 1hr - ₹700 - Free Antivirus Included">Virus & Malware Removal - 1hr - ₹700 - Free Antivirus Included</option>
                                    <option value="Data Recovery - 2hr - ₹2000 - Subject to Data Condition">Data Recovery - 2hr - ₹2000 - Subject to Data Condition</option>
                                    <option value="OS Installation & Update - 1hr - ₹800 - Backup Included">OS Installation & Update - 1hr - ₹800 - Backup Included</option>
                                    <option value="Performance Optimization - 1hr - ₹600 - Includes System Cleaning">Performance Optimization - 1hr - ₹600 - Includes System Cleaning</option>
                                </optgroup>
                                <optgroup label="Photography Services">
                                    <option value="Wedding Photography - 8hrs - ₹30,000 - 2 Photographers, Edited Album, Drone Shots">Wedding Photography – 8hrs – ₹30,000 – 2 Photographers, Edited Album, Drone Shots</option>
                                    <option value="Birthday Event Photography - 4hrs - ₹8,000 - Edited Photos, Highlights Reel">Birthday Event Photography – 4hrs – ₹8,000 – Edited Photos, Highlights Reel</option>
                                    <option value="Maternity Shoot - 2hrs - ₹6,000 - Indoor/Outdoor, 20 Edited Shots">Maternity Shoot – 2hrs – ₹6,000 – Indoor/Outdoor, 20 Edited Shots</option>
                                    <option value="Product Photography - 3hrs - ₹5,000 - White Background, 15 Items">Product Photography – 3hrs – ₹5,000 – White Background, 15 Items</option>
                                    <option value="Portrait Photography - 1hr - ₹3,000 - 10 Edited Shots, Light Setup">Portrait Photography – 1hr – ₹3,000 – 10 Edited Shots, Light Setup</option>
                                </optgroup>

                                <optgroup label="Moving Services">
                                    <option value="Local Moving - Up to 20km - ₹5,000 - 2 Movers, 1 Truck, Packing Included">Local Moving – Up to 20km – ₹5,000 – 2 Movers, 1 Truck, Packing Included</option>
                                    <option value="City-to-City Moving - Up to 300km - ₹12,000 - 3 Movers, Truck, Basic Insurance">City-to-City Moving – Up to 300km – ₹12,000 – 3 Movers, Truck, Basic Insurance</option>
                                    <option value="Full-Service Moving - Any Distance - ₹20,000+ - Packing, Loading, Unloading, Setup">Full-Service Moving – Any Distance – ₹20,000+ – Packing, Loading, Unloading, Setup</option>
                                    <option value="Office Relocation - ₹15,000 - Equipment Handling, Dismantling, Overnight Shift">Office Relocation – ₹15,000 – Equipment Handling, Dismantling, Overnight Shift</option>
                                    <option value="Single Item Move - ₹1,500 - For Sofa, Fridge, Washing Machine">Single Item Move – ₹1,500 – For Sofa, Fridge, Washing Machine</option>
                                </optgroup>

                                <optgroup label="Fitness Training">
                                    <option value="Yoga - Beginner - 1hr - ₹300 - No Equipment">Yoga (Beginner) - 1hr - ₹300 - No Equipment</option>
                                    <option value="Personal Training - Advanced - Monthly - ₹5000 - Equipment Required">Personal Training (Advanced) - Monthly - ₹5000 - Equipment Required</option>
                                </optgroup>

                                <optgroup label="Web Development">
                                    <option value="Frontend - React/HTML - ₹1500/hr - Maintenance Optional">Frontend - React/HTML - ₹1500/hr - Maintenance Optional</option>
                                    <option value="Full Stack - MERN - ₹2500/hr - API & Hosting Included">Full Stack - MERN - ₹2500/hr - API & Hosting Included</option>
                                </optgroup>

                                <optgroup label="Home Services">
                                    <option value="Electrician - 1hr - ₹400 - Tools Included">Electrician - 1hr - ₹400 - Tools Included</option>
                                    <option value="Plumber - 1hr - ₹350 - Tools Not Included">Plumber - 1hr - ₹350 - Tools Not Included</option>
                                    <option value="Carpenter - 2hr - ₹600 - Basic Tools Only">Carpenter - 2hr - ₹600 - Basic Tools Only</option>
                                </optgroup>

                                <optgroup label="Event Services">
                                    <option value="Photographer - Wedding - ₹10000/day - Album Included">Photographer - Wedding - ₹10000/day - Album Included</option>
                                    <option value="Catering - Veg - ₹500/plate - 50 pax min">Catering - Veg - ₹500/plate - 50 pax min</option>
                                    <option value="Decorator - Basic - ₹8000/event - Lights Included">Decorator - Basic - ₹8000/event - Lights Included</option>
                                </optgroup>

                                <optgroup label="Beauty & Wellness">
                                    <option value="Haircut - Home Service - ₹300 - Male">Haircut - Home Service - ₹300 - Male</option>
                                    <option value="Facial - Premium - ₹1200 - Organic Products">Facial - Premium - ₹1200 - Organic Products</option>
                                    <option value="Massage - Relaxing - ₹1500/hr - Female">Massage - Relaxing - ₹1500/hr - Female</option>
                                </optgroup>

                                <optgroup label="Electronics Repair">
                                    <option value="Mobile Repair - Screen - ₹1500 - 1hr">Mobile Repair - Screen - ₹1500 - 1hr</option>
                                    <option value="Laptop Repair - OS Install - ₹1000 - 2hr">Laptop Repair - OS Install - ₹1000 - 2hr</option>
                                    <option value="AC Repair - Gas Filling - ₹2500 - Tools Included">AC Repair - Gas Filling - ₹2500 - Tools Included</option>
                                </optgroup>

                                <optgroup label="Pet Care">
                                    <option value="Dog Walking - 30min - ₹200 - Weekdays">Dog Walking - 30min - ₹200 - Weekdays</option>
                                    <option value="Pet Grooming - Full Service - ₹1500">Pet Grooming - Full Service - ₹1500</option>
                                </optgroup>

                                <optgroup label="Music & Arts">
                                    <option value="Guitar Class - Beginner - ₹500/hr">Guitar Class - Beginner - ₹500/hr</option>
                                    <option value="Painting Class - Acrylic - ₹800/session - Material Provided">Painting Class - Acrylic - ₹800/session - Material Provided</option>
                                </optgroup>
                            </select>


                            <h2>Enter Service Description</h2>
                            <input
                                type='text'
                                placeholder='Enter service description'
                                value={serviceDescription}
                                onChange={(e) => setServiceDescription(e.target.value)}
                            />
                            <h2>Service Location</h2>
                            <input
                                type='text'
                                placeholder='Enter location'
                                value={serviceLocation}
                                onChange={(e) => setServiceLocation(e.target.value)}
                            />
                            <h2>Enter Price</h2>
                            <input
                                type='text'
                                placeholder='Enter price'
                                value={serviceCost}
                                onChange={(e) => setServiceCost(e.target.value)}
                            />
                            <h2>Enter Your Servie Image</h2>
                            <input
                                type='file'
                                accept="image/*"
                                onChange={(e) => setImageSrc(e.target.files[0])}
                            />
                            <button type='submit'>Submit</button>
                        </form>
                    </div>
                    <div className='sellerLogInImg'>
                        <img src={SellerLogin} alt='Seller Login'></img>
                    </div>
                </div>
            )}
        </>
    );
};

export default SellerForm;
