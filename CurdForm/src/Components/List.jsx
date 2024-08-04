// components/List.js

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeData } from '../Redux/Formslice';
import { useNavigate } from 'react-router-dom';

function List() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selector = useSelector((state) => state.formData.data);

  const handleRemove = (studentId) => {
  const conformation = confirm("Are you sure you want to delete this data?")
    if(conformation){
        dispatch(removeData(studentId));
    }
    
  };

  const handleUpdate = (studentId) => {
    navigate(`/update/${studentId}`);
  };

  return (
    <div className="overflow-x-auto">
      {selector.length > 0 ? (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">State</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {selector.map((item) => (
              <tr key={item.studentId}>
                <td className="px-8 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.studentId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.gender}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.mobile}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.state}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleUpdate(item.studentId)}
                    className="text-yellow-600 hover:text-yellow-900 mr-4"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleRemove(item.studentId)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>
          <div className='text-3xl font-semibold font-sans w-full text-center'>No student data available.</div>
          <div className='text-lg mt-5 font-semibold font-sans w-full text-center'>
            Add student data
            <button 
              onClick={() => navigate("/studentForm")}
              className='bg-green-600 py-2 px-4 rounded-sm text-sm text-white font-semibold'
            >
              Create new Student
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default List;
