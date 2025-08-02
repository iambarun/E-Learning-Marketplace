import mongoose from "mongoose";

const {schema} = mongoose;

const userSchema = new schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min:6,
        max:64
    },
    picture: {
        type: String,
        deefault: "/avatar.png",
    },
    role: {
        type: [String],
        enum: ["Subscriber", "admin", "instructor"],
        default: ["Subscriber"],
    },
    stripe_account_id: "",
    stripe_seller: {},
    stripeSession: {},
},{timestamps: true}
);

export default mongoose.model("User", userSchema);