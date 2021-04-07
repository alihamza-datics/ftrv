import { object, mixed, string, date, ref } from 'yup';
import { MAX_UPLOADABLE_IMAGE_SIZE_IN_MBS } from '../../../utils/constants';

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

export const userProfileValidation = object().shape({
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
  firstName: string().max(100, 'Too Long!'),
  // .matches(
  //   /^[a-zA-Z0-9 ]*$/,
  //   'First Name can only include alphabets and white spaces'
  // )
  lastName: string().max(100, 'Too Long!'),
  location: string().max(200, 'Too Long!'),
  department: string().max(200, 'Too Long!'),
  title: string().max(200, 'Too Long!'),

  email: string().max(320, 'Invalid').email(),
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
  contactNo: string().max(16, 'Too Long!').nullable(),
  extension: string()
    .max(10, 'Too Long!')
    .matches(/^[0-9]*$/, 'Extension can only contains numerics')
    .nullable(),
  joiningDate: date().notRequired().default(null).nullable(),
  dob: date().notRequired().default(null).nullable(),
  role: string().max(30, 'Too Long!'),
});
