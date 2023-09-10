import { CheckedIcon } from "@/app/icons/icon-checked";

import style from "./available-paintings.module.scss";

type Props = {
  paymentStatus: string;
  setPaymentStatus: (paymentStatus: string) => void;
};

const AvailablePaintings: React.FC<Props> = ({
  paymentStatus,
  setPaymentStatus,
}) => {
  const handleSelectAvailablePaintings = () => {
    if (!paymentStatus) {
      setPaymentStatus("available");
    } else {
      setPaymentStatus("");
    }
  };

  return (
    <div className={style.option} onClick={handleSelectAvailablePaintings}>
      {paymentStatus ? (
        <CheckedIcon />
      ) : (
        <div className={style.option__checkbox} />
      )}

      <p className={style.option__title}>Show only available paintings</p>
    </div>
  );
};

export default AvailablePaintings;
