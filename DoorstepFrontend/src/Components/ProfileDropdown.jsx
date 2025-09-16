import React from 'react';
import "./Component_css/ProfileDropdown.css";
import SettingsIcon from "../Images/settingsIcon.png";
import LogoutIcon from "../Images/logoutIcon.png";
import DashboardIcon from "../Images/dashboardIcon.png";
import CartIcon from "../Images/cartIcon.png";
import ProfileIcon from "../Images/profileIcon.png";
import CustomersupportIcon from "../Images/cussupportIcon.png";
import HouseIcon from "../Images/house.png";
import ServicesIcon from "../Images/service.png";
import MaintenanceIcon from "../Images/maintenance.png";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const ProfileDropdown = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('login');
    toast.success("Logout successful! 👋", { autoClose: 2000 });
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <div className='dropDown-container'>
      <ul className='dropDown-item-container'>

        {/* Mobile-only items with icons */}
        <div className="dropDownItem mobile-only">
          <img src={HouseIcon} alt="Home" />
          <li><Link to="/home">Home</Link></li>
        </div>
        <div className="dropDownItem mobile-only">
          <img src={ServicesIcon} alt="Services" />
          <li><Link to="/services">Services</Link></li>
        </div>
        <div className="dropDownItem mobile-only">
          <img src={MaintenanceIcon} alt="Service Provider" />
          <li><Link to="/seller">Providers</Link></li>
        </div>

        {/* Common items */}
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
