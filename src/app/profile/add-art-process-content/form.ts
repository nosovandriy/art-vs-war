import * as yup from "yup";

export const validation = yup.object({
  image: yup
    .mixed()
    .required("This field is required!2")
    .test("isEmptyField", "This field is required!", (value) => {
      const [file] = Object.values(value) as any;
      return file !== undefined;
    }),
  description: yup
    .string()
    .required("This field is required!")
    .min(10, "Minimum 10 characters"),
});
