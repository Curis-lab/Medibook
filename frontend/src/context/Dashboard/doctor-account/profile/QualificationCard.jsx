const QualificationCard = ({ degree, university, startDate, endDate }) => (
    <div className="bg-[#fff9ea] p-3 rounded-md mb-2">
      <h3 className="text-[16px] font-semibold text-headingColor leading-6">
        {degree} at {university}
      </h3>
      <p className="text-[14px] leading-6 text-textColor">
        {new Date(startDate).getFullYear()} - {new Date(endDate).getFullYear()}
      </p>
    </div>
  );
  export default QualificationCard;