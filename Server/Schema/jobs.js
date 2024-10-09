import mongoose from "mongoose";


const {Schema} = mongoose;

const JobSchema = new Schema({
    company: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["pending", "interviewed", "declined"],
    },
    jobType: {
        type: String,
        required: true,
        enum: ["part-time", "full-time", "internship"]
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {timestamps: true});

export default mongoose.model("Job", JobSchema);

