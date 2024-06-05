import React, { useContext } from 'react'
import './Home.css'
import { AppState } from '../App'

const Home = () => {
  const {user} = useContext(AppState)
  // console.log(contecc)
  return (
    <div className='home'>
      <h1>Home</h1>
     <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <h4>Well come: {user.username}</h4>
      
      


    </div>
  )
}

export default Home