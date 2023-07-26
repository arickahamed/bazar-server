import JWT from "jsonwebtoken";

// Protected Routes token base
export const requireSignIn = async(req, res, next) => {
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        console.log(`Its from the authmiddleware: ${error}`);
    }
}

// admin access
export const isAdmin = async(req, res, next) => {
    try {
        const user = await userModel.findById({req.user._id});
        if(!user.role !== 1) {
            success: false,
            message: "Unauthorized Access",
        } else{
            next();
        }
    } catch (error) {
        console.log(`Something went wrong from isadmin middleware.`);
        res.status(401).send({
            success: false,
            message: "Somthing went wrong in admin middleware",
            error
        })
    }
}