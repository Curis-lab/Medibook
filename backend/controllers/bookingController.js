import User from '../models/UserSchema.js';
import Doctor from '../models/DoctorSchema.js';
import Booking from '../models/BookingSchema.js';
import Stripe from 'stripe';

export const getCheckoutSession = async(req, res)=>{
    try{
        const doctor = await Doctor.findById(req.params.doctorId);
        const user = await User.findById(req.userId);

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        
        //create stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode:'payment',
            success_url: `${process.env.CLIENT_URL}/success`,
            cancel_url: `${req.protocol}://${req.get('host')}/doctors/${doctor.id}`,
            customer_email: user.email,
            client_reference_id: req.params.doctorId,
            line_items: [
                {
                    price_data:{
                        currency: 'usd',
                        unit_amount: 1 * 100,
                        product_data:{
                            name: doctor.name,
                            description: doctor.bio,
                            images:[doctor.photo]
                        }
                    },
                    quantity: 1
                }
            ]
        })

        console.log(session);
        // create new booking
        const booking = await Booking.create({
            doctor: doctor._id,
            user: user._id,
            // ticketPrice: doctor.ticketPrice,
            ticketPrice: 500,
            session: session.id,
            appointmentDate: Date.now()
        })
        await booking.save();

        res.status(200).json({success:true, message: 'Successfully paid.', session})
    }
    catch(err){
        console.log(err.message);
        res.status(500).json({success:false, message:'Error creating checkout session.'})
    }
}