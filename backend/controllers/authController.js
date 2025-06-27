import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import ImageKit from 'imagekit';

const imagekit = new ImageKit({
  urlEndpoint:'https://ik.imagekit.io/1n5btdxrfb',
  publicKey:'public_yRZslw98mgzoetGRkyyG2boI+nA=',
  privateKey:'private_Er4fXNVPf8MD5TpS2yajRABP3GI='
})
const generateToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });


export const auth = async(req, res)=>{
  const {token, expire, signature} = imagekit.getAuthenticationParameters();
  res.send({token, expire, signature, publicKey: 'public_yRZslw98mgzoetGRkyyG2boI+nA='})
}
export const register = async (req, res) => {
  const { email, password, name, role, photo, gender } = req.body;
  try {
    let user = null;
    if (role == "patient") {
      await User.findOne({ email });
    } else if (role == "doctor") {
      user = await Doctor.findOne({ email });
    }

    if (user) {
      res.status(400).json({ message: "User already exist." });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    if (role === "patient") {
      user = await User.create({
        name,
        email,
        password: hashPassword,
        photo,
        gender,
        role,
      });
    } else if (role === "doctor") {
      user = await Doctor.create({
        name,
        email,
        password: hashPassword,
        photo,
        gender,
        role,
      });
    }
    await user.save();
    res
      .status(200)
      .json({ success: true, message: "user successfully created." });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Unexpected internal error. Please try again.",
    });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = null;
    const patient = await User.findOne({ email });
    const doctor = await Doctor.findOne({ email });

    if (patient) {
      user = patient;
    } else if (doctor) {
      user = doctor;
    }

    // check if user exist or not
    if (!user) {
      res.status(404).json({ message: "User not found." });
    }
    //compare password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      res.status(400).json({ status: false, message: "Invalid credentials." });
    }
    //get token
    const token = generateToken(user);
    const { role, appointments, ...rest } = user._doc;
    res.status(200).json({
      status: true,
      message: "Successfully logged in.",
      token,
      data: { ...rest },
      role,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: "Failed to login." });
  }
};


