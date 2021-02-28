import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {Formik} from 'formik';
import React, {useReducer, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  DeviceEventEmitter,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, Text} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {RadioButton} from 'react-native-paper';
import {
  back,
  hidePass,
  showPass,
  imageGallery as gallery,
  camera,
} from '../../../assets/Icons';
import {editVerify, passVerify} from '../../utils/validation';
import styles from './style';

const reducer = (state, updates) => ({...state, ...updates});
const checkEmail = async (email) => {
  try {
    const path = await firestore()
      .collection('users')
      .where('email', '==', email)
      .get();
    return path.docs.length > 0;
  } catch (err) {
    console.log('Email_ERROR', err);
  }
};
const options = {
  title: 'Select Avatar',
  cameraType: 'front',
  mediaType: 'photo',
  maxWidth: 800,
  maxHeight: 800,
  allowsEditing: true,
  quality: 1,
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
const EditProfile = ({onPress, navigation}) => {
  const user = auth().currentUser;
  const [selection, setSelection] = useState(false);
  let lname = '';

  const name = user.displayName.split(' ');

  name.forEach((item) => {
    if (item != ' ') {
      lname = item;
    }
  });

  const initialValues = {
    firstname: name[0],
    lastname: lname,
    currentEmail: user?.email,
    email: '',
    genderCheck: '',
    profileURL:
      'https://i.pinimg.com/564x/04/bb/21/04bb2164bbfa3684118a442c17d086bf.jpg',
    modalVisible: false,
    password: '',
    passwordVisibility: false,
  };

  const [state, dispatch] = useReducer(reducer, initialValues);
  const [avatar, setAvatar] = useState(null);

  const [picuri, setURI] = useState(null);

  const uid = user.uid;

  const handleCamera = () => {
    launchCamera(options, (response) => {
      console.log('Camera', response);
      if (response.error) {
        console.log('EditProfile::handleCamera', response.error);
        setSelection(false);
        return;
      } else if (response.didCancel) {
        return;
      }
      setURI(response.uri);

      setAvatar(response.uri);

      setSelection(false);
    });
  };

  const handleGallery = () => {
    launchImageLibrary(options, (response) => {
      console.log('Gallery', response);
      if (response.error) {
        console.log('EditProfile::handleGallery', response.error);
        setSelection(false);
        return;
      } else if (response.didCancel) {
        return;
      }

      setURI(response.uri);

      setAvatar(response.uri);

      setSelection(false);
    });
  };

  const handleModal = async (values, action) => {
    if (JSON.stringify(values) === JSON.stringify(initialValues) && !avatar) {
      Alert.alert('All values are same');
      return;
    }

    dispatch({firstname: values.firstname});
    dispatch({lastname: values.lastname});
    dispatch({email: values.email});

    let emailStatus = 0;
    if (values.email != user.email && values.email != '') {
      emailStatus = await checkEmail(values.email);
    }
    if (emailStatus) {
      console.log('Email already used');
      action.setFieldError('email', 'Email already used');
      action.setSubmitting(false);
      return;
    } else if (!emailStatus) {
      dispatch({modalVisible: true});
      action.setSubmitting(false);
    }
  };

  const reauthenticate = (currentPassword) => {
    var cred = auth.EmailAuthProvider.credential(user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
  };

  const handleData = (values, action, uid) => {
    reauthenticate(values.password)
      .then(async () => {
        user
          .updateEmail(state.email == '' ? user.email : state.email)
          .then(async () => {
            let url = '';
            const path = firestore().collection('users').doc(uid);
            if (picuri == null || avatar == null) {
              url = user.photoURL;
            } else {
              const avatarStoragePath = storage().ref(`users/${uid}/avatar`);
              await avatarStoragePath.putFile(picuri);
              url = await avatarStoragePath.getDownloadURL();
            }
            path
              .update({
                firstname: state.firstname,
                lastname: state.lastname,
                gender: state.genderCheck,
                profileURL: url,
                email: state.email,
                updatedAt: +new Date(),
              })
              .catch((err) => {
                action.setFieldError('password', 'Failed to update data');
                action.setSubmitting(false);
              })
              .then(() => {
                user.updateProfile({
                  displayName: state.firstname + ' ' + state.lastname,
                  email: state.email,
                  photoURL: url,
                });
              });
            action.setSubmitting(false);
            dispatch({modalVisible: false});
            Alert.alert(
              'Success',
              'Your profile has been updated successfully',
              [
                {
                  text: 'OK',
                  onPress: () => {
                    DeviceEventEmitter.emit('profileUpdated', () => true);
                    navigation.goBack();
                  },
                },
              ],
              {cancelable: false},
            );
          })
          .finally(() => {
            // disp(getUser());
          })
          .catch((error) => {
            console.log('error', error);
            action.setFieldError('password', 'Failed to Update Email');
            action.setSubmitting(false);
          });
      })
      .catch((error) => {
        action.setSubmitting(false);
        action.setFieldError('password', 'Incorrect Password');
        console.log(error);
      });
  };

  const updateAvatar = () => setSelection(true);
  const handleCancel = () => setSelection(false);

  return (
    <>
      <KeyboardAvoidingView behavior="height" style={{flex: 1}}>
        <ScrollView style={styles.container}>
          <View style={styles.subContainer}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.iconContainer}>
              <Image source={back} resizeMode="contain" style={styles.icon} />
            </TouchableOpacity>
            <View style={styles.header}>
              <Text style={styles.headerTitleStyle}>Edit Profile</Text>
            </View>
            <Formik
              initialValues={initialValues}
              onSubmit={(values, action) => handleModal(values, action)}
              validationSchema={editVerify}>
              {({
                values,
                errors,
                touched,
                handleChange,
                isSubmitting,
                handleSubmit,
              }) => (
                <>
                  <View style={styles.profileContainer}>
                    <View>
                      <Image
                        source={
                          avatar
                            ? {
                                uri: avatar,
                              }
                            : require('../../../assets/Images/sample1.jpg')
                        }
                        style={styles.profileStyle}
                      />
                      <TouchableOpacity
                        style={styles.rounded}
                        onPress={updateAvatar}>
                        <Image source={camera} style={styles.cameraStyle} />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles.formContainer}>
                    {/* First Name */}
                    <Text style={styles.heading}>FIRST NAME</Text>
                    <View style={styles.textInputContainer}>
                      <TextInput
                        placeholder="Enter Firstname"
                        autoCapitalize="words"
                        onChangeText={handleChange('firstname')}
                        textContentType="name"
                        autoCorrect={false}
                        keyboardType="name-phone-pad"
                        defaultValue={initialValues.firstname}
                        style={styles.textInputStyle}
                        placeholderTextColor="lightgrey"
                        color="black"
                      />
                    </View>
                    <Text style={styles.error}>
                      {touched.firstname && errors.firstname
                        ? errors.firstname
                        : ''}
                    </Text>
                    {/* Last Name */}
                    <Text style={styles.heading}>LAST NAME</Text>
                    <View style={styles.textInputContainer}>
                      <TextInput
                        placeholder="Enter Lastname"
                        autoCapitalize="words"
                        onChangeText={handleChange('lastname')}
                        textContentType="name"
                        autoCorrect={false}
                        keyboardType="name-phone-pad"
                        defaultValue={initialValues.lastname}
                        style={styles.textInputStyle}
                        placeholderTextColor="lightgrey"
                        color="black"
                      />
                    </View>
                    <Text style={styles.error}>
                      {touched.lastname && errors.lastname
                        ? errors.lastname
                        : ''}
                    </Text>
                    {/* Gender */}

                    <Text style={styles.genderheading}>GENDER</Text>
                    <View style={styles.genderContainer}>
                      <RadioButton
                        color="#004482"
                        uncheckedColor="lightgrey"
                        disabled
                        value="Male"
                        status={
                          state.genderCheck === 'Male' ? 'checked' : 'unchecked'
                        }
                        onPress={() => dispatch({genderCheck: 'Male'})}
                      />
                      <Text style={styles.text}>Male</Text>
                      <View style={styles.radioContainer}>
                        <RadioButton
                          color="#004482"
                          uncheckedColor="lightgrey"
                          value="Female"
                          disabled
                          status={
                            state.genderCheck === 'Female'
                              ? 'checked'
                              : 'unchecked'
                          }
                          onPress={() => dispatch({genderCheck: 'Female'})}
                        />
                        <Text style={styles.text}>Female</Text>
                      </View>
                    </View>

                    {/*  Email */}

                    <Text style={styles.emailHeading}>EMAIL</Text>
                    <View style={styles.textInputContainer}>
                      <TextInput
                        placeholder="Enter Email"
                        autoCapitalize="none"
                        onChangeText={handleChange('email')}
                        textContentType="emailAddress"
                        autoCorrect={false}
                        keyboardType="email-address"
                        defaultValue={initialValues.currentEmail}
                        style={styles.textInputStyle}
                        placeholderTextColor="lightgrey"
                        color="black"
                      />
                    </View>
                    <Text style={styles.error}>
                      {touched.email && errors.email ? errors.email : ''}
                    </Text>
                  </View>
                  {isSubmitting ? (
                    <ActivityIndicator
                      style={{
                        ...styles.updateContainer,
                        ...styles.update,
                        paddingVertical: 10,
                      }}
                      color="white"
                    />
                  ) : (
                    <Button
                      type="solid"
                      title="Update"
                      onPress={handleSubmit}
                      titleStyle={styles.buttonTitle}
                      buttonStyle={styles.update}
                      containerStyle={styles.updateContainer}
                    />
                  )}
                </>
              )}
            </Formik>
            <Formik
              initialValues={initialValues}
              onSubmit={(values, action) => handleData(values, action, uid)}
              validationSchema={passVerify}>
              {({
                values,
                errors,
                touched,
                handleChange,
                isSubmitting,
                setSubmitting,
                handleSubmit,
              }) => (
                <>
                  <Modal
                    animationType="fade"
                    visible={state.modalVisible}
                    transparent={true}>
                    <View style={styles.layout}>
                      <View style={styles.centeredView}>
                        {/*Password*/}
                        <Text style={styles.modalheading}>
                          ENTER CURRENT PASSWORD
                        </Text>
                        <View style={styles.modaltextInputContainer}>
                          <TextInput
                            secureTextEntry={!state.passwordVisibility}
                            placeholder="Password"
                            autoCapitalize="none"
                            textContentType="password"
                            defaultValue={values.password}
                            onChangeText={handleChange('password')}
                            style={styles.passwordStyle}
                            placeholderTextColor="lightgrey"
                          />
                          <TouchableOpacity
                            onPress={() =>
                              dispatch({
                                passwordVisibility: !state.passwordVisibility,
                              }) || Keyboard.dismiss
                            }
                            style={styles.visibilityIconContainer}>
                            <Image
                              source={
                                !state.passwordVisibility ? hidePass : showPass
                              }
                              resizeMode="contain"
                              style={styles.visibilityIcon}
                            />
                          </TouchableOpacity>
                        </View>
                        <Text style={styles.error}>
                          {touched.password && errors.password
                            ? errors.password
                            : ''}
                        </Text>
                        <View style={styles.buttonsContainer}>
                          {/*Buttons*/}
                          <Button
                            type="solid"
                            title="Cancel"
                            onPress={() => {
                              dispatch({modalVisible: false});
                            }}
                            buttonStyle={styles.cancel}
                            containerStyle={styles.cancelContainer}
                          />
                          {isSubmitting ? (
                            <ActivityIndicator
                              style={{
                                ...styles.cancelContainer,
                                ...styles.signup,
                                paddingVertical: 10,
                              }}
                              color="white"
                            />
                          ) : (
                            <Button
                              type="solid"
                              title="Submit"
                              onPress={handleSubmit}
                              buttonStyle={styles.signup}
                              containerStyle={styles.cancelContainer}
                            />
                          )}
                        </View>
                      </View>
                    </View>
                  </Modal>
                </>
              )}
            </Formik>
          </View>
        </ScrollView>
        <SelectionModal
          handleCamera={handleCamera}
          handleGallery={handleGallery}
          handleCancel={handleCancel}
          selection={selection}
        />
      </KeyboardAvoidingView>
    </>
  );
};

const SelectionModal = ({
  handleGallery,
  handleCamera,
  handleCancel,
  selection,
}) => {
  return (
    <Modal animationType={'slide'} transparent visible={selection}>
      <View style={styles.selectionModal}>
        <Text style={styles.itemViewHeading}>Choose a picture</Text>
        <View style={styles.selectionSubModal}>
          <DialogItemView
            source={gallery}
            title={'Gallery'}
            onPress={handleGallery}
          />
          <DialogItemView
            source={camera}
            title={'Camera'}
            onPress={handleCamera}
          />
          {/* {profile ? (
              <DialogItemView
                source={facebookIcon}
                title={'FACEBOOK'}
                onPress={handleFacebook}
              />
            ) : null} */}
        </View>
      </View>
    </Modal>
  );
};

const DialogItemView = ({source, title, onPress, selection}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={styles.itemViewContainer}
      onPress={onPress}>
      <Image source={source} style={styles.icon} />
      <Text style={styles.itemViewTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default EditProfile;
