import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb+srv://user:user1234@cluster0.dshwrb2.mongodb.net/bazar');
        console.log(`Connected to mongo database ${conn.connection.host}`);
    } catch (error) {
        console.log(`error in mongodb ${error}`);
    }
};

export default connectDB;
