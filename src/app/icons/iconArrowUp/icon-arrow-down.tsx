import { FC } from "react";
import './icon-arrow-down.scss';

type Props = {
  isRotated?: boolean;
}

export const ArrowDownIcon: FC<Props> = ({ isRotated }) => {

  return (
    <svg
      className={`rotate`}
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
    >
      <path
        d="M26.5298 12.5308L16.5298 22.5308C16.3892 22.6713 16.1986 22.7502 15.9998 22.7502C15.8011 22.7502 15.6105 22.6713 15.4698 22.5308L5.46985 12.5308C5.33737 12.3886 5.26524 12.2006 5.26867 12.0063C5.2721 11.812 5.35081 11.6266 5.48822 11.4892C5.62564 11.3518 5.81102 11.2731 6.00532 11.2696C6.19963 11.2662 6.38767 11.3383 6.52985 11.4708L15.9998 20.9396L25.4698 11.4708C25.612 11.3383 25.8001 11.2662 25.9944 11.2696C26.1887 11.2731 26.3741 11.3518 26.5115 11.4892C26.6489 11.6266 26.7276 11.812 26.731 12.0063C26.7344 12.2006 26.6623 12.3886 26.5298 12.5308Z"
        fill="#EFF0F1"
      />
    </svg>
  );
};
