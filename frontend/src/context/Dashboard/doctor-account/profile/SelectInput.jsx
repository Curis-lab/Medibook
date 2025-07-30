import FormGroup from "./FormGroup";

const SelectInput = ({ label, options, className = "", ...props }) => (
  <FormGroup label={label} className={className}>
    <select
      className="w-full px-4 py-3 border border-solid border-[#0066ff61] focus:outline-none focus:border-primaryColor text-[16px] leading-7 rounded-md cursor-pointer"
      {...props}
    >
      {options.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  </FormGroup>
);

export default SelectInput;
