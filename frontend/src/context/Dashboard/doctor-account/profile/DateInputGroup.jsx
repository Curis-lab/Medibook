import FormInput from './FormInput';

const DateInputGroup = ({ prefix, formData, handleChange }) => (
    <div className="grid grid-cols-2 gap-5">
      <div>
        <FormInput
          type="text"
          name={`${prefix}.university`}
          placeholder="University/College"
          className="mb-5"
          value={formData[prefix].university}
          onChange={handleChange}
        />
        <FormInput
          type="date"
          name={`${prefix}.startDate`}
          value={formData[prefix].startDate}
          onChange={handleChange}
        />
      </div>
      <div>
        <FormInput
          type="text"
          name={`${prefix}.degree`}
          placeholder="Degree"
          className="mb-5"
          value={formData[prefix].degree}
          onChange={handleChange}
        />
        <FormInput
          type="date"
          name={`${prefix}.endDate`}
          value={formData[prefix].endDate}
          onChange={handleChange}
        />
      </div>
    </div>
  );

  export default DateInputGroup