import DoctorInfo from "../../organisms/DoctorInfo/DoctorInfo";
import DoctorAvatar from "../../atoms/Avatars/DoctorAvatar/DoctorAvatar";

function DoctorInfoTemplate({ photo, name, totalRating, bio }) {
  return (
    <div className="flex gap-4 mb-10">
      <DoctorAvatar photo={photo} />
      <DoctorInfo {...{ name, totalRating, bio }} />
    </div>
  );
}

export default DoctorInfoTemplate;
