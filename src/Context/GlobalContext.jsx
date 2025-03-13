import { createContext, useState } from "react";

export let tokenContext = createContext();

import React from 'react'

const GlobalContext = ({children}) => {
    let [token , setToken] =useState()
    let [userDetails , setuserDetails] = useState({
        role : "user"
    })
  return (
    <tokenContext.Provider value={{token,setToken,userDetails,setuserDetails}}>
        {children}
    </tokenContext.Provider>
  )
}

export default GlobalContext