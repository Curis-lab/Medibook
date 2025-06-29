import Booking from "../models/BookingSchema.js";
import Doctor from "../models/DoctorSchema.js";
import missingField from "../utils/checkField.js";

export const updateDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const requiredFields = [
      "phone",
      "bio",
      "specialization",
      "ticketPrice",
      "qualifications",
      "experiences",
      "timeSlots",
    ];
    const missed = missingField(requiredFields, req.body);
    if (missed.status) {
      res.status(400).json({
        success: false,
        message: missed.message,
      });
      return;
    }

    // Filter out email from req.body to prevent duplicate key errors
    const { email, ...updateData } = req.body;

    const updatedUser = await Doctor.findByIdAndUpdate(
      id,
      { $set: { ...updateData, isApproved: "approved" } },
      { new: true }
    ).select("-password");

    if (updatedUser == null) {
      res.status(500).json({ success: false, message: "Failed to update" });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Successfully updated.",
      data: updatedUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Failed to update" });
  }
};

export const deleteDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    await Doctor.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Successfully deleted.",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete." });
  }
};

export const getSingleDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const doctor = await Doctor.findById(id)
      .populate("reviews")
      .select("-password");
    if (doctor === null) {
      res
        .status(500)
        .json({ success: false, message: "Doctor did not exist." });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Doctor found.",
      data: doctor,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Doctor did not exist." });
  }
};
export const getAllDoctor = async (req, res) => {
  try {
    const { query } = req.query;
    let doctors;
    if (query) {
      doctors = await Doctor.find({
        isApproved: "approved",
        $or: [
          { name: { $regex: query, $options: "i" } },
          { specialization: { $regex: query, $options: "i" } },
        ],
      }).select("-password");
    } else {
      doctors = await Doctor.find({
        isApproved: "approved",
      }).select("-password");
    }
    res.status(200).json({
      success: true,
      message: "Doctors found.",
      data: doctors,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Users did not exist." });
  }
};
export const getDoctorProfile = async (req, res) => {
  const doctorId = req.userId;
  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      res.status(404).json({ success: false, message: "User not found." });
      return;
    }
    const { password, ...rest } = doctor._doc;
    const appointments = await Booking.find({ doctor: doctorId });

    res.status(200).json({
      success: true,
      message: "Profile Info is getting.",
      data: { ...rest, appointments },
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Something went wrong, cannot get" });
  }
};
