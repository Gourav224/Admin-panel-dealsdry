import jwt from "jsonwebtoken";
import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandlers.js";
import { Login as User } from "../models/login.models.js"


export const verifyJWT = asyncHandler(async (req, _, next) => {
    try {

        const token =req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken -createdAt -updatedAt -__v");
        if (!user) {
            throw new ApiError(401, "Invalid Access Token")
        }
        req.user = user;
        next();

    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    }
})