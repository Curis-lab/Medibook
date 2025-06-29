import { lazy } from "react";

export const Home = lazy(() => import("./Home"));
export const Contact = lazy(() => import("./Contact"));
export const Doctors = lazy(() => import("./Doctors/Doctors"));
export const DoctorDetails = lazy(() => import("./Doctors/DoctorDetails"));
export const MyAccount = lazy(() =>import("../context/Dashboard/user-account/MyAccount"));
export const Services = lazy(() => import("./Services"));
export const Login = lazy(() => import("./Login"));
export const Signup = lazy(() => import("./Signup"));
export const Dashboard = lazy(() =>import("../context/Dashboard/doctor-account/Dashboard"));
export const Profile = lazy(() =>import("../context/Dashboard/user-account/MyAccount"));
export const CheckoutSuccess = lazy(() => import("./Doctors/CheckoutSuccess"));
