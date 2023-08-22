"use client";

import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { defaultValues, validation } from "./form";

import style from "./shipping-form.module.scss";
import { getOrder } from "@/utils/api";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/types/ReduxHooks";
import { CartSteps } from "@/types/cartSteps";
import { ShippingFormTypes } from "@/types/ShippingForm";

type Props = {
  headers: object;
  isVisible: boolean;
  handleSectionClick: (string: CartSteps) => void;
};

const ShippingForm: React.FC<Props> = ({
  headers,
  isVisible,
  handleSectionClick,
}) => {
  const router = useRouter();
  const { paintings } = useAppSelector((state) => state.cart);

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
    const orderIds = paintings.map((painting) => painting.id).join(",");

    const stripePage = await getOrder(headers, orderIds);
    router.push(stripePage);
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
                    errors?.state_region?.message && style.inputText__error
                  }`}
                  placeholder="Enter state/region name"
                  {...register("state_region")}
                />
                <div className={style.error}>
                  {errors.state_region?.message}
                </div>
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
                    errors?.postcode?.message && style.inputText__error
                  }`}
                  placeholder="Enter your postcode"
                  {...register("postcode")}
                />
                <div className={style.error}>{errors.postcode?.message}</div>
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
                  errors?.addressMain?.message && style.inputText__error
                }`}
                placeholder="Enter your street, apartment, №..."
                {...register("addressMain")}
              />
              {errors?.addressMain?.message && (
                <div className={style.error}>{errors.addressMain?.message}</div>
              )}
              <input
                type="text"
                className={style.inputText}
                placeholder="Enter your street, apartment, №..."
                {...register("addressFirstAdditional")}
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
                  errors?.phoneNumber?.message && style.inputText__error
                }`}
                placeholder="Enter your phone number"
                {...register("phoneNumber")}
              />
              <div className={style.error}>{errors.phoneNumber?.message}</div>
            </div>
          </label>
        </>
      )}

      <button type="submit" className={style.button}>
        Place order
      </button>
    </form>
  );
};

export default ShippingForm;
