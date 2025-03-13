
import React, {  useEffect, useState } from 'react'
import { useContext } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { tokenContext } from '../../Context/GlobalContext'

const EditBootCamp = () => {
    let navigate =useNavigate()
    let {id}=useParams();
    let location = useLocation()
     let {token,setToken}=useContext(tokenContext)
     console.log(location);
   let data = location.state


         let [state,setState]=useState({
                name:"",
                description:"",
                email:"", 
                website:"",
              address:"",
            careers:"",
            averageRating:0,
      photo : ""})

      useEffect(() => {
        if (location?.state) {
            setState(location.state)
        }
    }, [])
            let handleChange=(e)=>{
                  setState({...state,[e.target.name]:e.target.value})
        
            }
            
       
          let handleSubmit= async (e)=>{
              e.preventDefault();
              console.log(state);
              console.log(token);
              
              let _result = JSON.stringify(state)
              let result = await fetch(`http://localhost:5000/api/v1/bootcamps/${data?.id}`,{

                method : "PUT",
                headers : {"Content-Type" : "application/json","Authorization":`Bearer ${token}`},
                body : _result
              })
              await navigate("/allbootcamps")
          }
           
  return (
    <>
     <div>
    <div className="bg-gray-200 p-6 rounded-lg shadow-lg w-96 mx-auto mt-[50px]">
        <h2 className="text-xl font-semibold text-center text-teal-600 mb-4">Edit BootCamp</h2>
        <form action="#" method="POST" className="space-y-3" onSubmit={handleSubmit}>
            <input type="text" placeholder="Enter name here" className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" name='name' value={state?.name} onChange={handleChange}/>
            <input type="email" placeholder="Enter email" className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" name='email' value={state?.email} onChange={handleChange}/>
            <textarea placeholder="Write some description" className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" name='description' value={state?.description} onChange={handleChange}></textarea>
            <input type="text" placeholder="Enter a website" className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" name='website' value={state.website} onChange={handleChange}/>
            <input type="text" placeholder="Enter your address" className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" name='address' value={state.address} onChange={handleChange}/>
            <input type="number" placeholder="Enter your averagerating" className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" name='averageRating' onChange={handleChange}/>
            <select className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" value={state?.careers} name='careers' onChange={handleChange}>
            <option value="web development">Web Development</option>
            <option value="react development">React Development</option>
            <option value="fullstack development">FullStack Development</option>
            <option value="java development">Java Development</option>
            <option value="python development">Python Development</option>
            <option value="android development">Android Development</option>
            <option value="ux/ui development">UI/UX Development</option>
            <option value="business">Business</option>
            <option value="others">Others</option>
            </select>
            <input type="text" placeholder="Image URL" className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" name='photo' onChange={handleChange}/>
            <button className="w-full p-2 bg-teal-500 text-white font-semibold rounded-md hover:bg-teal-600">Edit BootCamp</button>
        </form>
        </div>


    </div>
    
    </>
  )
}

export default EditBootCamp

