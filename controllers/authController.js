import JWT from "jsonwebtoken";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";


export const registerController = async(req, res) => {
    console.log('in the register controller');
    try {
        const {address, email, name, password, phone, answer, role } = req.body;
        // performing validation
        if(!name) {
            return res.send({message: "Name is required"})
        }
        if(!email) {
            return res.send({message: "Email is required"})
        }
        if(!password) {
            return res.send({message: "Password is required"})
        }
        if(!phone) {
            return res.send({message: "Phone No. is required"})
        }
        if(!address) {
            return res.send({message: "Address is required"})
        }
        if(!answer) {
            return res.send({message: "Answer is required"})
        }
        if(!role) {
            return res.send({message: "Role is required"})
        }
        
        // existing user
        const existingUser = await userModel.findOne({email});
        if(existingUser) {
            return res.status(200).send({
                success: true,
                message: "Already Registered, Please Login",
            })
        }

        // register user
        const hashedPassword = await hashPassword(password);
        const user = await new userModel({name, email, phone, address, password: hashedPassword, answer, role}).save();
        res.status(201).send({
            success: true,
            message: "User Register Successfully",
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Registration",
            error
        })
    }
};

// post login
export const loginController = async(req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid email or password"
            })
        }
        const user = await userModel.findOne({email});
        if(!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registered"
            })
        }
        const match = await comparePassword(password, user.password);
        if(!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password"
            })
        }

        // token
        const token = await JWT.sign({_id:user._id}, `${process.env.JWT_SECRET}`, {expiresIn: "1d"});
        res.status(200).send({
            success: true,
            message: "Login Successfully",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role
            }, 
            token,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong while login",
            error
        })
    }
}

// Forget password
export const forgetPasswordController = async(req, res) => {
    try {
        const {email, answer} = req.body;
        if(!email) {
            res.status(400).send({message: 'Email is required'});
        }
        if(!answer) {
            res.status(400).send({message: 'Answer is required'});
        }
        // check
        const user = await userModel.findOne({email, answer});

        // validation
        if(!user) {
            return res.status(404).send({
                success: false,
                message: "Wrong Email or Password"
            })
        }
        res.status(200).send({
            success: true,
            message: "matched, You can reset password"
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Something Went Wrong",
            error
        })
    }
}

// Reset Password controller
export const ResetPasswordController = async(req, res) => {
    try {
        const {email, newPass} = req.body;
        if(!email) {
            message: "Email required"
        }

        // finding user
        const user = await userModel.findOne({email});

        const hashed = await hashPassword(newPass);
        await userModel.findByIdAndUpdate(user._id, {password: hashed});
        res.status(200).send({
            success: true,
            message: "Password Reset Successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Something Went Wrong",
            error
        })
    }
}
