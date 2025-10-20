import { Routes, Route } from "react-router-dom";
import ProtectedRouter from "./ProtectedRouter";
import {
  HomePage,
  MediDoctorsListPage,
  DoctorDetailsPage,
  LoginPage,
  RegistrationPage,
  ContactPage,
  ServicesPage,
  PatientDashboardPage,
  DoctorDashboardPage,
} from "../components/pages";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/doctors" element={<MediDoctorsListPage />} />
      <Route path="/doctors/:id" element={<DoctorDetailsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/support" element={<ContactPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route
        path="/users/profile/me"
        element={
          <ProtectedRouter allowedRoles={["patient"]}>
            <PatientDashboardPage />
          </ProtectedRouter>
        }
      />
      <Route
        path="/doctors/profile/me"
        element={
          <ProtectedRouter allowedRoles={["doctor"]}>
            <DoctorDashboardPage />
          </ProtectedRouter>
        }
      />
    </Routes>
  );
}

export default Router;
