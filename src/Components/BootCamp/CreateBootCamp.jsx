import React, { useContext, useState } from 'react'
import { tokenContext } from '../../Context/GlobalContext'
import { useNavigate } from 'react-router-dom'

const CreateBootCamp = () => {
    let navigate =useNavigate()
    let {token,setToken}=useContext(tokenContext)
     let [state,setState]=useState({
            name:"",
            description:"",
            email:"", 
            website:"",
          address:"",
        careers:"",
        averageRating:0,
  photo : ""})
    
        let handleChange=(e)=>{
            let {name,value}=e.target
            if(name == "averageRating"){
              setState({...state,[name]:(value)})
            }else{
              setState({...state,[name]:value})
            }
    
    
        }
        let handleSubmit= async (e)=>{
            e.preventDefault();
            console.log(state);
            let data = JSON.stringify(state)
            let result =  await fetch("http://localhost:5000/api/v1/bootcamps",{
              method : "POST",
              headers : {"Content-Type" : "application/json","Authorization":`Bearer ${token}`},
              body : data
            })
            await navigate("/allbootcamps")
            
        }
  return (
    <div>
    <div className="bg-gray-200 p-6 rounded-lg shadow-lg w-96 mx-auto mt-[50px]">
        <h2 className="text-xl font-semibold text-center text-teal-600 mb-4">Create BootCamp</h2>
        <form action="#" method="POST" className="space-y-3" onSubmit={handleSubmit}>
            <input type="text" placeholder="Enter name here" className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" name='name' value={state.name} onChange={handleChange}/>
            <input type="email" placeholder="Enter email" className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" name='email' value={state.email} onChange={handleChange}/>
            <textarea placeholder="Write some description" className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" name='description' value={state.description} onChange={handleChange}></textarea>
            <input type="text" placeholder="Enter a website" className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" name='website' value={state.website} onChange={handleChange}/>
            <input type="text" placeholder="Enter your address" className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" name='address' value={state.address} onChange={handleChange}/>
            <input type="number" placeholder="Enter your averagerating" className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" name='averageRating' onChange={handleChange}/>
            <select className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500" value={state.careers} name='careers' onChange={handleChange}>
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
            <button className="w-full p-2 bg-teal-500 text-white font-semibold rounded-md hover:bg-teal-600">Create BootCamp</button>
        </form>
        </div>


    </div>
  )
}

export default CreateBootCamp