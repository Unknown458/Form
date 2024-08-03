import React from "react";
import { useForm, Controller } from "react-hook-form";
import { states } from "./State";
import { useNavigate } from "react-router-dom";

// SearchableSelect Component
const SearchableSelect = ({ options, onChange, value }) => {
  const [search, setSearch] = React.useState("");
  const [filteredOptions, setFilteredOptions] = React.useState(options);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);
    setFilteredOptions(
      options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const handleSelect = (option) => {
    setSearch(option.label);
    setFilteredOptions(options);
    setIsOpen(false);
    onChange(option);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
        placeholder="Select state"
      />
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full border border-gray-300 rounded-lg bg-white shadow-lg">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option.value}
                onClick={() => handleSelect(option)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {option.label}
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-500">No options found</div>
          )}
        </div>
      )}
    </div>
  );
};

// Main Form Component
const Form = () => {
  const navigate = useNavigate();
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm();
  const stateOptions = states.map((state) => ({ value: state, label: state }));
  const stateValue = watch("state");

  const onSubmit = (data) => {
    console.log(data);
    const existingData = JSON.parse(localStorage.getItem("formDataList")) || [];
    existingData.push(data);
    localStorage.setItem("formDataList", JSON.stringify(existingData));
    navigate("/manage", { state: { studentId: data.studentId } });
    alert("Data saved to localStorage");
  };

  const handleStateChange = (selectedOption) => {
    setValue("state", selectedOption ? selectedOption.value : "");
  };

  const handleKeyDown = (e, nextFieldId) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const nextField = document.getElementById(nextFieldId);
      if (nextField) {
        nextField.focus();
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Student Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label
            htmlFor="studentId"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Student ID
          </label>
          <input
            id="studentId"
            {...register("studentId", { required: "Student ID is required" })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
            placeholder="Enter Student ID"
            onKeyDown={(e) => handleKeyDown(e, "name")}
          />
          {errors.studentId && (
            <p className="text-red-500 text-sm mt-1">{errors.studentId.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name
          </label>
          <input
            id="name"
            {...register("name", { required: "Name is required" })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
            placeholder="Enter Name"
            onKeyDown={(e) => handleKeyDown(e, "gender")}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="gender"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Gender
          </label>
          <select
            id="gender"
            {...register("gender", { required: "Gender is required" })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
            onKeyDown={(e) => handleKeyDown(e, "mobile")}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && (
            <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="mobile"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Mobile Number
          </label>
          <input
            id="mobile"
            {...register("mobile", {
              required: "Mobile number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Mobile number must be 10 digits",
              },
            })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
            placeholder="Enter Mobile Number"
            onKeyDown={(e) => handleKeyDown(e, "state")}
          />
          {errors.mobile && (
            <p className="text-red-500 text-sm mt-1">{errors.mobile.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="state"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            State
          </label>
          <Controller
            name="state"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <SearchableSelect
                options={stateOptions}
                onChange={(option) => field.onChange(option ? option.value : "")}
                value={stateOptions.find((option) => option.value === field.value)}
              />
            )}
          />
          {errors.state && (
            <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Date
          </label>
          <input
            id="date"
            type="date"
            {...register("date", { required: "Date is required" })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
          />
          {errors.date && (
            <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
