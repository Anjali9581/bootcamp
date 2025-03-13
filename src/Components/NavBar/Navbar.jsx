import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const Navbar = () => {
  let navigate = useNavigate()
  return (
    <div className='flex justify-end gap-4 h-[60px] w-full font-bold bg-[blue] text-white items-center'>
     <div className='mx-6 flex justify-end gap-4'>
     
      <NavLink to='/allbootcamps'> All BootCamps</NavLink>
      {localStorage.getItem('role')== null&&<NavLink to='/signUp'>Sign Up</NavLink>}
      {localStorage.getItem('role')== null ?<NavLink to='/login'>Login</NavLink> :<button onClick={()=>{
        localStorage.removeItem('role')
        console.log("logut successfull");
        navigate('/login')
      }}>Logout</button> }
     </div>
    </div>
  )
}

export default Navbar
