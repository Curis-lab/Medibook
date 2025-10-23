import { MdArrowOutward } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function ContentWrapper({ title, subtitle }) {
  return (
    <div className="my-2 tracking-wide">
      <p className="">{title}</p>
      <p className="text-zinc-600">{subtitle}</p>
    </div>
  );
}
function DoctorCard({ name, specialization, totalRating, photo, _id }) {
  const navigate = useNavigate();
  return (
    <div className="hover:bg-amber-300 p-2 rounded-xs group">
      <img
        src={photo}
        className="object-cover w-full h-[200px] overflow-hidden"
        alt="doctor profile"
      />
      <ContentWrapper title={name} subtitle={specialization} />
      <div className="my-2">
        <p className="tracking-wide">{totalRating}(120 reviews)</p>
        <p className="tracking-wide">City Hospital | 10+ years exp.</p>
        <p className="tracking-wide">Mon-Fri, 9AM-5PM</p>
      </div>
      <div
        onClick={() => navigate(`/doctors/${_id}`)}
        className="hidden group-hover:inline-block cursor-pointer"
      >
        <div className="flex items-center">
          <MdArrowOutward />
          go to profile
        </div>
      </div>
    </div>
  );
}

export default DoctorCard;
