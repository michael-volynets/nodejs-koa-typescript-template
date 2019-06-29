import Bcrypt from "bcrypt";
import User, { IUser } from "../models/User";
import { ApiError } from "../base/APIError";
import StatusCodes from "http-status-codes";
import environment from "../config/environment";

const createUser = async (userViewModel: any) => {
    const result = await User.findOne({ email: userViewModel.email });

    if (result) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Email is already taken!");
    }

    const userModel = new User(userViewModel);
    userModel.passwordHash = await Bcrypt.hash(userViewModel.password, 10);
    return await userModel.save();
};

export default {
    createUser
};