import React from 'react'
import './Register.css'
import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../axiosConfig'

const Register =()=> {
  const navigate =useNavigate()
  const usernameDom = useRef()
  const firstnameDom = useRef()
  const lastnameDom = useRef()
  const emailDom = useRef()
  const passwordDom = useRef()
  
  async function handleSubmit(e){

    e.preventDefault()
    // console.log(usernameDom.current.value)
    // console.log(firstnameDom.current.value)
    // console.log(lastnameDom.current.value)
    // console.log(emailDom.current.value)
    // console.log(passwordDom.current.value)
    const usernameValue = usernameDom.current.value;
    const firstnameValue = firstnameDom.current.value;
    const lastnameValue = lastnameDom.current.value;
    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;

    if(!usernameValue || !firstnameValue || !lastnameValue || !emailValue || !passwordValue){
              alert('please provide all required information')
              return
          
          // console.log(err)
          
    }
    try {
      await axios.post('/users/register',{
        username:usernameValue,
        firstname:firstnameValue,
        lastname:lastnameValue,
        email:emailValue,
        password:passwordValue,
      });
      alert('Registered successfuly. please login');
      navigate('/login')

    } catch (error) {
      alert("something went wrong")
      console.log(error.response)
      console.log("Error response:", error.response);
      console.log("Error message:", error.message);
    }
  }
  
  return (
    <section className='register'>
      <form onSubmit={handleSubmit} >
      <div className='a'><span>Username:</span>
      <input ref={usernameDom} type="text"  placeholder='username'/>
      </div>
      <br />
      <div><span>Firstname:</span>
      <input ref={firstnameDom} type="text" placeholder='firstname' />
      </div>
      <br />
      <div><span>Lastname:</span>
      <input ref={lastnameDom} type="text" placeholder='lastname' />
      </div>
      <br />
      <div><span>Email:</span>
      <input ref={emailDom} type="email" placeholder='email' />
      </div>
      <br />
      <div><span>Password:</span>
      <input ref={passwordDom} type="password" placeholder='password'/>
      </div>
      <br />
      <button type='submit'>Register</button>
     
      </form>
      <p>Have an accoutnt already? <Link to={'/login'}>Login</Link></p>
    </section>
  )
}

export default Register