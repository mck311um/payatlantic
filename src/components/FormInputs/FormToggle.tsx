function FormToggle({
  checked,
  name,
  handleInputChange,
  label,
}: FormCheckboxProps) {
  return (
    <label className="form-control flex items-start">
      <div className="label">
        <span className="form-label">{label}</span>
      </div>
      <input
        name={name}
        type="checkbox"
        checked={checked}
        onChange={handleInputChange(name)}
        required
        className="toggle toggle-lg toggle-info"
      />
    </label>
  );
}

export default FormToggle;
