import { object, mixed, string, date, ref } from 'yup';
import { MAX_UPLOADABLE_IMAGE_SIZE_IN_MBS } from '../../../utils/constants';

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

export const yupUserFormValidaton = object().shape({
  file: mixed().when('isProfilePicAttached', {
    is: true,
    then: mixed()
      .test('checkEmptyFile', 'Empty File', (value) => value && value.size)
      .test(
        'fileSize',
        'File too large',
        (value) =>
          value &&
          value.size &&
          value.size / 1024 / 1024 <= MAX_UPLOADABLE_IMAGE_SIZE_IN_MBS
      )
      .test(
        'fileFormat',
        'Unsupported Format',
        (value) => value && SUPPORTED_FORMATS.includes(value.type)
      ),
  }),
  firstName: string()
    .min(1, 'Too Short!')
    .max(200, 'Too Long!')
    // .matches(
    //   /^[a-zA-Z0-9 ]*$/,
    //   'First Name can only include alphabets and white spaces'
    // )
    .required('*First Name Required'),
  lastName: string()
    .min(1, 'Too Short!')
    .max(200, 'Too Long!')
    // .matches(
    //   /^[a-zA-Z0-9 ]*$/,
    //   'Last Name can only include alphabets,nu and white spaces'
    // )
    .required('*Last Name Required'),
  location: string()
    .min(1, 'Too Short!')
    .max(200, 'Too Long!')
    // .matches(
    //   /^[#,-/ a-zA-Z0-9]*$/,
    //   'Location can only include alphabets, numerics,whitespaces and [#,-./]'
    // )
    .required('*Location Required'),
  department: string()
    .min(1, 'Too Short!')
    .max(200, 'Too Long!')
    // .matches(
    //   /^[a-zA-Z ]*$/,
    //   'Department can only include alphabets and white spaces'
    // )
    .required('*Department Required'),
  title: string()
    .min(1, 'Too Short!')
    .max(200, 'Too Long!')
    // .matches(
    //   /^[a-zA-Z ]*$/,
    //   'Designation can only include alphabets and white spaces'
    // )
    .required('*Designation Required'),
  email: string().max(320, 'Invalid').email().required('*Email Required'),
  password: string()
    .min(4, 'Too Short')
    .max(15, 'Exceeded Maximum Characters Limit')
    .when('passwordRequired', {
      is: true,
      then: string().required('*Password Required'),
    }),
  confirmPassword: string().when('password', {
    is: (password) => password && password.length > 0,
    then: string()
      .required('Required')
      .max(15, 'Exceeded Maximum Characters Limit')
      .oneOf([ref('password'), null], 'Passwords must match'),
  }),
  contactNo: string().max(15, 'Too Long!').nullable(),
  extension: string().max(10, 'Too Long!').nullable(),
  joiningDate: date().notRequired().default(null).nullable(),
  dob: date().notRequired().default(null).nullable(),
  role: string().max(30, 'Too Long!'),
});
