function FormCheckbox({
  checked,
  name,
  handleInputChange,
  label,
}: FormCheckboxProps) {
  return (
    <div className="form-control">
      <label className="label cursor-pointer flex items-center justify-start gap-4">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={handleInputChange(name)}
          className="checkbox peer hidden"
        />
        <span className="w-6 h-6 border-2 border-gray-300 rounded transition duration-200 flex items-center justify-center peer-checked:bg-main peer-checked:border-main">
          {checked && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </span>
        <span className="label-text text-lg text-left">{label}</span>
      </label>
    </div>
  );
}

export default FormCheckbox;
