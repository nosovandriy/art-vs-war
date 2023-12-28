import * as yup from 'yup';

export const validation = yup.object({
  image: yup
    .mixed()
    .required('This field is required!')
    .test('fileSize', 'Max allowed size of image is 5MB', (value) => {
      const [file] = Object.values(value) as any;

      if (file) {
        return file.size < 5242880;
      }

      return true;
    }),
  description: yup.string().max(150, 'Max 150 characters'),
});
