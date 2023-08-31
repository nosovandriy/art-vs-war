import ReactPhoneInput from "react-phone-input-2";

import "./phone-number.scss";
import "react-phone-input-2/lib/style.css";

type Props = {
  value: string;
  onChange: (phoneNumber: string) => void;
};

export const PhoneNumber: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div>
      <ReactPhoneInput
        containerClass={"phoneWrapper"}
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
