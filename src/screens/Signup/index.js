/* eslint-disable prettier/prettier */
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Formik} from 'formik';
import React, {useReducer} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Keyboard,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, Text} from 'react-native-elements';
import {RadioButton} from 'react-native-paper';
import {back, hidePass, showPass} from '../../../assets/Icons';
import {SignUpVS} from '../../utils/validation';
import styles from './style';

const initialValues = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  repeatPassword: '',
  passwordVisibility: false,
  repeatpasswordVisibility: false,
  gender: '',
};

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

const Signup = ({navigation}) => {
  const [state, dispatch] = useReducer(reducer, initialValues);

  const saveDataToFirestore = ({firstname, lastname, email}, action, uid) => {
    const model = {
      firstname,
      lastname,
      email,
      isPremiumMember: false,
      uid,
      createdAt: +new Date(),
      updatedAt: +new Date(),
      profileURL: '',
      gender: state.gender,
    };

    firestore()
      .collection('users')
      .doc(uid)
      .set(model)
      .then(() => {
        action.setSubmitting(false);
      })
      .then(() => Alert.alert('Account created successfully!'))
      .catch((err) =>
        console.log('ERROR - SAVING USER DATA TO FIRESTORE', err),
      );
  };

  const handleData = async (values, action) => {
    // return with an error if email is already used
    const emailStatus = await checkEmail(values.email);
    if (emailStatus) {
      action.setFieldError('email', 'Email already used');
      action.setSubmitting(false);
      return;
    }
    auth()
      .createUserWithEmailAndPassword(values.email, values.password)
      .then((result) => {
        // update user's profile
        const uid = result.user.uid;
        result.user
          .updateProfile({
            displayName: values.firstname + ' ' + values.lastname,
            photoURL: values.profileURL,
          })
          .then(() => saveDataToFirestore(values, action, uid))
          .catch((err) => console.log('ERROR - UPDATE PROFILE', err)); // save data to firestore
      })
      .catch((err) => {
        console.log('Error Sign-up', err);
        action.setFieldError('repeatPassword', 'Check Network Connection');
      });
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.subContainer}>
          <View style={styles.logoContainer}>
            <Text style={styles.title}>Create an account</Text>
          </View>
          <Formik
            initialValues={initialValues}
            onSubmit={(values, action) => handleData(values, action)}
            validationSchema={SignUpVS}>
            {({
              values,
              errors,
              touched,
              handleChange,
              isSubmitting,
              handleSubmit,
            }) => (
              <>
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
                      defaultValue={values.firstname}
                      style={styles.emailStyle}
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
                      defaultValue={values.lastname}
                      style={styles.emailStyle}
                      placeholderTextColor="lightgrey"
                      color="black"
                    />
                  </View>
                  <Text style={styles.error}>
                    {touched.lastname && errors.lastname ? errors.lastname : ''}
                  </Text>

                  {/* Gender */}

                  <Text style={styles.gendertextStyle}>GENDER</Text>
                  <View style={styles.genderContainer}>
                    <RadioButton
                      color="#004482"
                      uncheckedColor="lightgrey"
                      value="Male"
                      status={state.gender === 'Male' ? 'checked' : 'unchecked'}
                      onPress={() => dispatch({gender: 'Male'})}
                    />
                    <Text style={styles.text}>Male</Text>
                    <View style={styles.femaleContainer}>
                      <RadioButton
                        color="#004482"
                        uncheckedColor="lightgrey"
                        value="Female"
                        status={
                          state.gender === 'Female' ? 'checked' : 'unchecked'
                        }
                        onPress={() => dispatch({gender: 'Female'})}
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
                      defaultValue={values.email}
                      style={styles.emailStyle}
                      placeholderTextColor="lightgrey"
                      color="black"
                    />
                  </View>
                  <Text style={styles.error}>
                    {touched.email && errors.email ? errors.email : ''}
                  </Text>

                  {/* Password */}
                  <Text style={styles.heading}>ENTER PASSWORD</Text>
                  <View style={styles.textInputContainer}>
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
                        source={!state.passwordVisibility ? hidePass : showPass}
                        resizeMode="contain"
                        style={styles.icon}
                      />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.error}>
                    {touched.password && errors.password ? errors.password : ''}
                  </Text>
                  {/* REPEAT PASSWORD */}

                  <Text style={styles.heading}>REAPEAT PASSWORD</Text>
                  <View style={styles.textInputContainer}>
                    <TextInput
                      secureTextEntry={!state.repeatpasswordVisibility}
                      placeholder="Repeat Password"
                      autoCapitalize="none"
                      textContentType="password"
                      defaultValue={values.repeatPassword}
                      onChangeText={handleChange('repeatPassword')}
                      style={styles.passwordStyle}
                      placeholderTextColor="lightgrey"
                    />
                    <TouchableOpacity
                      onPress={() =>
                        dispatch({
                          repeatpasswordVisibility: !state.repeatpasswordVisibility,
                        }) || Keyboard.dismiss
                      }
                      style={styles.visibilityIconContainer}>
                      <Image
                        source={
                          !state.repeatpasswordVisibility ? hidePass : showPass
                        }
                        resizeMode="contain"
                        style={styles.icon}
                      />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.error}>
                    {touched.repeatPassword && errors.repeatPassword
                      ? errors.repeatPassword
                      : ''}
                  </Text>
                </View>
                {isSubmitting ? (
                  <ActivityIndicator
                    style={{
                      ...styles.signupContainer,
                      ...styles.signup,
                      paddingVertical: 10,
                    }}
                    color="white"
                  />
                ) : (
                  <Button
                    type="solid"
                    title="Signup"
                    titleStyle={styles.buttonTitle}
                    onPress={handleSubmit}
                    buttonStyle={styles.signup}
                    containerStyle={styles.signupContainer}
                  />
                )}
              </>
            )}
          </Formik>
          {/* Sign In */}
          <View style={styles.signinContainer}>
            <Text style={styles.extra}>Already have an account?</Text>
            <Text
              onPress={() => navigation.navigate('Login')}
              style={styles.signin}>
              Login
            </Text>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default Signup;
