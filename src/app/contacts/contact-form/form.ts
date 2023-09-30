import * as yup from "yup";

export const defaultValues = {
  email: "",
  message: "",
};

export const validation = yup.object({
  email: yup.string().required("This field is required!").email("Email is not valid"),
  message: yup
    .string()
    .required("This field is required!")
    .min(20, "Min 20 characters"),
});
