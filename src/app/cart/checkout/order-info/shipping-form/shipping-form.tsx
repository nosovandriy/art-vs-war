"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import {
  setPaintingsShippingInfo,
  setShippingAddress,
} from "@/app/redux/slices/shippingSlice";
import { useAppSelector } from "@/types/ReduxHooks";
import { ShippingFormTypes } from "@/types/ShippingForm";
import { CartSteps } from "@/types/cartSteps";
import { getShippingInfo } from "@/utils/api";
import { defaultValues, validation } from "./form";

import style from "./shipping-form.module.scss";

type Props = {
  headers: object;
  isVisible: boolean;
  handleSectionClick: (string: CartSteps | null) => void;
};

const ShippingForm: React.FC<Props> = ({
  headers,
  isVisible,
  handleSectionClick,
}) => {
  const { paintings } = useAppSelector((state) => state.cart);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(validation),
    defaultValues,
  });

  const submit: SubmitHandler<ShippingFormTypes> = async (data) => {
    if (data && isVisible) {
      handleSectionClick(null);
    }

    const orderIds = paintings.map((painting) => painting.id).join(",");

    const shippingInfo = await getShippingInfo(orderIds, data, headers);

    dispatch(setPaintingsShippingInfo(shippingInfo));
    dispatch(setShippingAddress(data));
  };

  const error: SubmitErrorHandler<ShippingFormTypes> = async (data) => {
    if (data && !isVisible) {
      handleSectionClick(CartSteps.secondStep);
    }
  };

  return (
    <form className={style.form} onSubmit={handleSubmit(submit, error)}>
      {isVisible && (
        <>
          <div className={`${style.coupleInputs}`}>
            <label className={style.label}>
              <p className={style.label__text}>
                First Name<span className={style.star}> *</span>
              </p>
              <div className={style.input}>
                <input
                  type="text"
                  className={`${style.inputText} ${
                    errors?.firstName?.message && style.inputText__error
                  }`}
                  placeholder="Enter your first name"
                  {...register("firstName")}
                />
                <div className={style.error}>{errors.firstName?.message}</div>
              </div>
            </label>
            <label className={style.label}>
              <p className={style.label__text}>
                Last Name<span className={style.star}> *</span>
              </p>
              <div className={style.input}>
                <input
                  type="text"
                  className={`${style.inputText} ${
                    errors?.lastName?.message && style.inputText__error
                  }`}
                  placeholder="Enter your last name"
                  {...register("lastName")}
                />
                <div className={style.error}>{errors.lastName?.message}</div>
              </div>
            </label>
          </div>
          <div className={`${style.label} ${style.coupleInputs}`}>
            <label className={style.label}>
              <p className={style.label__text}>
                Country<span className={style.star}> *</span>
              </p>
              <div className={style.input}>
                <input
                  type="text"
                  className={`${style.inputText} ${
                    errors?.country?.message && style.inputText__error
                  }`}
                  placeholder="Enter the country"
                  {...register("country")}
                />
                <div className={style.error}>{errors.country?.message}</div>
              </div>
            </label>
            <label className={style.label}>
              <p className={style.label__text}>State / Region</p>
              <div className={style.input}>
                <input
                  type="text"
                  className={`${style.inputText} ${
                    errors?.state?.message && style.inputText__error
                  }`}
                  placeholder="Enter state/region name"
                  {...register("state")}
                />
                <div className={style.error}>{errors.state?.message}</div>
              </div>
            </label>
          </div>
          <div className={`${style.label} ${style.coupleInputs}`}>
            <label className={style.label}>
              <p className={style.label__text}>
                City<span className={style.star}> *</span>
              </p>
              <div className={style.input}>
                <input
                  type="text"
                  className={`${style.inputText} ${
                    errors?.city?.message && style.inputText__error
                  }`}
                  placeholder="Enter the city name"
                  {...register("city")}
                />
                <div className={style.error}>{errors.city?.message}</div>
              </div>
            </label>
            <label className={style.label}>
              <p className={style.label__text}>
                Postcode<span className={style.star}> *</span>
              </p>
              <div className={style.input}>
                <input
                  type="text"
                  className={`${style.inputText} ${
                    errors?.postalCode?.message && style.inputText__error
                  }`}
                  placeholder="Enter your postcode"
                  {...register("postalCode")}
                />
                <div className={style.error}>{errors.postalCode?.message}</div>
              </div>
            </label>
          </div>
          <label className={style.label}>
            <p className={style.label__text}>
              Address<span className={style.star}> *</span>
            </p>
            <div className={style.input}>
              <input
                type="text"
                className={`${style.inputText} ${
                  errors?.addressLine1?.message && style.inputText__error
                }`}
                placeholder="Enter your street, apartment, №..."
                {...register("addressLine1")}
              />
              {errors?.addressLine1?.message && (
                <div className={style.error}>
                  {errors.addressLine1?.message}
                </div>
              )}
              <input
                type="text"
                className={style.inputText}
                placeholder="Enter your street, apartment, №..."
                {...register("addressLine2")}
              />
            </div>
          </label>
          <label className={style.label}>
            <p className={style.label__text}>
              Phone number<span className={style.star}> *</span>
            </p>
            <div className={style.input}>
              <input
                type="phone"
                className={`${style.inputText} ${
                  errors?.phone?.message && style.inputText__error
                }`}
                placeholder="Enter your phone number"
                {...register("phone")}
              />
              <div className={style.error}>{errors.phone?.message}</div>
            </div>
          </label>
        </>
      )}

      <button type="submit" className={style.button}>
        Calculate shipping cost
      </button>
    </form>
  );
};

export default ShippingForm;
