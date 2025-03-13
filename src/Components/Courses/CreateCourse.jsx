import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { tokenContext } from './../../Context/GlobalContext';
import { toast } from "react-toastify";


export default function CreateCourse() {
    let data = useLocation({})
    let navigate = useNavigate()
    data = data.state
    let {token} = useContext(tokenContext)
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        duration: "",
        price: "",
        minimumSkill: "beginner",
        scholarshipAvailable: "yes"
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        if(name == "price"){
            setFormData((prev) => ({ ...prev, [name]: Number(value) }));

        }else if(name == "scholarship"){
            setFormData((prev) => ({ ...prev, [name]: e.target.checked }))
            

        }else{
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        await fetch(`http://localhost:5000/api/v1/bootcamps/${data.id}/courses`,{
            method : "POST",
            headers :{"Content-Type" : "application/json","Authorization" : `Bearer : ${token}`},
            body : JSON.stringify(formData)
        })
        toast.success('Course Created Successfull ..!!!', {
                      
                          position: "top-center",
                          autoClose: 2000,
                          hideProgressBar: false,
                          closeOnClick: false,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "light",
                          // transition: Bounce,
                          });

        
        navigate("/allbootcamps")
      };
    
      return (
        <div className="flex items-center justify-center min-h-screen ">
          <form onSubmit={handleSubmit} className="bg-gray-200 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold text-center text-black mb-4">Create Course</h2>
            <input 
              type="text" 
              name="title" 
              placeholder="Enter Title Here" 
              value={formData.title} 
              onChange={handleChange} 
              className="w-full p-2 mb-3 border rounded" 
              required
            />
            <textarea 
              name="description" 
              placeholder="Write some description" 
              value={formData.description} 
              onChange={handleChange} 
              className="w-full p-2 mb-3 border rounded" 
              required
            />
            <input 
              type="text" 
              name="duration" 
              placeholder="Duration of this course" 
              value={formData.duration} 
              onChange={handleChange} 
              className="w-full p-2 mb-3 border rounded" 
              required
            />
            <input 
              type="text" 
              name="price" 
              placeholder="Enter price of course" 
              value={formData.price} 
              onChange={handleChange} 
              className="w-full p-2 mb-3 border rounded" 
              required
            />
            <select 
              name="minimumSkill" 
              value={formData.level} 
              onChange={handleChange} 
              className="w-full p-2 mb-3 border rounded"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
            <div className="mb-4">
              <label className="mr-2" htmlFor="scholarshipAvailable">Scholarship Available:</label>
              <input 
                type="radio" 
                name="scholarshipAvailable" 
                value="yes" 
                onChange={handleChange} 
              /> Yes
              <input 
                type="radio" 
                name="scholarshipAvailable" 
                value="no" 
                onChange={handleChange} 
                className="ml-2"
              /> No
            </div>
            <button type="submit" className="w-full bg-black text-white p-2 rounded">Create Course</button>
          </form>
        </div>
          );
}
