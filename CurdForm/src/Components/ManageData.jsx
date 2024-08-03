import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const ManageData = () => {
  const location = useLocation();
  const { studentId: initialStudentId } = location.state || {};
  const [studentId, setStudentId] = useState(initialStudentId || "");
  const [studentData, setStudentData] = useState(null);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (studentId) {
      setLoading(true);
      setError("");
      const dataList = JSON.parse(localStorage.getItem("formDataList")) || [];
      const data = dataList.find((item) => item.studentId === studentId);
      if (data) {
        setStudentData(data);
        setFormData(data);
      } else {
        setStudentData("No data found");
        setFormData(null);
      }
      setLoading(false);
    }
  }, [studentId]);

  const handleSearch = () => {
    if (!studentId) {
      setError("Please enter a Student ID");
      return;
    }
    setLoading(true);
    setError("");
    const dataList = JSON.parse(localStorage.getItem("formDataList")) || [];
    const data = dataList.find((item) => item.studentId === studentId);
    if (data) {
      setStudentData(data);
      setFormData(data);
    } else {
      setStudentData("No data found");
      setFormData(null);
    }
    setLoading(false);
  };

  const handleUpdate = () => {
    if (!studentId) {
      setError("Student ID is required to update data");
      return;
    }
    if (!formData) {
      setError("No data to update");
      return;
    }
    setLoading(true);
    setError("");
    const dataList = JSON.parse(localStorage.getItem("formDataList")) || [];
    const updatedDataList = dataList.map((item) =>
      item.studentId === studentId ? formData : item
    );
    localStorage.setItem("formDataList", JSON.stringify(updatedDataList));
    setStudentData(formData);
    setLoading(false);
    alert("Data updated");
  };

  const handleDelete = () => {
    if (!studentId) {
      setError("Student ID is required to delete data");
      return;
    }
    setLoading(true);
    setError("");
    const dataList = JSON.parse(localStorage.getItem("formDataList")) || [];
    const filteredDataList = dataList.filter(
      (item) => item.studentId !== studentId
    );
    localStorage.setItem("formDataList", JSON.stringify(filteredDataList));
    setStudentData(null);
    setFormData(null);
    setLoading(false);
    alert("Data deleted");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="max-w-lg mx-auto p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">
        Manage Student Data
      </h1>
      <div className="mb-6">
        <label
          htmlFor="searchId"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Enter Student ID
        </label>
        <input
          id="searchId"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
          placeholder="Enter Student ID"
        />
        <button
          onClick={handleSearch}
          className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
      {studentData && typeof studentData !== "string" && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Update Student Data:</h2>
          <div className="space-y-4">
            {Object.keys(studentData).map(
              (key) =>
                key !== "studentId" && (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {key}
                    </label>
                    <input
                      name={key}
                      value={formData[key] || ""}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
                      placeholder={`Enter ${key}`}
                    />
                  </div>
                )
            )}
            <button
              onClick={handleUpdate}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </button>
            <button
              onClick={handleDelete}
              className="w-full bg-red-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageData;
