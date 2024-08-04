import React from 'react'
import List from './List'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function AllList() {
    const selector = useSelector((state) => state.formData.data);
    const navigate = useNavigate()
  return (
    <>
    <div className='w-full h-screen flex flex-col  '>
        <div className='w-full text-center py-4 text-3xl font-bold '>Student List</div>
        <div className='w-full h-[40px] flex items-center justify-end py-[30px] pr-[100px]'><button onClick={()=>(navigate("/studentForm"))} className='bg-green-600 py-2 px-4 rounded-sm text-white font-semibold'>Create new Student</button></div>
   <List/>
   </div>
   </>
  )
}

export default AllList