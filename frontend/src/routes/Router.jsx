import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Contact from "../pages/Contact";
import Services from "../pages/Services";
import Doctors from "../pages/Doctors/Doctors";
import DoctorsDetails from "../pages/Doctors/DoctorDetails";
import MyAccount from "../context/Dashboard/user-account/MyAccount";
import ProtectedRouter from "./ProtectedRouter";
import Dashboard from "../context/Dashboard/doctor-account/Dashboard";
import CheckoutSuccess from "../pages/Doctors/CheckoutSuccess";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/doctors/:id" element={<DoctorsDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/services" element={<Services />} />
      <Route path="/checkout-success" element={<CheckoutSuccess/>}/>
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
