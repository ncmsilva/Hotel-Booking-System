import mongoose from "mongoose";
import {uuid} from 'uuidv4';

const Booking = mongoose.Schema({
    bookingId:{
        type: String,
        default: function () {
            return 'BOK-' + uuid(); // Custom ID generation logic
          }
      },
      roomId:{
        type: Number,
        required: true
      },
      email:{
        type: String,
        required: true
      },
      status:{
        type: String,
        required: true,
        default: "pending"
      },
      reason:{
        type: String,
        default: ""
      },
      start:{
        type: Date,
        required: true
      },
      end:{
        type: Date,
        required: true
      },
      notes: {
        type: String,
        default: ""
      },
      timestamp:{
        type: Date,
        default: Date.now
      }
})

const booking = mongoose.model("Booking",Booking)

export default booking;