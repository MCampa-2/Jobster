import mongoose from "mongoose";

const {Schema} = mongoose;

const AuthSchema = new Schema({
    name: {
        required: [true, "Must fill out name field"],
        type: String,
        minLength: [3, "Must be atleast three characters long"],
        maxLength: [50, "Must be less then fifty characters long"]
    },
    email: {
        required: true,
        type: String,
        unique: true,
    },
    password: {
        required: [true, "Must fill out password field"],
        type: String,
        unique: true,
        minLength: [6, "Must be atleast six characters long"],
        maxLength: [255, "Must be less then two and fifty five characters long"]
    }

});

export default  mongoose.model("User", AuthSchema);