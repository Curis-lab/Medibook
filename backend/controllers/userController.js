import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";
import User from "../models/UserSchema.js";

export const updateUser = async (req, res) => {
  const id = req.params.id;
  console.log('this is uplaod user',req.body);
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    ).select("-password");
    res.status(200).json({
      success: true,
      message: "Successfully updated.",
      data: updatedUser,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update" });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Successfully deleted.",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete." });
  }
};

export const getSingleUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id).select("-password");
    res.status(200).json({
      success: true,
      message: "User found.",
      data: user,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "User did not exist." });
  }
};
export const getAllUser = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({
      success: true,
      message: "Users found.",
      data: users,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Users did not exist." });
  }
};

export const getUserProfile = async(req, res)=>{
  const userId = req.userId;
  try{

    const user = await User.findById(userId);
    if(!user){
      res.status(404).json({success:false, message:"User not found."});
      return;
    }
    const {password, ...rest}= user._doc;
    res.status(200).json({
      success:true,
      message:"Profile Info is getting.",
      data:{...rest}
    })
  }catch(err){
    res.status(500).json({success:false, message:'Something went wrong, cannot get'})
  }
}

export const getMyAppointments = async(req, res)=>{
  try{
    // setp-1: retrive appointmens from booking specific user
    const bookings = await Booking.find({user:req.userId});

    // setp-2: extract doctor ids from appointment bookings
    const doctorIds = bookings.map(el=>el.doctor._id);
    //setup-3 : returive doctors useing doctor ids
    const doctors = await Doctor.find({_id:{$in:doctorIds}}).select('-password');
    res.status(200).json({
      success: true,
      message:'Apppointments are getting',
      data: doctors
    })
  }
  catch(err){
    console.log(err.message);
    res.status(500).json({success:false, message:'Something went wrong, cannot get.'})
  }
}