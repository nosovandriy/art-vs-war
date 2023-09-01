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
        countryCodeEditable={true}
        placeholder={"Enter your phone number"}
        enableSearch={true}
        searchPlaceholder={"Search your country"}
        disableSearchIcon={true}
        preferredCountries={[
          "al",
          "ad",
          "at",
          "be",
          "ba",
          "bg",
          "hr",
          "ca",
          "cy",
          "cz",
          "ch",
          "dk",
          "ee",
          "fi",
          "fr",
          "de",
          "gr",
          "hu",
          "gb",
          "ie",
          "is",
          "it",
          "xk",
          "li",
          "lt",
          "lu",
          "lv",
          "mk",
          "mt",
          "md",
          "mc",
          "me",
          "nl",
          "no",
          "pl",
          "pt",
          "ro",
          "rs",
          "sm",
          "sk",
          "si",
          "es",
          "se",
          "sh",
          "tr",
          "va",
          "ua",
          "us",
        ]}
        excludeCountries={["ru", "by"]}
        country={"ua"}
        value={value}
        onChange={(event) => onChange(event)}
      />
    </div>
  );
};
