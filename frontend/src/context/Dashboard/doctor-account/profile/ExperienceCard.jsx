const ExperienceCard = ({ hospitalName, position, startDate, endDate }) => (
    <div className="grid grid-cols-2 gap-5 mb-5 border border-solid border-[#0066ff61] p-4 rounded-md">
      <div>
        <p className="text-[16px] font-semibold text-textColor mb-2">
          Hospital: {hospitalName}
        </p>
        <p className="text-[14px] text-textColor">From: {startDate}</p>
      </div>
      <div>
        <p className="text-[16px] font-semibold text-textColor mb-2">
          Position: {position}
        </p>
        <p className="text-[14px] text-textColor">To: {endDate}</p>
      </div>
    </div>
  );

export default ExperienceCard;