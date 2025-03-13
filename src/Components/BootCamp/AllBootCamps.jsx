import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { tokenContext } from '../../Context/GlobalContext'

export default function AllBootCamps() {
  const [cards, setCards] = useState([])
  let {userDetails}=useContext(tokenContext)

  
  const result = async () => {
    let data = await fetch("http://localhost:5000/api/v1/bootcamps")
    data = await data.json()
    setCards(data.data)
  }

  useEffect(() => {
    result()
  
  }, [])

console.log(localStorage.getItem('role'));

  return (
   <div className='bg-[#f0f0f0] border-1 text-[#f0f0f0]'> { localStorage.getItem('role') == 'publisher'&& 
    <section className='w-full bg-[#f0f0f0] '>
      <aside className='mx-auto w-[80%] flex justify-end '>
        <NavLink to="/createbootcamp">
          <button className='py-2 px-2 bg-[blue] mt-5 mb-3 text-white font-bold rounded-[5px] cursor-pointer'>
            Create BootCamp
          </button>
        </NavLink>
      </aside>
    </section>}

    <section className='flex flex-wrap gap-x-5 w-[70%] mt-6 mx-auto'>
      {cards.map((x) => (
        <article key={x._id} className='  bg-white shadow-md border-gray-300 p-1 justify-between rounded-lg mb-3'>
          <img src={x.photo} alt="" className='h-[150px]' />
          <NavLink to="/bootcampdetails" state={x}>
          
           <center>
           <button className=' cursor-pointer  bg-[#f0f0f0] text-[orange] rounded-lg h-[40px] w-[90px] mt-5'>
              View More
            </button>
           </center>
          </NavLink>
           <br />
         {localStorage.getItem('role')=='publisher' &&  <NavLink to="/createcourse" state={x}>
           <center>
              <button className='bg-[blue] text-white cursor-pointer rounded-lg h-[40px] w-[150px]'>
                  Create Course
              </button>
           </center>
          </NavLink>}
          <br />
         
          {/* <NavLink to={`/editbootcamp/${x._id}`} state={x}>
            <button className='bg-[orange] text-white cursor-pointer pl-[6px] rounded-lg h-[40px] w-[150px]'>
              Edit Bootcamp
            </button>
          </NavLink> */}
          <br />
        </article>
        
      ))}
      
    </section>
  </div>
  )
}
