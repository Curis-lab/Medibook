import { lazy } from "react";

export const ContactPage = lazy(() => import("./ContactPage/Contact"));
export const HomePage = lazy(() => import("./HomePage/HomePage")); 
export const ServicesPage = lazy(() => import("./ServicesPage/Services"));
export const NotFoundPage = lazy(() => import("./NotFoundPage/NotFound"));
export const MediDoctorsListPage = lazy(() => import("./DoctorsListPage/DoctorsListPage"));
export const DoctorDetailsPage = lazy(() => import("./DoctorDetailsPage/DoctorDetails"));
export const LoginPage = lazy(() => import("./LoginPage/Login"));
export const RegistrationPage = lazy(() => import("./RegistrationPage/Register")); // Fixed typo in variable name
export const DoctorDashboardPage = lazy(() => import("./DoctorDashboardPage/DoctorDashboard"));
export const PatientDashboardPage = lazy(() => import("./PatientDashboardPage/PatientDashboard")); // Fixed formatting
