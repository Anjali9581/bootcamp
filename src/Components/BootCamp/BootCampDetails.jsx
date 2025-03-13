import React, { useContext } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { tokenContext } from '../../Context/GlobalContext';
import { RiArrowGoBackFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";

export default function BootCampDetails() {
    let {token}=useContext(tokenContext)
    console.log(token);

 let navigate =useNavigate()
  let location = useLocation({})
  console.log(location);
  let data = location.state
  let deleteBootCamp=async ()=>{
    await fetch(`http://localhost:5000/api/v1/bootcamps/${data.id}`,{
        method : "delete",
            headers : {"Authorization":`Bearer ${token}`},
    })
    await navigate("/allbootcamps")
  }
  return (
         <div className=' bg-[#f0f0f0] h-[100vh]'>
         
        <NavLink to="/allbootcamps">
                      <button className='py-2 px-5 mx-10 my-10 bg-black text-white cursor-pointer font-semibold rounded-md hover:bg-gray-800 transition'>
                          <RiArrowGoBackFill />
                      </button>
        </NavLink>
      <article className='   w-[90%] mx-auto  flex   bg-white shadow-md border-gray-300 p-4  justify-between rounded-lg'>
        
      <div className=' '><img src={data.photo} alt="" srcset="" className='h-[250px] w-[300px] float-left ml-[30px]'/></div>
      <div className=' w-[70%] flex flex-col justify-center'>
          <aside className=' flex flex-col gap-2'>
          <div className=' border-b-1'><h1><b>Mentor Name </b>:{data.name}</h1></div>   
          <div className=' border-b-1'><h3><b>Email : </b>{data.email}</h3></div>
          <div className=' border-b-1'><p><b>Description : </b>{data.description}</p></div>
          <div className=' border-b-1'><h1><b>Course : </b>{data.careers}</h1></div>
          <div className=' border-b-1'><h1><b>Address : </b>{data.address}</h1></div>

          </aside>
        <div className='flex justify-start gap-x-10 items-center mt-3'>
          {/* <NavLink to="/allbootcamps"><button className='py-[10px] cursor-pointer px-[32px] bg-[skyblue] text-white font-bold rounded-[10px]'>Back</button></NavLink> */}
          {localStorage.getItem('role')=='publisher' &&  <>
          <NavLink to={`/editbootcamp` } state={location.state}>
            <button  className='py-2 px-5 bg-black text-white font-semibold cursor-pointer rounded-md hover:bg-gray-800 transition'>
                                              <FaUserEdit />
            </button>         
           </NavLink>
          <NavLink >
             {/* <button className='py-[10px]  px-[32px] bg-[red] text-white font-bold cursor-pointer rounded-[10px]'>Delete</button> */}
             <button onClick={deleteBootCamp}  className='py-2 px-5 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition cursor-pointer'>
             <MdDelete />
             </button>
             </NavLink>
            </>}
            <NavLink to="/allcourses" state={data} > <button className='px-[30px] py-[10px] bg-[blue] text-white font-bold cursor-pointer rounded-[10px]'>View Course</button></NavLink>

        </div>
      </div>
      
    </article>

         </div>
  )
}