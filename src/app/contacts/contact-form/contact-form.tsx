"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import ButtonLoader from "@/app/components/button-loader/button-loader";
import { CheckProduct } from "@/app/icons/icon-check-product";
import { MessageFormTypes } from "@/types/ShippingForm";
import { sendContactUsMessage } from "@/utils/api";
import { defaultValues, validation } from "./form";

import style from "./contact-form.module.scss";

const ContactFrom = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [sendMessage, setSendMessage] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(validation),
    defaultValues,
  });

  const submit: SubmitHandler<MessageFormTypes> = async (data) => {
    try {
      setIsLoading(true);
      const response = await sendContactUsMessage(data);

      if (response) {
        setTimeout(() => {
          setIsLoading(false);
          setSendMessage(true);
        }, 1500);
        reset();
      }
    } catch (error: any) {
      console.log("error", error.response?.status);
    } finally {
      setTimeout(() => {
        setSendMessage(false);
      }, 5000);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <label className={style.label}>
        <p className={style.label__text}>
          Email<span className={style.star}> *</span>
        </p>
        <div className={style.input}>
          <input
            type="text"
            className={`${style.inputText} ${
              errors?.email?.message && style.inputText__error
            }`}
            placeholder="Enter your email"
            {...register("email")}
          />
          {errors?.email?.message && (
            <div className={style.error}>{errors.email?.message}</div>
          )}
        </div>
      </label>
      <label className={style.label}>
        <p className={style.label__text}>
          Text of the appeal<span className={style.star}> *</span>
        </p>
        <div className={style.input}>
          <textarea
            className={`${style.inputText} ${style.inputTextArea} ${
              errors?.message?.message && style.inputText__error
            }`}
            placeholder="Please provide details of your request below"
            {...register("message")}
          />
          {errors?.message?.message && (
            <div className={style.error}>{errors.message?.message}</div>
          )}
        </div>
      </label>

      <button
        type="submit"
        className={style.button}
        disabled={isLoading || sendMessage}
      >
        {isLoading ? (
          <div className={style.buttonLoader}>
            <span>Loading...</span>
            <ButtonLoader darkLoader={true} />
          </div>
        ) : sendMessage ? (
          <div className={style.buttonLoader}>
            <span>Email has been sent</span>
            <CheckProduct darkLoader={true} />
          </div>
        ) : (
          <span>Send message</span>
        )}
      </button>
    </form>
  );
};

export default ContactFrom;
