import asyncHandler from "../utils/asyncHandlers.js";
import ApiError from "../utils/apiError.js";
import { Employee } from "../models/employee.models.js";
import ApiResponse from "../utils/ApiResponse.js";
import { uploadOnCloudinary, deleteformCloudinary } from "../utils/cloudinary.js"

// @desc    Create new employee
const registerEmployee = asyncHandler(async (req, res) => {
    // Extract necessary details from request body
    const { name, email, mobileNo, designation, gender, course } = req.body;
    // console.log( name, email, mobileNo, designation, gender, course );

    // Check if any required field is empty
    if (
        [name, email, mobileNo, designation, gender, course].some((field) => {
            return field?.trim() === "";
        })
    ) {
        throw new ApiError(400, 'All fields are required');
    }

    // Check if user with the provided email already exists
    const existedUser = await Employee.findOne({ email });

    if (existedUser) {
        throw new ApiError(409, "User with email already exists");
    }

    // Extract avatar local path from request files
    const avatarLocalPath = req.file?.path;
    // console.log(req)
    // Check if avatar is provided
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required");
    }

    // Upload avatar to Cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath);

    // Check if avatar upload was successful
    if (!avatar) {
        throw new ApiError(409, "Avatar upload failed");
    }

    // Create new employee object and save to database
    const employee = await Employee.create({
        name,
        avatar: avatar.url,
        email,
        mobileNo,
        designation,
        gender,
        course
    });

    // Check if employee was successfully created
    if (!employee) {
        throw new ApiError(500, "Failed to create employee");
    }

    // Respond with success message and created employee details
    return res.status(201).json(
        new ApiResponse(200, employee, "Employee created successfully")
    );
});

// @desc    Update existing employee
const updateEmployee = asyncHandler(async (req, res) => {
    // Extract necessary details from request body
    const { id, name, email, mobileNo, designation, gender, course } = req.body;

    // Check if any required field is empty
    if (
        [id, name, email, mobileNo, designation, gender, course].some((field) => {
            return field?.trim() === "";
        })
    ) {
        throw new ApiError(400, 'All fields are required');
    }

    // Find the existing user by ID
    const existingUser = await Employee.findById(id);

    // If the user is not found, throw an error
    if (!existingUser) {
        throw new ApiError(404, 'User not found');
    }

    // Check if the user is trying to update the email address
    if (email !== existingUser.email) {
        // If the email is being updated, check if it already exists in the database
        const emailExists = await Employee.findOne({ email });

        // If email exists and it's not the same as the current user's email, throw an error
        if (emailExists && emailExists._id.toString() !== id) {
            throw new ApiError(409, 'Email already exists');
        }
    }
    //remove form cloudinary
    const imageUrl = existingUser.image.url;
    const deleteImage = await deleteformCloudinary(imageUrl);
    if (deleteImage) {
        throw new ApiError(500, 'Internal server error');
    }
    // Extract avatar local path from request files
    const avatarLocalPath = req.files?.path;

    // Check if avatar is provided
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required");
    }

    // Upload avatar to Cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath);

    // Check if avatar upload was successful
    if (!avatar) {
        throw new ApiError(409, "Avatar upload failed");
    }

    // Update existing employee details in the database
    const updatedEmployee = await Employee.findByIdAndUpdate(id, {
        name,
        avatar: avatar.url,
        email,
        mobileNo,
        designation,
        gender,
        course
    }, { new: true });

    // Check if employee was successfully updated
    if (!updatedEmployee) {
        throw new ApiError(500, "Failed to update employee");
    }

    // Respond with success message and updated employee details
    return res.status(200).json(
        new ApiResponse(200, updatedEmployee, "Employee updated successfully")
    );
});


// Delete employee 
const deleteEmployee = asyncHandler(async (req, res) => {
    const { id } = req.body;

    // If id is not provided in the request body, return 400 error
    if (!id) {
        throw new ApiError(400, 'id is required ');
    }

    // Find employee by email and delete it
    const deletedEmployee = await Employee.findByIdAndDelete(id);

    // If employee is not found, return 404 error
    if (!deletedEmployee) {
        throw new ApiError(404, 'Employee not found');
    }

    // Return success response
    res.status(200).json(
        new ApiResponse(200, { success: true }, 'Employee has been deleted')
    );
});


// @desc    Get list of all employees
const getEmployeeList = asyncHandler(async (req, res) => {
    // Fetch all employees from the database
    const employees = await Employee.find();

    // Respond with success message and employee details array
    return res.status(200).json(
        new ApiResponse(200, employees, "List of all employees fetched successfully")
    );
});


export { registerEmployee, updateEmployee, getEmployeeList, deleteEmployee };
