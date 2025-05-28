import React ,{useState} from 'react'
import "../Components/Component_css/LogUp.css";
import { FaUserAlt,FaMailBulk ,FaPhone} from "react-icons/fa"
import { MdLockPerson } from "react-icons/md";
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import {toast} from 'react-hot-toast';
const LogUp = () => {

const [name, setName] = useState(''); // Initialize with empty string
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [confirmPassword,setConfirmPassword] = useState('');
const [phone,setPhone] = useState('')
const navigate = useNavigate(); // For redirecting after successful signup

  const handleSubmit = (e) => {
      e.preventDefault();
      
      axios.post('http://localhost:5000/signup', { name, email, password,confirmPassword,phone })
      .then(result => {
          // console.log(result);
          toast.success("You’ve signed up successfully! 🎉", { autoClose: 2000 });
          navigate('/');
      })
      .catch(err => {
          console.log(err);
      });
  }


  return (
    <>
    <div className="check"></div>
    <div className='wrapper-reg'>
      <div className="form-box register">
        
        <form onSubmit={handleSubmit}>
          
          <h1>Register Yourself</h1>

          <div className="input-box">
            <FaUserAlt className='icon'/>
            <input type='text' // Use type="text" for name
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Name'
                    name='name'
                    value={name} // Always provide value for controlled components
                    required />
          </div>
          
          <div className="input-box">
            <FaMailBulk className='icon' />
            <input type='email'
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Email'
                    name='email'
                    value={email} 
                    required 
             />
          </div>
          
          <div className="input-box">
            <MdLockPerson className='icon'/>
            <input type='password'
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Password'
                    name='password'
                    value={password}
                    required />
          </div>

          <div className="input-box">
            <MdLockPerson className='icon'/>
            <input type="password" 
            onChange={(e) => setConfirmPassword(e.target.value)}
            name='confirmPassword'
            value={confirmPassword}
            placeholder=' Confirm Password *' 
            />
          </div>
                    
                    
          <div className="input-box">
            <FaPhone className='icon'/>
            <input type="tel" 
            onChange={(e) => setPhone(e.target.value)}
            name='phone'
            value={phone}
            placeholder='Phone' 
           />
          </div>

          <div className="remember-forgot">
            <label>
            <input type="checkbox" />I agree to the <a href=''>terms and consition.</a></label> 
          </div>

          <br></br>
          
          <button type="submit">Register</button>
          
          <div className="register-link">
            <p>Already have an account? <Link to='/'>Sign In</Link></p>
          </div>
          
        </form>  
      </div>
    
    </div>
    </>
  )
}

export default LogUp
