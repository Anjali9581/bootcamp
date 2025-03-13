import React, { useContext, useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { CiLock } from "react-icons/ci";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoEyeOffOutline } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import { tokenContext } from "../../Context/GlobalContext";

const Login = () => {
    let navigate =useNavigate()
  let {token , setToken , userDetails , setuserDetails}=useContext(tokenContext)
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleChange = (e) => {
    
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
const handleSubmit= async (e)=>{
    e.preventDefault();
    setState({
      email: "",
      password: "",
    })
    console.log(state);
    let data =  JSON.stringify(state)
    let result = await fetch("http://localhost:5000/api/v1/auth/login",{
      method:"POST",
      headers :{"Content-Type":"application/json"},
      body:data 

    })
    navigate("/allbootcamps")   
    let result1 = await result.json()
    console.log(result1);
    await setToken(result1.token)
     localStorage.setItem('role',result1.user.role)
    
}
let {email,password}=state
  return (
    <>
    <h1 className="text-center font-bold mb-3 ml-10">LOGIN</h1>
      <div className=" w-[400px] ml-[36%] rounded-lg h-auto bg-[#111111] p-4">
        <form onSubmit={handleSubmit}>
          <div className=" mb-2 ">
            <label className="text-white" htmlFor="email">
              Email
            </label>
            <article className="flex flex-row items-center bg-[#1f1f1f]  w-[95%] mx-auto">
              <span>
                <HiOutlineMail color="white" size={14}   />
              </span>
              <span className="ml-[7px] ">
                <input
                value={email}
                onChange={handleChange}
                  className="outline-none placeholder:text-[#a1a1a1] bg-transparent text-white w-[320px]"
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Enter email"
                />
              </span>
            </article>
          </div>

          <div>
            <label className="text-white" htmlFor="password">
              Password
            </label>
            <article className="flex flex-row items-center bg-[#1f1f1f] w-[95%] mx-auto ">
              <span>
                <CiLock color="white" />
              </span>
              <span className="ml-[7px]">
              
                <input
                value={password}
                onChange={handleChange}
                  className="outline-none placeholder:text-[#a1a1a1] text-white"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id=""
                  placeholder="Enter password"
                />
              </span>
              <span
              className="ml-[35%]"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword ? (
                     <MdOutlineRemoveRedEye color="white" />
                 
                ) : (
                    <IoEyeOffOutline color="white" />
                )}
              </span>
            </article>
          </div>
          <div className="bg-[yellow] w-[95%] mx-auto rounded-lg text-center p-1 mt-5">
          <button type="submit" >Login</button>
          </div>
        
        </form>
        <div className="text-white text-center">
            <h3>Don't have account ? <span className="text-[yellow]"><NavLink to='/signup'>Sign Up</NavLink></span> </h3>
        </div>
      </div>
    </>
  );
};

export default Login;