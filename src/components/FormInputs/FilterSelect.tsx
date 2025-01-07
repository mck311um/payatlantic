function FilterSelect({
  value,
  handleInputChange,
  data,
  valueField,
  labelField,
  placeholder,
  name,
}: FormSelectProps) {
  return (
    <label className="form-control w-full">
      <select
        name={name}
        value={value}
        onChange={handleInputChange(name)}
        className="form-select"
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

export default FilterSelect;
