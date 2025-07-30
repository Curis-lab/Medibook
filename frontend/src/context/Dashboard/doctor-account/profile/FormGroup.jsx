import FormLabel from './FormLabel';
const FormGroup = ({ label, children, className = "" }) => (
    <div className={`mb-5 ${className}`}>
      {label && <FormLabel>{label}</FormLabel>}
      {children}
    </div>
  );

export default FormGroup;