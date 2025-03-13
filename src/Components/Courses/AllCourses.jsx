import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { MdDelete } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { RiArrowGoBackFill } from "react-icons/ri";
import { toast } from 'react-toastify';

export default function AllCourses() {
    let location = useLocation()
    let navigate = useNavigate()
    let bootcamp = location.state
    let [course, setCourse] = useState([])

    const deleteCourse = async (id) => {
        await fetch(`http://localhost:5000/api/v1/bootcamps/${bootcamp._id}/courses/${id}`, { method: "DELETE" })
        toast.error('Course Deleted Successfully ..!!!', {
            position: "top-center",
            autoClose: 2000,
            theme: "light",
        });

        navigate("/allbootcamps")
    }



    const getCourses = async () => {
        let result = await fetch(`http://localhost:5000/api/v1/bootcamps/${bootcamp._id}/courses`)
        result = await result.json()
        setCourse(result.data)
    }

    useEffect(() => {
        getCourses()
    }, [])

    return (
        <div className='min-h-screen bg-[#f0f0f0] py-10'>
            <NavLink to="/allbootcamps">
                <button className='py-2 px-5 mx-20 bg-black text-white cursor-pointer font-semibold rounded-md hover:bg-gray-800 transition'>
                    <RiArrowGoBackFill />
                </button>
            </NavLink>

            <h1 className='text-center text-3xl font-bold text-blue-700 mb-8'>
                Courses offered by {bootcamp.name}
            </h1>

            <section className='flex flex-wrap gap-6 justify-center'>
                {course.length > 0 ? course.map((x) => (
                    <article key={x._id} className='h-auto w-[25vw] bg-white shadow-md border-gray-300 p-4 flex flex-col justify-between rounded-lg'>
                        <div className='space-y-2'>
                            <h2 className='text-xl font-semibold text-orange-400 uppercase'>
                                {x.title}
                            </h2>
                            <p className='text-gray-700'><strong>Description:</strong> {x.description}</p>
                            <p className='text-gray-700'><strong>Duration:</strong> {x.duration}</p>
                            <p className='text-gray-700'><strong>Minimum Skill:</strong> {x.minimumSkill}</p>
                            <p className={`font-semibold ${x.scholarshipAvailable ? 'text-green-600' : 'text-red-600'}`}>
                                Scholarship: {x.scholarshipAvailable ? 'Available' : 'Not Available'}
                            </p>
                            <p className='text-gray-700'><strong>Price:</strong> ${x.price}</p>
                        </div>

                        <div className='flex justify-center gap-3 mt-4'>
                            {localStorage.getItem('role') === 'publisher' ? (
                                <>
                                    <NavLink to={`/editcourses/${bootcamp._id}`} state={x}>
                                        <button className='py-2 px-5 bg-black text-white font-semibold cursor-pointer rounded-md hover:bg-gray-800 transition'>
                                            <FaUserEdit />
                                        </button>
                                    </NavLink>

                                    <button
                                        onClick={() => deleteCourse(x._id)}
                                        className='py-2 px-5 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition cursor-pointer'>
                                        <MdDelete />
                                    </button>
                                </>
                            ) : localStorage.getItem('role') === 'user' ? (
                                <button
                                    onClick={() => enrollCourse(x._id)}
                                    className='py-2 px-5 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition cursor-pointer'>
                                    Enroll
                                </button>
                            ) : null}
                        </div>
                    </article>
                )) : (
                    <div className='text-gray-600 text-lg'>
                        No courses available for this bootcamp.
                    </div>
                )}
            </section>
        </div>
    )
}
