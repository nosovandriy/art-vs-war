import * as yup from "yup";

export const defaultValues = {
  firstName: "",
  lastName: "",
  country: "",
  city: "",
  state_region: "",
  postcode: "",
  addressMain: "",
  addressFirstAdditional: "",
  addressSecondAdditional: "",
  phoneNumber: "",
};

const phoneRegExp =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

export const validation = yup.object({
  firstName: yup
    .string()
    .required("This field is required!")
    .matches(/^[A-Za-z-]+$/i, "The first name should contain only Latin letters")
    .max(30, "Max 30 characters")
    .min(2, "Min 2 characters"),
  lastName: yup
    .string()
    .required("This field is required!")
    .matches(/^[A-Za-z-]+$/i, "The last name should contain only Latin letters")
    .max(30, "Max 30 characters")
    .min(2, "Min 2 characters"),
  country: yup
    .string()
    .required("This field is required!")
    .matches(/^[A-Za-z]+$/i, "The country should contain only Latin letters"),
  city: yup
    .string()
    .required("This field is required!")
    .matches(/^[A-Za-z]+$/i, "The city should contain only Latin letters"),
  state_region: yup.string(),
  postcode: yup.string().required("This field is required!"),
  addressMain: yup.string().required("This field is required!"),
  addressFirstAdditional: yup.string(),
  addressSecondAdditional: yup.string(),
  phoneNumber: yup
    .string()
    .required("This field is required!")
    .matches(phoneRegExp, "Phone number is not valid"),
});
