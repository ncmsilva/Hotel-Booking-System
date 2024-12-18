import mongoose from "mongoose";

const GallaryItem = mongoose.Schema(
    {
        name : {
            type : String,
            required : true
        },
        image : 
        [
            {
                type : String,
                required : true
            }
        ],
        description : {
            type : String,
            required : true
        }
    }
);
    
export default mongoose.model("GallaryItem", GallaryItem);