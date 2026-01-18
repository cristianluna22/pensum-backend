import User from "../user/user.model.js"

export const emailExists = async (email = "") => {
    const existe = await User.findOne({ email });

    if (existe) {
        return Promise.reject(`The email ${email} is already registered`);
    }

    return true;
};