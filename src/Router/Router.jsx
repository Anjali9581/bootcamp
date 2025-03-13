import { createBrowserRouter } from "react-router-dom";


import App from "../App";
import SignUp from "../Components/Auth/Signup";
import Login from "../Components/Auth/Login";
import AllBootCamps from "../Components/BootCamp/AllBootCamps";
import CreateBootCamp from "../Components/BootCamp/CreateBootCamp";
import BootCampDetails from "../Components/BootCamp/BootCampDetails";
import EditBootCamp from "../Components/BootCamp/EditBootCamp";
import CreateCourse from "../Components/Courses/CreateCourse";
import AllCourses from "../Components/Courses/AllCourses";

import EditCourses from "../Components/Courses/EditCourses";
import PrivateRoute from './../Context/PrivateRoute';



export let routes=createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
               
                {
                    path:"/signUp",
                    element:<SignUp/>
                },
                {
                    path:"/login",
                    element:<Login/>
                },
                {
                    path:"/allbootcamps",
                    element: <PrivateRoute>
                        <AllBootCamps/>
                    </PrivateRoute>
                },
                {
                    path:"/createbootcamp",
                    element:<CreateBootCamp/>
                },
                {
                    path : "/bootcampdetails",
                    element : <BootCampDetails/>
                },
               {
                path:"/editbootcamp",
                element:<EditBootCamp/>
               },
               {
                path:"/createcourse",
                element:<CreateCourse/>
               },
               {
                path:"/allcourses",
                element:<AllCourses/>
               },
               {
                path:"/editcourses/:id",
                element:<EditCourses/>
               }
              
                

        ]
    }
    
   
])


