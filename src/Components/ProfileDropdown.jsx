import React from 'react';
import "./Component_css/ProfileDropdown.css";
import SettingsIcon from "../Images/settingsIcon.png";
import LogoutIcon from "../Images/logoutIcon.png";
import DashboardIcon from "../Images/dashboardIcon.png";
import CartIcon from "../Images/cartIcon.png";
import ProfileIcon from "../Images/profileIcon.png";
import { Link } from 'react-router-dom';
import CustomersupportIcon from "../Images/cussupportIcon.png";
import {toast} from 'react-hot-toast';
const ProfileDropdown = () => {
    const handleLogout = () => {
        // Remove login from localStorage
        localStorage.removeItem('login');
        // delete req.session.user;
        
        toast.success("Logout successful! 👋", { autoClose: 2000 });
        // Redirect to login page
        setTimeout(() => {
            navigate('/signin');
        }, 1000); // Delay navigation so toast can show
        
      };
    return (
        <div className='dropDown-container'>
            <ul className='dropDown-item-container'>
                <div className="dropDownItem">
                    <img src={ProfileIcon} alt='' />
                    <li><Link to="/admin">Admin</Link></li>
                </div>
                <div className="dropDownItem">
                    <img src={CartIcon} alt='' />
                    <li><Link to="/cart">Cart</Link></li>
        
                </div>
                <div className="dropDownItem">
                    <img src={DashboardIcon} alt='' />
                    <li><Link to='/dashboard'>Dashboard</Link></li>
                </div>
                {/* <div className="dropDownItem">
                    <img src={SettingsIcon} alt='' />
                    <li>Settings</li>
                </div> */}
                <div className="dropDownItem">
                    <img src={CustomersupportIcon} alt='' />
                    <li><Link to='/customersupport'>Help</Link></li>
                </div>
                <div className="dropDownItem">
                    <img src={LogoutIcon} alt='' />
                    <li><Link onClick={handleLogout} to="/" >Logout</Link></li>
                </div>
            </ul>
        </div>
    )
}
export default ProfileDropdown;