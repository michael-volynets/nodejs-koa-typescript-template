import Bcrypt from "bcrypt";
import User, { IUser } from "../models/User";

const createUser = async (userViewModel: any) => {
    const result = await User.findOne({ email: userViewModel.email });

    if (result) {
        throw new Error("Email is already taken!");
    }
    
    const userModel = new User(userViewModel);
    userModel.passwordHash = await Bcrypt.hash(userViewModel.password, 10);
    return await userModel.save();
};

export default {
    createUser
};