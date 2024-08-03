import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Form from './Components/Form.jsx'
import ManageData from './Components/ManageData.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route  element={<App/>} >
      <Route path='/' element={<Form/>} />
      <Route path='/manage' element={<ManageData/>} />
     </Route>
 

    
  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    <React.StrictMode>
       <RouterProvider router={router}/>
    </React.StrictMode>
 
  </React.StrictMode>,
)
