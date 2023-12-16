// import * as yup from 'yup';

// export const validation = yup.object({
//   image: yup
//     .mixed()
//     .required('This field is required!2')
//     .test('isEmptyField', 'This field is required!', (value) => {
//       const [file] = Object.values(value) as any;
//       return file !== undefined;
//     }),
//   description: yup.string().max(150, 'Max 150 characters'),
// });

import * as yup from 'yup';

export const validation = yup.object({
  image: yup
    .mixed()
    .required('This field is required!')
    // .test('isEmptyField', 'This field is required!', (value) => {
    //   const [file] = Object.values(value) as any;
    //   return file !== undefined;
    // })
    .test('fileSize', 'File size must be less than 10MB', (value) => {
      const [file] = Object.values(value) as any;

      if (file) {
        return file.size <= 10485760;
      }

      return true;
    }),
  description: yup.string().max(150, 'Max 150 characters'),
});
