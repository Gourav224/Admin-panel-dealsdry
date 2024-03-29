import React, { useState, useEffect, useRef } from "react";
import Input from "./Input";
import employeeService from "../config/employeeApi.js";
import { useNavigate } from "react-router-dom";

const CreateEmployeeForm = ({ data }) => {
  const navigate = useNavigate();

  // State variables to store form input values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobile] = useState("");
  const [designation, setDesignation] = useState("");
  const [gender, setGender] = useState("");
  const [course, setCourse] = useState("");
  const [image, setImage] = useState(null);

  // Ref for email input field
  const emailRef = useRef(null);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const employeedata = {
      name,
      email,
      mobileNo,
      designation,
      gender,
      course,
      avatar: image,
    };

    // Call the API to create or update employee data
    employeeService
      .createEmployee(employeedata)
      .then(() => {
        alert("Employee created successfully!");
        navigate("/employee-list"); // Redirect to employee list page after successful submission
      })
      .catch((error) => {
        alert(error);
        navigate("/employee-list"); // Redirect to employee list page on error
      });
  };

  // Set form values based on data object when component is loaded
  useEffect(() => {
    if (data) {
      setName(data.name || "");
      setEmail(data.email || "");
      setMobile(data.mobileNo || "");
      setDesignation(data.designation || "");
      setGender(data.gender || "");
      setCourse(data.course || "");
      setImage(data.avatar || null);
    }
  }, [data]);

  return (
    <div className="p-8 rounded shadow">
      <div className="w-full max-w-lg bg-white bg-opacity-35 rounded-xl p-10 border border-black/10">
        <h2 className="text-center text-2xl font-bold leading-tight">
          {data ? "Edit Employee" : "Create Employee"}
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Name Input */}
          <Input
            label="Name: "
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {/* Email Input */}
          <Input
            label="Email: "
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            ref={emailRef} // Assign the ref to the email input
          />
          {/* Mobile Input */}
          <Input
            label="Mobile No: "
            type="tel"
            value={mobileNo}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
          {/* Designation Dropdown */}
          <div className="w-full">
            <label className="inline-block mb-1 pl-1" htmlFor="designation">
              Designation:
            </label>
            <select
              id="designation"
              className="px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              required
            >
              <option value="">Select</option>
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </select>
          </div>
          {/* Gender Radio Buttons */}
          <div className="mt-4">
            <label className="block mb-1">Gender:</label>
            <div className="flex items-center">
              <input
                type="radio"
                id="male"
                className="mr-2"
                value="Male"
                checked={gender === "Male"}
                onChange={(e) => setGender(e.target.value)}
                required
              />
              <label htmlFor="male" className="mr-4">
                Male
              </label>
              <input
                type="radio"
                id="female"
                className="mr-2"
                value="Female"
                checked={gender === "Female"}
                onChange={(e) => setGender(e.target.value)}
                required
              />
              <label htmlFor="female">Female</label>
            </div>
          </div>

          {/* Course Checkbox */}
          <div className="mt-4">
            <label className="block mb-1">Course:</label>
            <div className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                value="MCA"
                checked={course === "MCA"}
                onChange={(e) => setCourse(e.target.checked ? "MCA" : "")}
              />
              <span className="mr-4">MCA</span>
              <input
                type="checkbox"
                className="mr-2"
                value="BCA"
                checked={course === "BCA"}
                onChange={(e) => setCourse(e.target.checked ? "BCA" : "")}
              />
              <span className="mr-4">BCA</span>
              <input
                type="checkbox"
                className="mr-2"
                value="BSC"
                checked={course === "BSC"}
                onChange={(e) => setCourse(e.target.checked ? "BSC" : "")}
              />
              <span>BSC</span>
            </div>
          </div>

          {/* Image Upload */}
          <Input
            label="Img Upload: "
            type="file"
            accept="image/jpeg, image/png"
            onChange={(e) => setImage(e.target.files[0])}
          />
          {/* Submit Button */}
          <button
            type="submit"
            className="mt-3 w-full bg-customOrange text-white font-bold py-2 px-4 rounded"
          >
            {data ? "update" : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEmployeeForm;
