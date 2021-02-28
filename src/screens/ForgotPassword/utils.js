import auth from '@react-native-firebase/auth';

export const sendPasswordResetEmail = async (email) => {
  console.log('-----password reset called------', email);

  const response = await auth()
    .sendPasswordResetEmail(email)
    .then((user) => {
      return user;
    })
    .catch((e) => {
      return e;
    });

  return response;
};
