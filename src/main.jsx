import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { routes } from './Router/Router'
import GlobalContext from './Context/GlobalContext'

createRoot(document.getElementById('root')).render(

<GlobalContext>
<RouterProvider router={routes}></RouterProvider>
</GlobalContext>
 
)
