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

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('https://doorstep-backend-yesa.onrender.com/signin', { email, password })
            .then(result => {
                var state = 0;
                // console.log(result);
                localStorage.setItem('loggedInEmail', email);
                // console.log(localStorage.getItem('loggedInEmail'));

                if (result.data === "success") {
                    // state = 1;
                    // console.log(state)
                    toast.success("Log In Successful! 🎉", { autoClose: 2000 });
                    <Card user={email} />
                    localStorage.setItem('login', true);
                    // window.alert("Log In Sucessful");
                    navigate('/home');

                } else {
                    // state = 0;
                    // console.log(state)

                    window.alert("Wrong Credential");
                }


            })
            .catch(err => {

                console.log(err);
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

                        <button type="submit">Login</button>

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







