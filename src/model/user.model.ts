import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document{
    content: string;     // Typescript has lowercase string
    createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
    content: {
        type: String,    // Mongoose has this "String" uppercase "s"
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now()
    }
})


export interface User extends Document{
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMessage: boolean;
    messages: Message[]    // Message type array
}

const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/.+\@.+\..+/, 'Please use a vaid email address']  // match email with regex
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    
    verifyCode: {
        type: String,
        required: [true, "Verify code is required"]
    },
    
    verifyCodeExpiry: {
        type: Date,
        required: [true, "Verify code expiry is required"]
    },
    
    isVerified: {
        type: Boolean,
        default: false
    },
    
    isAcceptingMessage: {
        type: Boolean,
        default: true
    },
    
    messages: [MessageSchema]
    
})
// as mongoose.Model<User> this is typescript.. model ka datatype define kra hai
const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema)

export default UserModel;