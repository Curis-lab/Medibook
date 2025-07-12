import Booking from "../models/BookingSchema.js";
import { MixDoctorRepository } from "../src/adapters/common/repositories/doctor.rep.js";
import MixUnitOfWorkService from "../src/adapters/common/services/MixUnitOfWorkServices.js";
import missingField from "../utils/checkField.js";

const generateDoctorGateway = MixUnitOfWorkService(MixDoctorRepository(class{}));
const doctorGateway = new generateDoctorGateway();

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

    const updatedUser = await doctorGateway.updateDoctorById(id, updateData); 

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
    await doctorGateway.deleteDoctorById(id);
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
    const doctor = await doctorGateway.getDoctorById(id)
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
      doctors = await doctorGateway.getAllDoctorsByQuery(query);
    } else {
      doctors = await doctorGateway.getAllDoctors();
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
    const doctor = await doctorGateway.getDoctorById(doctorId);
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
