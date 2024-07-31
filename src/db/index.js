import mongoose from "mongoose";

const connectDB = async () =>{
    
    try {

        mongoose.connection.on("connected", () => {
            console.log("connected successfully to database");
        });

        mongoose.connection.on("error", (error) => {
            console.log(`error in connection with database: ${error.message}`);
        });

        await mongoose.connect(process.env.MONGO_CONNECTION_STRING);


    } catch (error) {
        console.log(`failed to connect to database: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;