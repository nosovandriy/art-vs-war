import * as yup from 'yup';

export const validation = yup.object({
  image: yup
    .mixed()
    .required('This field is required!')
    .test('fileSize', 'Max allowed size of image is 5 MB', (value) => {
      const [file] = Object.values(value) as any;

      if (file) {
        return file.size < 5242880;
      }

      return true;
    })
    .test('fileEmpty', 'This field is required!', (value) => {
      const [file] = Object.values(value) as any;

      if (file === undefined) {
        return false;
      }

      return true;
    })
    .test('fileFormat', 'Invalid file format. Only JPEG, JPG and PNG are allowed.', (value) => {
      const [file] = Object.values(value) as any;

      if (file) {
        const acceptedFormats = ['.jpeg', '.jpg', '.png'];
        const validFormat = acceptedFormats.some((format) =>
          file.name.toLowerCase().endsWith(format),
        );

        return validFormat;
      }

      return true;
    }),
  description: yup
    .string()
    .max(150, 'Max 150 characters')
    .matches(
      /^[^\u0400-\u04FF]*$/,
      'Only Latin letters, numbers, spaces, punctuation, and symbols are allowed.',
    )
    .nullable(),
});
