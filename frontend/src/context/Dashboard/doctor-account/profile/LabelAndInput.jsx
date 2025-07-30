import FormGroup from "./FormGroup";
import FormInput from "./FormInput";

const LabelAndInput = ({ label, ...inputProps }) => (
  <FormGroup label={label}>
    <FormInput {...inputProps} />
  </FormGroup>
);

export default LabelAndInput;