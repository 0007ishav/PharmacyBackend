import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {}

async function dbConnect(): Promise<void> {    // here void means . i dont care type of data is coming
    if (connection.isConnected) {
        console.log("Already connected to database");
        return
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || "")
        // console.log("DB:", db);
        
        connection.isConnected = db.connections[0].readyState   // readyState returns a number
        // console.log("Connections:", db.connections);
        // console.log("ReadyState:", db.connections[0].readyState);
        
        console.log("Connected Successfully");
        
    } catch (error) {
        
        console.log("Database connection failed", error);
        
        process.exit(1)
    }
}
export default dbConnect;