import { useContext } from "react";

import { authContext } from "../../../context/AuthContext";
import MyBookings from "../../../context/Dashboard/user-account/MyBookings";
import Profile from "../../../context/Dashboard/user-account/Profile";

import Loading from "../../Loader/Loading";
import Error from "../../Error/Error";
import useAccountDeletionModal from "../../../hooks/Modals/useAccountDeletionModal";
import LogoutBtn from "../../atoms/Button/LogoutBtn/LogoutBtn";
import AccountDeletionBtn from "../../atoms/Button/AccountDeletionBtn/AccountDeletionBtn";
import PatientInfoTemplate from "../../templates/PatientInfo/PatientInfo";
import TabTemplate from "../../molecules/Tabs/Tabs";
import { usePatientProfile } from "../../../hooks/getter/usePatientProfile/usePatientProfile";

/**
 * Basic Information
 * Medical Information
 * Appointments History
 * Billing & Payment Info
 * Doctors Notes and Prescriptions
 * Account & Preferences
 */
const TabsCat = [
  {
    label: "Basic Information",
    value: "basic",
    component: (
      <div>
        <Profile />
        Description Example Full Name Patient’s real name Nhan Linh Profile
        Photo Optional photo for recognition avatar.jpg Gender Male / Female /
        Other Female Date of Birth Used to calculate age 1998-02-14 Age
        (auto-calculated) Derived from DOB 27 years Contact Number For
        notifications and doctor contact +95 9 123456789 Email Used for login
        and notifications nhanlinh@gmail.com Address City / region / full
        address Mawlamyine, Mon State
      </div>
    ),
  },
  {
    label: "Medical Information",
    value: "medical",
    component: (
      <div>
        Field Description Example Blood Group Useful in emergencies O+ Allergies
        List of known allergies Penicillin, Nuts Chronic Diseases Ongoing
        conditions Diabetes, Hypertension Medications Current medications
        Metformin, Aspirin Surgical History Previous surgeries Appendectomy
        (2020) Family Medical History Optional info Family has history of heart
        disease Lifestyle Details Optional: smoking, drinking, exercise habits
        Non-smoker, exercises 3x/week
      </div>
    ),
  },
  {
    label: "Appointments History",
    value: "appointments",
    component: (
      <div>
        <MyBookings />
        Upcoming Appointments Scheduled & confirmed visits Dr. Aung — Oct 25,
        10:00 AM Past Appointments Completed or cancelled ones Dr. Hnin — Sep
        10, Completed Doctor’s Name / Specialization Linked to appointment
        record Cardiologist Status pending / confirmed / completed / cancelled
        Completed Feedback Button Allow rating after completion ⭐⭐⭐⭐
      </div>
    ),
  },
  {
    label: "Prescriptions & Notes",
    value: "prescriptions",
    component: (
      <div>
        Field Description Example Diagnosis Doctor’s written notes Mild migraine
        Prescriptions Medicines prescribed Paracetamol 500mg Follow-Up Date
        Doctor-suggested next visit Nov 5, 2025 Downloadable Prescription PDF or
        text summary prescription_456.pdf
      </div>
    ),
  },
  {
    label: "Billing & Payments",
    value: "billing",
    component: (
      <div>
        Field Description Example Total Appointments Count summary 14 Total
        Spent Total money spent on consultations $280 Payment Methods Linked
        payment info (optional) Visa, PayPal Invoices / Receipts Downloadable
        history invoice_123.pdf
      </div>
    ),
  },
  {
    label: "Account Settings",
    value: "settings",
    component: (
      <div>
        Field Description Example Language Preference UI and communication
        language English Notification Settings Email / SMS / App notifications
        Email + App Privacy Settings Share medical data with doctors only
        Enabled Login & Security Password change, 2FA toggle ********
      </div>
    ),
  },
];

function MyAccount() {
  const { dispatch } = useContext(authContext);
  const accountDeleteModal = useAccountDeletionModal();
  const { profileData, error, loading } = usePatientProfile();
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error errMessage={error} />;
  }
  return (
    <div className="max-w-[1170px] px-5 max-auto lg:mt-[50px] container">
      <TabTemplate
        profileComponent={<PatientInfoTemplate {...profileData} />}
        dangerComponent={
          <div className="mt-[50px] md:mt-[100px]">
            <LogoutBtn handleLogout={handleLogout} />
            <AccountDeletionBtn
              handleDeletion={() => accountDeleteModal.onOpen()}
            />
          </div>
        }
        TabsCat={TabsCat}
      />
    </div>
  );
}

export default MyAccount;
