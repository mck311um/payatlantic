function FormTextArea({
  value,
  handleInputChange,
  name,
  label,
  required,
  isValid,
  readOnly,
  rows,
  placeholder,
}: FormTextAreaProps) {
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="form-label">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </span>
      </div>
      <textarea
        rows={rows}
        name={name}
        value={value}
        onChange={handleInputChange(name)}
        required
        placeholder={placeholder}
        readOnly={readOnly}
        className={`form-textarea  ${
          isValid === false ? "border-red-500" : "border-gray-300"
        }`}
      />
    </label>
  );
}

export default FormTextArea;
