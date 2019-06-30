import User from "../models/User";
import { ApiError } from "../base/APIError";
import StatusCodes from "http-status-codes";

const createUser = async (userViewModel: any) => {
    const result = await User.findOne({ email: userViewModel.email });

    if (result) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Email is already taken!");
    }

    const userModel = new User(userViewModel);
    return await userModel.save();
};

const getUsers = async (skip: number, limit: number) => {
    return await User.find().skip(skip).limit(limit);
};

export default {
    createUser,
    getUsers
};