import React, { useState } from 'react'
import { FaUserAlt, FaMailBulk, FaPhone } from "react-icons/fa"
import { MdLockPerson } from "react-icons/md";
import "../Components/Component_css/LogIn.css";
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import Card from './ActualComponent/Card';
import { toast } from 'react-hot-toast';
const LogIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // For redirecting after successful signup
    const [loading, setLoading] = useState(false); // loading
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        axios.post(`${import.meta.env.VITE_BACKEND_URL}/signin`, { email, password })
        .then(result => {
            localStorage.setItem('loggedInEmail', email);
        
            if (result.data === "success") {
                toast.success("Log In Successful! 🎉", { autoClose: 2000 });
                localStorage.setItem('login', true);
                navigate('/home');
            } else if (result.data === "password is incorrect") {
                toast.error("Incorrect password.");
            } else if (result.data === "no record found") {
                toast.error("No account found with this email.");
            } else {
                toast.error("Unexpected response.");
            }
        })
        
            .catch(err => {
                console.log(err);
                toast.error("Something went wrong!");
            })
            .finally(() => {
                setLoading(false);
            });
    }



    return (
        <>
            <div className="check"></div>
            <div className='wrapper'>

                <div className="form-box login">

                    <form onSubmit={handleSubmit}>

                        <h1>Login</h1>

                        <div className="input-box">
                            <FaUserAlt className='icon' />
                            <input
                                type='email'
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='Email'
                                name='email'
                                value={email}
                                required />
                        </div>

                        <div className="input-box">
                            <MdLockPerson className='icon' />
                            <input
                                type='password'
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='Password'
                                name='password'
                                value={password}
                                required />
                        </div>

                        <div className="remember-forgot">
                            <label>
                                <input type="checkbox" />Remember me</label>
                            <a href="#">Forgot Password?</a>
                        </div>

                        {/* <button type="submit">Login</button> */}
                        <button type="submit" disabled={loading}>
                        {loading ? <div className="loader"></div> : <button type="submit">Login</button>}

                        </button>


                        <div className="register-link">
                            <p>Don't have an account? <Link to="/logup">Sign Up </Link></p>
                        </div>

                    </form>

                </div>
            </div>

        </>
    )
}

export default LogIn







