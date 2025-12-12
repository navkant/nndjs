import mongoose from "mongoose";
import validator from "validator";

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3,
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function (value) {
                console.log(value);
                if (!validator.isEmail(value)) {
                    throw new Error()`Enter email id in correct format ${value}`;
                }
            },
        },
    },
    password: {
        type: String,
    },
    age: {
        type: Number,
    },
    gender: {
        type: String,
    },
});

const User = mongoose.model("User", userSchema);

export default User;
