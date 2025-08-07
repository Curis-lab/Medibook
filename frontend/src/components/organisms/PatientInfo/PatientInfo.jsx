function PatientInfo({ name, email, bloodType }) {
  return (
    <div className="text-center">
      <h3 className="text-[18px] leading-[30px] text-primary font-bold">
        {name}
      </h3>
      <p className="text-black text-[15px] leading-6 font-medium">{email}</p>
      <p className="text-black text-[15px] leading-6 font-medium">
        Blood Type:{" "}
        <span className="ml-2 text-primary text-[22px] leading-8">
          {bloodType}
        </span>
      </p>
    </div>
  );
}

export default PatientInfo;
