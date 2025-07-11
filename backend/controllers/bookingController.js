import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import Booking from "../models/BookingSchema.js";
import Stripe from "stripe";

export const getCheckoutSession = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.doctorId);
    const user = await User.findById(req.userId);

    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const doctorName = doctor.name || "Doctor Consultation";
    const doctorBio = doctor.bio || "Medical consultation service";
    const doctorPhoto = doctor.photo || "";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${req.protocol}://${req.get("host")}/doctors/${doctor.id}`,
      customer_email: user.email,
      client_reference_id: req.params.doctorId,
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: (doctor.ticketPrice || 500) * 100, // Convert to cents
            product_data: {
              name: doctorName,
              description: doctorBio,
              images: doctorPhoto ? [doctorPhoto] : [],
            },
          },
          quantity: 1,
        },
      ],
    });

    const booking = await Booking.create({
      doctor: doctor._id,
      user: user._id,
      ticketPrice: doctor.ticketPrice || 500,
      session: session.id,
      appointmentDate: Date.now(),
    });
    await booking.save();

    res
      .status(200)
      .json({ success: true, message: "Successfully paid.", session });
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .json({ success: false, message: "Error creating checkout session." });
  }
};
