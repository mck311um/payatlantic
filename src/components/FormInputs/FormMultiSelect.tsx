function FormMultiSelect({
  value,
  handleInputChange,
  data,
  valueField,
  labelField,
  label,
  placeholder,
  name,
}: FormMultiSelectProps) {
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="form-label">{label}</span>
      </div>
      <select
        name={name}
        value={value}
        onChange={handleInputChange(name)}
        className="form-select"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {data?.map((el: any, index: any) => (
          <option key={index} value={el[valueField]}>
            {el[labelField]}
          </option>
        )) ?? <option disabled>{`No ${placeholder} available`}</option>}
      </select>
    </label>
  );
}

export default FormMultiSelect;
