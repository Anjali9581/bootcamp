import { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaImage } from "react-icons/fa";
import { MdArrowDropDown } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoEyeOffOutline } from "react-icons/io5";


export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    avatar: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleChange = (e) => {
    let{name,value} = e.target
    setFormData({ ...formData, [name]:value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    let data = JSON.stringify(formData)
    console.log(data);
    console.log("Payload being sent:", JSON.stringify(formData));

    let result =await fetch("http://localhost:5000/api/v1/auth/register",{
        method : "POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:(data)
    })
    
  };




  return (
    <>
    <h1 className="text-center font-bold mb-3 ml-10 mt-7">SIGN UP</h1>
    <div className="flex items-center justify-center h-[550px] bg-white">
         
      <form onSubmit={handleSubmit} className="bg-[#111] p-6 rounded-lg shadow-lg w-150 h-[550px]">
       
        
        <label className="text-white " htmlFor="name">Enter Name</label>
        <div className="flex items-center bg-[#1f1f1f] p-2 rounded-md mb-3 mt-3">
          <FaUser className="text-white mr-2" />
          
          <input
          required
            type="text"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
            className="bg-transparent outline-none text-white w-full"
          />
        </div>
        <label className="text-white " htmlFor="email">Enter Email</label>
        <div className="flex items-center bg-[#1f1f1f] p-2 rounded-md mb-3 mt-3">
          <FaEnvelope className="text-white mr-2" />
          <input
           required
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            className="bg-transparent outline-none text-white w-full"
          />
        </div>
        <label className="text-white " htmlFor="password">Enter Password</label>
        <div className="flex items-center bg-[#1f1f1f] rounded-md mb-3 h-10 mt-3">
          <FaLock className="text-white mr-3 ml-2" />
          
          <input
           required
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            className="bg-transparent outline-none text-white w-full"
          />
           <span
                        className=" mr-[2%]"
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
        </div>
        <label className="text-white " htmlFor="role">Select Role</label>
        <div className="flex items-center bg-[#1f1f1f] p-2 rounded-md mb-3 relative mt-3">
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="bg-transparent outline-none text-[#e1e1e1] w-full appearance"
          >
            <option value="" disabled>Select Role</option>
            <option value="user">user</option>
            <option value="publisher">Publisher</option>
          </select>
          <MdArrowDropDown className="absolute right-3 text-white" />
        </div>
        <label className="text-white " htmlFor="avatar">Avatar</label>
        <div className="flex items-center bg-[#1f1f1f] p-2 rounded-md mb-3 mt-3">
          <FaImage className="text-white mr-2" />
          <input
            type="text"
            name="avatar"
            placeholder="Enter Avatar URL"
            value={formData.avatar}
            onChange={handleChange}
            className="bg-transparent outline-none text-white w-full"
          />
        </div>

        <button className="w-full bg-[yellow] text-gray-900 font-semibold py-2 rounded-md hover:bg-[yellow]">
         <NavLink to="/login"> Sign Up</NavLink>
        </button>
        <p className="text-white text-center mt-3">
          Already have an account? <span className="text-[yellow] cursor-pointer"><NavLink to="/login" >Login</NavLink></span>
        </p>
      </form>
    </div>
    </>
  );
}