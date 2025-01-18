import { useContext } from "react";
import AdminContext from "../context/AdminContext";

export const getCountryByCountryCode = (countryCode: string) => {
  const { data } = useContext(AdminContext);

  if (data && data.countries) {
    const country = data.countries.find(
      (country) => country.countryCode === countryCode
    );
    return country?.country;
  }

  return "";
};
