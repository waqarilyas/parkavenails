import auth from '@react-native-firebase/auth';
import {Alert} from 'react-native';
export const LOGGER = (tag, value) => {
  console.log(`------- ${tag} -------`, value);
};

export const convertTime = (time) => {
  const newTime = time.split(':');
  const formattedTime = newTime[0] + ':' + newTime[1].toString();
  return time;
};
export const handleLogout = () => {
  Alert.alert(
    'Confirm',
    'Are your sure you want to exit?',
    [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Logout', onPress: () => auth().signOut()},
    ],
    {cancelable: false},
  );
};
