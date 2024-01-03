import mongoose from "mongoose";

async function connectToDb() {
    try {
        const { connection } = await mongoose.connect(process.env.MONGO);
        console.log(connection.host);
    } catch (error) {
        console.log("Error in config/connectionToDb.js: "+error);
    }
}

export default connectToDb;