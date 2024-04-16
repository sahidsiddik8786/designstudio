import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
  staffId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "staff"
   },
   
   googleMeetLink: String,

  date: Date,
  slots: [
    {
      startTime: String,
      endTime: String,
      isBooked: Boolean,
      bookedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        default: null,
      },
    },
  ],
});

export default mongoose.model("appointments", appointmentSchema);

