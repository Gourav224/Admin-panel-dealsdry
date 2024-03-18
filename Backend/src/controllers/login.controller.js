import asyncHandler from "../utils/asyncHandlers.js";
import ApiError from "../utils/apiError.js"
import { Login } from "../models/login.models.js"
import ApiResponse from "../utils/ApiResponse.js"

const generateRefreshAndAccessToken = async (userId) => {
    try {
        let user = await Login.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        user = await Login.findById(userId);
        return { accessToken, refreshToken };

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token");
    }
}



const registerUser = asyncHandler(async (req, res) => {
    // get Login deatils form frontend
    // validation - notempty
    // check if Login already exists : username
    // check for images , check for avator 
    // upload them ro cloudinary ,avatar
    // create Login object - create  entery in db
    // remove pass word and refresh token field form resprose
    // check for Login creation
    // return res
    const { email, fullName, password } = req.body;

    if (
        [fullName, email, password].some((field) => {
            return field?.trim() === "";
        })
    ) {
        throw new ApiError(400, 'All fields are required');
    }
    const existedUser = await Login.findOne({ email });

    if (existedUser) {
        throw new ApiError(409, "user with email  already exists");
    }

    const data = await Login.create({
        fullName,
        password,
        email
    });


    const userCreated = await Login.findById(data._id).select(
        "-password -refreshToken"
    );

    if (!userCreated) {
        throw new ApiError(500, "Something went wrong when creating the Login ");
    }
    return res.status(201).json(
        new ApiResponse(200, userCreated, "Login created Sucessfully")
    );
})


const loginUser = asyncHandler(async (req, res) => {
    // req body -> data
    // username or email
    // find the Login
    // password check
    // access and refresh token
    // send cookie 
    // send res

    
    const { email, password } = req.body;
    if (!email) {
        throw new ApiError(400, "Email is Required");
    }
    if (!password) {
        throw new ApiError(400, "Password  is Required");
    }

    const user = await Login.findOne({ email });

    if (!user) {
        throw new ApiError(404, "Login does not exist");
    }

    const isPasswordvalid = await user.isPasswordCorrect(password);

    if (!isPasswordvalid) {
        throw new ApiError(401, "Invalid Login password");
    }
    const { accessToken, refreshToken } = await generateRefreshAndAccessToken(user._id);


    const loggedInUser = await Login.findById(user._id).select("-password -refreshToken");
    const options = {
        httpOnly: true,
        secure: true,

    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser,
                    accessToken,
                    refreshToken,
                },
                "Login logged in Successfully"
            )
        );
})

const logoutUser = asyncHandler(async (req, res) => {
    Login.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1,
            }
        },
        {
            new: true
        }
    )
    const options = {
        httpOnly: true,
        secure: true,
    }
    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            new ApiResponse(200, {}, "Login logged out Successfully")
        )
})
const getCurrrentUser = asyncHandler(async (req, res) => {

    if (!req.body) {
        throw new ApiError(401, "unauthorized request")
    }
    const user = req.user;
    return res.status(200).json(
        new ApiResponse(
            200, {
            user,
        },
            "Current Login fetched sucessfully"
        )
    )
})


export {
    registerUser,
    loginUser,
    logoutUser,
    getCurrrentUser,
}