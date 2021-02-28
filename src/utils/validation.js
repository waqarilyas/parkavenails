import * as yup from 'yup';

const SignInVS = yup.object().shape({
  email: yup
    .string()
    .required('Email Required')
    .email('Invalid Email')
    .label('Email'),
  password: yup.string().required('Password Required').label('Password'),
});

const SignUpVS = yup.object().shape({
  firstname: yup
    .string()
    .required('Firstname Required')
    .min(2, 'Too Short')
    .max(33, 'Too Long')
    .label('First Name'),
  lastname: yup
    .string()
    .required('Lastname Required')
    .min(2, 'Too Short')
    .max(33, 'Too Long')
    .label('Last Name'),
  email: yup
    .string()
    .required('Email Required')
    .email('Invalid E-mail')
    .label('Email'),
  password: yup
    .string()
    .required('Password Required')
    .min(8, 'Password Too Short')
    .max(33, 'Password Too Long')
    .label('Password'),
  repeatPassword: yup
    .string()
    .required('Confirm Password Please')
    .oneOf([yup.ref('password'), null], 'Password do not match')
    .min(8, 'Password Too Short')
    .max(33, 'Password Too Long')
    .label('Confirm Password'),
});

const ForgotPassEmailVerify = yup.object().shape({
  email: yup
    .string()
    .required('Email Required')
    .email('Invalid Email')
    .label('Email'),
});

const ResetpasswordVerify = yup.object().shape({
  password: yup
    .string()
    .required('Password Required')
    .min(8, 'Password Too Short')
    .max(33, 'Password Too Long')
    .label('Password'),
  repeatPassword: yup
    .string()
    .required('Confirm Password Please')
    .oneOf([yup.ref('password'), null], 'Password do not match')
    .min(8, 'Password Too Short')
    .max(33, 'Password Too Long')
    .label('Confirm Password'),
});

const changePassVerify = yup.object().shape({
  currentPassword: yup
    .string()
    .required('Password Required')
    .label('Current Password'),
  newPassword: yup
    .string()
    .required('New Password Required')
    .min(8, 'Password Too Short')
    .max(33, 'Password Too Long')
    .label('New Password'),

  repeatPassword: yup
    .string()
    .required('Confirm Password Please')
    .oneOf([yup.ref('newPassword'), null], 'Password do not match')
    .label('Repeat Password'),
});

const editVerify = yup.object().shape({
  firstname: yup
    .string()
    .min(2, 'Too Short')
    .max(33, 'Too Long')
    .label('First Name'),
  lastname: yup
    .string()
    .min(2, 'Too Short')
    .max(33, 'Too Long')
    .label('Last Name'),
  email: yup.string().email('Invalid E-mail').label('Email'),
});

const passVerify = yup.object().shape({
  password: yup.string().required('Password Required').label('Password'),
});

export {
  SignInVS,
  SignUpVS,
  ForgotPassEmailVerify,
  ResetpasswordVerify,
  editVerify,
  passVerify,
  changePassVerify,
};
