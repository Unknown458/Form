import React, { useRef, useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { states } from "./State";
import { useNavigate } from "react-router-dom";
import useFocusOnEnter from './useFocusOnEnter';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {updateData } from "../Redux/Formslice";
import {useParams} from 'react-router-dom'
// SearchableSelect Component
const SearchableSelect = ({ options, onChange, value }) => {
    const [search, setSearch] = useState("");
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const inputRef = useRef(null);
    const optionsRef = useRef([]);
  
    useEffect(() => {
      setFilteredOptions(
        options.filter((option) =>
          option.label.toLowerCase().includes(search.toLowerCase())
        )
      );
      setHighlightedIndex(-1);
    }, [search, options]);
  
    useEffect(() => {
      // Set the initial search value based on the selected value prop
      setSearch(value?.label || "");
    }, [value]);
  
    const handleSearch = (e) => {
      setSearch(e.target.value);
      setIsOpen(true);
    };
  
    const handleSelect = (option) => {
      setSearch(option.label);
      setFilteredOptions(options);
      setIsOpen(false);
      onChange(option);
      inputRef.current.blur();
    };
  
    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown") {
        setIsOpen(true);
        setHighlightedIndex((prevIndex) =>
          prevIndex < filteredOptions.length - 1 ? prevIndex + 1 : prevIndex
        );
      } else if (e.key === "ArrowUp") {
        setIsOpen(true);
        setHighlightedIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : prevIndex
        );
      } else if (e.key === "Enter") {
        if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
          handleSelect(filteredOptions[highlightedIndex]);
        } else {
          setIsOpen(false);
        }
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
  
    useEffect(() => {
      if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
        const optionElement = optionsRef.current[highlightedIndex];
        if (optionElement) {
          optionElement.scrollIntoView({
            block: "nearest",
          });
        }
      }
    }, [highlightedIndex, filteredOptions]);
  
    const handleFocus = () => {
      setIsOpen(true);
    };
  
    return (
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          ref={inputRef}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
          placeholder="Select state"
        />
        {isOpen && (
          <div className="absolute z-10 mt-1 w-full border border-gray-300 rounded-lg bg-white shadow-lg">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <div
                  key={option.value}
                  ref={(el) => (optionsRef.current[index] = el)}
                  onClick={() => handleSelect(option)}
                  className={`px-4 py-2 cursor-pointer ${
                    highlightedIndex === index ? "bg-gray-100" : ""
                  }`}
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

const UpdateForm = () => {
    const { studentId } = useParams();
const navigate = useNavigate()
const formData = useSelector((state) =>
    state.formData.data.find((item) => item.studentId === studentId)
  );
  const dispatch = useDispatch();
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      studentId: formData?.studentId || "",
      name: formData?.name || "",
      gender: formData?.gender || "",
      mobile: formData?.mobile || "",
      state: formData?.state || "",
      date: formData?.date || "",
    },
  });
  const formRef = useRef();
  const stateOptions = states.map((state) => ({ value: state, label: state }));
  const stateValue = watch("state");

  const onSubmit = (data) => {
    console.log(data);
   
    dispatch(updateData(data))

    navigate("/")
           };



  useFocusOnEnter(formRef, handleSubmit(onSubmit));

  return (
    <div className="max-w-lg mx-auto p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Update Student Form</h1>
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
            rules={{ required: "State is required" }}
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

export default UpdateForm;