const TimeSlotCard = ({ day, startTime, endTime }) => (
    <div className="flex items-center justify-between mb-2 bg-[#0066ff1a] p-2 rounded-md">
      <div className="flex items-center gap-[10px]">
        <p className="text-[15px] leading-6 text-textColor font-semibold capitalize">
          {day}:
        </p>
        <p className="text-[15px] leading-6 text-textColor">
          {startTime} - {endTime}
        </p>
      </div>
    </div>
  );

export default TimeSlotCard;