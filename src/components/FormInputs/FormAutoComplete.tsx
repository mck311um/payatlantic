import React, { useState } from "react";

const FormAutoComplete = ({
  value,
  handleInputChange,
  data = [],
  valueField,
  labelFields,
  placeholder,
  name,
  label,
  required = false,
  isValid = true,
}: FormAutoCompleteProps) => {
  const [filteredData, setFilteredData] = useState(data);
  const [isOpen, setIsOpen] = useState(false);

  const currentLabels = data.find((el) => el[valueField] === value)
    ? labelFields
        .map((field) => data.find((el) => el[valueField] === value)[field])
        .join(" - ")
    : "";

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    const filtered = data.filter((el) =>
      labelFields.some((field) => el[field].toLowerCase().includes(query))
    );
    setFilteredData(filtered);
    setIsOpen(query.length > 0);
    handleInputChange(name)(event);
  };

  const handleSelect = (selectedValue: string) => {
    handleInputChange(name)({
      target: { value: selectedValue, name },
    } as React.ChangeEvent<HTMLInputElement>);
    setIsOpen(false);
  };

  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="form-label">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </span>
      </div>
      <div className="relative">
        <input
          type="text"
          name={name}
          value={isOpen ? undefined : currentLabels}
          onChange={handleFilter}
          placeholder={placeholder}
          className={`form-input ${
            isValid === false ? "border-red-500" : "border-gray-300"
          }`}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 150)}
        />
        {isOpen && (
          <ul className="absolute top-full left-0 w-full border bg-white shadow-md max-h-40 overflow-y-auto z-1000 rounded-b-lg">
            {filteredData.length > 0 ? (
              filteredData.map((el: any, index: any) => (
                <li
                  key={index}
                  className="p-2 hover:bg-gray-200 cursor-pointer text-sm"
                  onClick={() => handleSelect(el[valueField])}
                >
                  {labelFields.map((field) => el[field]).join(" - ")}
                </li>
              ))
            ) : (
              <li className="p-2 text-gray-500">{`No ${placeholder} available`}</li>
            )}
          </ul>
        )}
      </div>
    </label>
  );
};

export default FormAutoComplete;
