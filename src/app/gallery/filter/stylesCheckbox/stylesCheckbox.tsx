import { useState } from "react";
import { ArrowUpIcon } from "@/app/icons/icon-arrow-up";
import style from "./stylesCheckbox.module.scss";
import { CheckedIcon } from "@/app/icons/icon-checked";

type Props = {
  title: string;
  types: string[];
  styleOptions: string[];
  setCheckedOptions: (item: string[]) => void;
};

const StylesCheckBox: React.FC<Props> = ({
  title,
  types,
  styleOptions,
  setCheckedOptions,
}) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handleOptionClick = (option: string) => {
    if (styleOptions.includes(option)) {
      setCheckedOptions(styleOptions.filter((item) => item !== option));
    } else {
      setCheckedOptions([...styleOptions, option]);
    }
  };

  return (
    <div className={style.styles}>
      <div
        className={style.stylesHeader}
        onClick={() => setIsOpenMenu(!isOpenMenu)}
      >
        <div className={style.stylesHeader__wrapper}>
          <div className={style.title}>{title}</div>
          {styleOptions.length > 0 && <div className={style.point} />}
        </div>
        <div className={`${style.arrow} ${isOpenMenu && style.arrowUp}`}>
          <ArrowUpIcon />
        </div>
      </div>
      {isOpenMenu && (
        <div className={style.dropdown}>
          {types.map((typesOption, index) => (
            <div
              key={index}
              className={style.option}
              onClick={() => handleOptionClick(typesOption)}
            >
              {styleOptions.includes(typesOption) ? (
                <CheckedIcon />
              ) : (
                <div className={style.option__checkbox} />
              )}
              <p className={style.option__title}>{typesOption}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StylesCheckBox;
