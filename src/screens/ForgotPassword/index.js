import React, {useState} from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as yup from 'yup';
import {Formik} from 'formik';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import {back} from '../../../assets/Icons';
import styles from './style';
import {Text, Button} from 'react-native-elements';
import {ForgotPassEmailVerify} from '../../utils/validation';
import {sendPasswordResetEmail} from './utils';

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

const initialValues = {
  email: '',
};

const handleData = async (values, action, navigation) => {
  const emailStatus = await checkEmail(values.email);
  if (!emailStatus) {
    action.setFieldError('email', 'No User Exists Against this Email');
    action.setSubmitting(false);
    return;
  }

  const response = await sendPasswordResetEmail(values.email);

  if (
    response ==
    'Error: [auth/user-not-found] There is no user record corresponding to this identifier. The user may have been deleted.'
  ) {
    action.setFieldError('email', 'No user exists against this email!');
    action.setSubmitting(false);
    return;
  } else if (
    response ==
    'Error: [auth/invalid-email] The email address is badly formatted.'
  ) {
    action.setFieldError('email', 'Invalid email address');
    action.setSubmitting(false);
    return;
  } else if (
    response ==
    'Error: [auth/internal-error] An internal error has occurred, please try again.'
  ) {
    action.setFieldError('email', 'Too many tries against this email!');
    action.setSubmitting(false);
    return;
  } else if (response == null) {
    setTimeout(() => {
      alert('Please Check Your email!');
    }, 1500);
    action.setSubmitting(false);
    navigation.navigate('Signin');
  }
};

const ForgotPassword = ({navigation}) => {
  return (
    <>
      <SafeAreaView />
      <ScrollView style={styles.container}>
        <View style={styles.subContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backContainer}>
            <Image source={back} resizeMode="contain" style={styles.icon} />
          </TouchableOpacity>
          <Text style={styles.title}>Forgot Password?</Text>
          <View style={styles.subtitleContainer}>
            <Text style={styles.subtitle}>
              Enter your email and we will send a reset
            </Text>
            <Text style={styles.subtitle}>password link.</Text>
          </View>
          <Formik
            initialValues={initialValues}
            onSubmit={(values, action) =>
              handleData(values, action, navigation)
            }
            validationSchema={ForgotPassEmailVerify}>
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              isSubmitting,
            }) => (
              <>
                <Text style={styles.heading}>EMAIL</Text>
                <View style={styles.textInputContainer}>
                  <TextInput
                    placeholder="Enter Email"
                    autoCapitalize="none"
                    onChangeText={handleChange('email')}
                    textContentType="emailAddress"
                    autoCorrect={false}
                    keyboardType="email-address"
                    defaultValue={values.email}
                    style={styles.emailInput}
                    placeholderTextColor="lightgrey"
                    color="black"
                  />
                </View>
                <Text style={styles.error}>
                  {touched.email && errors.email ? errors.email : ''}
                </Text>
                {isSubmitting ? (
                  <ActivityIndicator
                    style={{
                      ...styles.linkContainer,
                      ...styles.link,
                      paddingVertical: 10,
                    }}
                    color="white"
                  />
                ) : (
                  <Button
                    type="solid"
                    title="Get Link"
                    onPress={handleSubmit}
                    buttonStyle={styles.link}
                    containerStyle={styles.linkContainer}
                  />
                )}
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Text>Back to Login</Text>
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </>
  );
};

export default ForgotPassword;
