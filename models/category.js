import mongoose from "mongoose";

const Category = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number
    },
    features: {
        type: String
    },
    numOfGuests: {
        type: Number,
        required: true
    },
    image: [
        {
            type: String,
        }
    ]
});

export default mongoose.model("Category", category);