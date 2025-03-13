import React from 'react'
import { useNavigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {
    let navigate = useNavigate()
  return (
     localStorage.getItem('role')!==null ?children: location.assign('/login')
  )
}

export default PrivateRoute