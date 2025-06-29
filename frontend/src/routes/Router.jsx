import { Routes, Route } from "react-router-dom";
import {
  Home,
  Login,
  Signup,
  Contact,
  MyAccount,
  Doctors,
  DoctorDetails,
  Services,
  CheckoutSuccess,
  Dashboard
} from "../pages/lazy";
import ProtectedRouter from "./ProtectedRouter";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/doctors/:id" element={<DoctorDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/services" element={<Services />} />
      <Route path="/checkout-success" element={<CheckoutSuccess />} />
      <Route
        path="/users/profile/me"
        element={
          <ProtectedRouter allowedRoles={["patient"]}>
            <MyAccount />
          </ProtectedRouter>
        }
      />
      <Route
        path="/doctors/profile/me"
        element={
          <ProtectedRouter allowedRoles={["doctor"]}>
            <Dashboard />
          </ProtectedRouter>
        }
      />
    </Routes>
  );
}

export default Router;
