import * as yup from 'yup';

export const defaultValues = {
  email: '',
  message: '',
};

const emailRegExp = /^[\w\.-]+@[\w\.-]+\.\w+$/;

export const validation = yup.object({
  email: yup
    .string()
    .required('This field is required!')
    .matches(emailRegExp, 'Email is not valid'),

  message: yup.string().required('This field is required!').min(10, 'Min 10 characters'),
});
