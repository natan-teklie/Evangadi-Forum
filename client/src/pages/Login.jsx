import axios from '../axiosConfig'
import React, { useContext, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'
import { AppState } from '../App'

const Login = () => {
  const navigate = useNavigate()
  const emailDom = useRef()
  const passwordDom = useRef()
  const {setUser} = useContext(AppState)

  async function handleSubmit(e){
    e.preventDefault()
    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;
    if(!emailValue || !passwordValue){
      alert('please provide all required information')
      return
    }

    try {
      const {data} = await axios.post('/users/login',{
        email: emailValue,
        password:passwordValue,
      })
      alert('login successful')
      localStorage.setItem('token', data.token)
      setUser(data)

      navigate('/')
      
      // console.log(data)
    } catch (error) {
      alert(error?.response?.data?.msg)
    }
    
  }
  return (
    
      <section  className='login'>
      <form onSubmit={handleSubmit}>
        <div><span>Email:</span>
        <input ref={emailDom} type="email" placeholder='email'/></div>
        <div><span>Password:</span>
        <input ref={passwordDom} type="password" placeholder='password'/></div>
       
        <button type='submit'>Login</button>
        <br />
        <p><a href="">Forgot password?</a></p>
       
      </form>
      <p>don't have an account? <Link to={'/register'}>Register</Link> </p>
    </section>
    
  )
}

export default Login