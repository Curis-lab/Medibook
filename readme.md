# Doctor Booking Application

## Overview
A comprehensive doctor appointment booking system with secure authentication, role-based access control, and integrated payment processing via Stripe.

## Key Features
- **User Authentication**
  - Secure login and registration
  - Password encryption and protection
  - JWT token-based authentication
  - OAuth integration for social login
  - Password reset functionality

- **Role-Based Access Control**
  - Patient role: Book appointments, manage profile, view history, add reviews
  - Doctor role: Manage availability, view appointments, update profile, respond to reviews
  - Admin role: Manage users, oversee operations, handle reports
  - Staff role: Handle basic administrative tasks

- **Appointment Management**
  - Real-time availability checking
  - Appointment scheduling and rescheduling
  - Appointment history and status tracking
  - Email notifications for appointments
  - Calendar integration
  - Waiting list functionality

- **Payment Integration**
  - Secure payment processing with Stripe
  - Multiple payment methods support
  - Payment history
  - Refund handling
  - Automated invoicing
  - Subscription plans for premium features

- **Review System**
  - Patient reviews and ratings
  - Doctor response capability
  - Rating metrics and analytics
  - Review moderation

- **Additional Features**
  - Multi-language support
  - Dark/Light theme
  - Responsive design
  - Real-time chat support
  - Medical history tracking
  - Prescription management
  - Document upload/sharing

## Tech Stack
- **Frontend**: 
  - React.js
  - Redux for state management
  - Material-UI/Tailwind CSS
  - Socket.io client for real-time features

- **Backend**: 
  - Node.js & Express
  - Socket.io for real-time communication
  - JWT for authentication
  - Nodemailer for email services

- **Database**: 
  - MongoDB
  - Redis for caching

- **Cloud Services**:
  - AWS S3 for file storage
  - Stripe for payments
  - SendGrid for email services

## Getting Started
1. Clone the repository
2. Install dependencies
   ```bash
   cd doctor-appointment-system
   npm install
   ```

3. Set up environment variables
   - Create a `.env` file in the root directory
   - Add the following variables:
     ```
     PORT=5000
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     STRIPE_SECRET_KEY=your_stripe_secret_key
     AWS_ACCESS_KEY=your_aws_access_key
     AWS_SECRET_KEY=your_aws_secret_key
     SENDGRID_API_KEY=your_sendgrid_api_key
     ```

4. Start the development server
   ```bash
   npm run dev
   ```

## API Documentation
The API documentation is available at `/api-docs` when running the server locally.

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Support
For support, email support@doctorappointment.com or join our Slack channel.



