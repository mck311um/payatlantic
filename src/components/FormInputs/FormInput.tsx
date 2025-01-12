function FormInput({
  value,
  handleInputChange,
  name,
  type,
  readOnly,
  label,
  required,
  isValid,
  placeholder,
}: FormInputProps) {
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="form-label">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </span>
      </div>
      <input
        name={name}
        value={value}
        onChange={handleInputChange(name)}
        type={type}
        required
        placeholder={placeholder}
        className={`form-input ${
          isValid === false ? "border-red-500" : "border-gray-300"
        }`}
        readOnly={readOnly}
      />
    </label>
  );
}

export default FormInput;
