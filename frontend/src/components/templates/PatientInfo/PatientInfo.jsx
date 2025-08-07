import RoundedAvatar from "../../atoms/Avatars/RoundedAvatar/RoundedAvatar";
import PatientInfo from "../../organisms/PatientInfo/PatientInfo";
function PatientInfoTemplate({ photo, name, email, bloodType }) {
  return (
    <div className="flex items-center justify-center flex-col gap-2">
      <RoundedAvatar photo={photo} />
      <PatientInfo {...{name, email, bloodType}}/>
    </div>
  );
}

export default PatientInfoTemplate;
