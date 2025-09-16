// src/components/Seller.js
import React from "react";
import '../Components/Component_css/Seller.css';
import { useNavigate } from "react-router-dom";

import taskIcon from '../images/task.png';
import performanceAnalyticsIcon from '../images/performance-analytics.png';
import interactionIcon from '../images/interaction.png';
import supportIcon from '../images/technical-support.png';
import SellerBg from "../images/SellerBg.png";

import CreateAccount from '../images/CreateAccount.png';
import ListItems from '../images/ListItems.jpg';
import order from '../images/order.jpg';
import Shippment from '../images/Shippment.jpg';
import payment from '../images/payment.jpg';

const Seller = () => {
  const features = [
    { title: "Service Listing Management", icon: taskIcon },
    { title: "Performance Analytics", icon: performanceAnalyticsIcon },
    { title: "Various Interaction Tools", icon: interactionIcon },
    { title: "24/7 Seller Support", icon: supportIcon },
  ];
  const navigate = useNavigate();

  return (
    <>
      <div className="seller" style={{ marginTop: "8vh" }}>
        <div className="content">
          <h1>Want to become a SELLER?</h1>
          <p>Welcome to Local Service Marketplace, an affordable and user-friendly platform designed to help you showcase your services and grow your business with ease. We provide all the necessary tools and resources to get you started quickly, ensuring that your services reach local customers in no time.</p> <p>Whether you're an individual offering services or a small business, our platform makes it simple to connect with your target audience, manage bookings, and receive feedback, all in one place.</p> <p>Maximize your business potential with us!</p>
          <div className="cta-form">
            {/* <input type="email" placeholder="Email address" /> */}
            <span>Are you ready to create an account & proceed with the registration process ? Click Here 👉</span>
            <button className="cta-btn" onClick={() => navigate('/sellerForm')}>CreateAccount</button>
          </div>

          <p className="disclaimer">Try us free | No credit card required | Cancel anytime</p>

        </div>
        <div className="photo">
          <img src={SellerBg} alt="Seller Background" />
        </div>


        {/* Features Section */}
        <div className="features">
          <ul>
            {features.map((feature, index) => (
              <li key={index} className="feature-item">
                <img src={feature.icon} alt={feature.title} />
                <p>{feature.title}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Info Section */}
      <div className="info">
        <h1>Your journey on DoorStep</h1>
        <p>Starting your online business with DoorStep is easy.
          With over 14 lakh+ sellers trusting DoorStep, we help you
          grow your business by providing all the tools and support you
          need. From setting up your account to managing sales and customer
          relationships, we ensure a smooth process for you.</p>
        <p>DoorStep offers a large customer base, enabling you to reach
          more buyers while focusing on your products and services. Our
          platform simplifies business management and makes success
          achievable for every seller.</p> <p>With powerful insights,
            secure payments, and dedicated support, your journey with
            DoorStep is designed for growth.</p>
        <div className="steps">
          <div className="step1">
            <img src={CreateAccount} alt="Create Account" />            <h3>Create</h3>
            <p>Register in just 10 mins with valid GST, address, & bank details</p>
          </div>
          <div className="step1">
            <img src={ListItems} alt="List Items" />
            <h3>List</h3>
            <p>List your products (min 1 no.) that you want to sell on DoorStep.</p>
          </div>
          <div className="step1">
            <img src={order} alt="Order" />
            <h3>Orders</h3>
            <p>Receive orders from over 45 crore+ DoorStep customers.</p></div>
          <div className="step1">
            <img src={Shippment} alt="Shippment" />
            <h3>Shipment</h3>
            <p>Doorstep ensures stress free delivery of your products</p></div>
          <div className="step1">
            <img src={payment} alt="Payment" />
            <h3>Payment</h3>
            <p>Receive payment 7 days* from the date of dispatch of your order</p></div>
        </div>
      </div>
    </>
  );
};

export default Seller;
