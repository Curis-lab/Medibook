import {Router} from 'express';
import authRouter from './auth.js';
import userRouter from './user.js';
import doctorRouter from './doctor.js';
import reviewRouter from './review.js';
import bookingRouter from './booking.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/doctors', doctorRouter);
router.use('/reviews', reviewRouter);
router.use('/bookings', bookingRouter);

export default router;