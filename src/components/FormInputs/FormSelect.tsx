function FormSelect({
  value,
  handleInputChange,
  data,
  valueField,
  labelField,
  label,
  placeholder,
  name,
  required,
  isValid,
}: FormSelectProps) {
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="form-label">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </span>
      </div>
      <select
        name={name}
        value={value}
        onChange={handleInputChange(name)}
        className={`form-select ${
          isValid === false ? "border-red-500" : "border-gray-300"
        }`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {data?.map((el: any, index: any) => {
          return (
            <option key={index} value={el[valueField]}>
              {el[labelField]}
            </option>
          );
        }) ?? <option disabled>{`No ${placeholder} available`}</option>}
      </select>
    </label>
  );
}

export default FormSelect;
