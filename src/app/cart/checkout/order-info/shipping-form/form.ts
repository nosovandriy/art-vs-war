import * as yup from "yup";

export const defaultValues = {
  firstName: "",
  lastName: "",
  country: "",
  city: "",
  state: "",
  postalCode: "",
  addressLine1: "",
  addressLine2: "",
  phone: "",
};

const phoneRegExp =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

export const validation = yup.object({
  firstName: yup
    .string()
    .required("This field is required!")
    .matches(
      /^[A-Za-z-]+$/i,
      "The first name should contain only Latin letters"
    )
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
    .matches(/^[A-Za-z- ]+$/i, "The country should contain only Latin letters")
    .max(56, "Max 56 characters")
    .min(4, "Min 4 characters"),
  city: yup
    .string()
    .required("This field is required!")
    .max(40, "Max 40 characters")
    .min(1, "Min 1 characters")
    .matches(/^[A-Za-z- ]+$/i, "The city should contain only Latin letters"),
  state: yup
    .string()
    .max(50, "Max 50 characters")
    .min(1, "Min 1 characters")
    .matches(/^[A-Za-z- ]+$/i, "The country should contain only Latin letters"),
  postalCode: yup
    .string()
    .required("This field is required!")
    .max(10, "Max 10 characters")
    .min(4, "Min 4 characters")
    .matches(/^[A-Za-z0-9- ]+$/i, "The country should contain only Latin letters and numbers"),
  addressLine1: yup
    .string()
    .required("This field is required!")
    .max(50, "Max 50 characters"),
  addressLine2: yup.string(),
  phone: yup
    .string()
    .required("This field is required!")
    .matches(phoneRegExp, "Phone number is not valid"),
});
