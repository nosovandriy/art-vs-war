import { FieldError } from "react-hook-form";
import ReactPhoneInput from "react-phone-input-2";

import "react-phone-input-2/lib/style.css";
import "./phone-number.scss";

type Props = {
  error: FieldError | undefined;
  value: string;
  onChange: (phoneNumber: string) => void;
};

export const PhoneNumber: React.FC<Props> = ({ value, error, onChange }) => {
  return (
    <div>
      <ReactPhoneInput
        containerClass={`phoneWrapper ${error && "phoneWrapperError"}`}
        inputClass={"phoneNumber"}
        buttonClass={"phoneFlag"}
        dropdownClass={"custom-dropdown"}
        countryCodeEditable={false}
        preferredCountries={["gb", "ie", "ua"]}
        excludeCountries={["ru", "by"]}
        country={"ua"}
        regions={"europe"}
        value={value}
        onChange={(event) => onChange(event)}
      />
    </div>
  );
};
