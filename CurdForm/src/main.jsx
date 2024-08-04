import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Form from './Components/Form.jsx'

import { Provider } from 'react-redux'
import {store} from './Redux/Store.js'
import AllList from './Components/AllList.jsx'
import UpdateForm from './Components/UpdateForm.jsx'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route  element={<App/>} >
      <Route path='/studentForm' element={<Form/>} />
      <Route path='/' element={<AllList/>} />
      <Route path='/update/:studentId' element={<UpdateForm/>} />
   
     </Route>
 

    
  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    <React.StrictMode>
      <Provider store={store}>
       <RouterProvider router={router}/>
       </Provider>
    </React.StrictMode>
 
  </React.StrictMode>,
)
