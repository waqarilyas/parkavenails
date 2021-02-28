import auth from '@react-native-firebase/auth';
import {Formik} from 'formik';
import React, {useReducer} from 'react';
import {
  ActivityIndicator,
  Image,
  Keyboard,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button} from 'react-native-elements';
import {hidePass, showPass} from '../../../assets/Icons';
import {SignInVS} from '../../utils/validation';
import styles from './style';

const initialValues = {
  email: '',
  password: '',
  global: '',
  passwordVisibility: false,
};
const reducer = (state, updates) => ({...state, ...updates});

const Login = ({navigation}) => {
  const [state, dispatch] = useReducer(reducer, initialValues);

  const handleData = (values, action) => {
    auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then(() => action.setSubmitting(false))
      .catch((err) => {
        console.log('ERROR - LOGIN', err.code);
        if (
          err.code === 'auth/user-not-found' ||
          err.code === 'auth/wrong-password'
        ) {
          dispatch({global: 'Incorrect Credentials'});
        } else if (err.code === 'auth/unknown') {
          dispatch({global: 'Check your network connection'});
        }

        action.setSubmitting(false);
      });
  };

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{flex: 1, justifyContent: 'center'}}
        showsVerticalScrollIndicator={false}>
        {/* <View style={styles.upperDesign}></View> */}
        <View style={styles.subContainer}>
          {/* <Logo style={styles.logo} height={hp(10)} width={wp(40)} /> */}
          {/* <Text style={styles.title}>Welcome to Park Ave Nails</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text> */}

          <Formik
            initialValues={initialValues}
            onSubmit={(values, action) => handleData(values, action)}
            validationSchema={SignInVS}>
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              isSubmitting,
            }) => (
              <>
                <View style={styles.formContainer}>
                  {/* Email Address Start*/}
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
                  {/* Email Address End*/}

                  {/* Password Start*/}
                  <Text style={styles.heading}>PASSWORD</Text>
                  <View style={styles.textInputContainer}>
                    <TextInput
                      secureTextEntry={!state.passwordVisibility}
                      placeholder="Enter Passwords"
                      autoCapitalize="none"
                      textContentType="password"
                      defaultValue={values.password}
                      onChangeText={handleChange('password')}
                      style={styles.passwordInput}
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
                  {/* Password End*/}

                  {/* Forgot Password Label Start*/}
                </View>
                {/* Forgot Password Label end*/}
                <View style={styles.globalErrorContainer}>
                  <Text style={styles.globalError}>{state.global}</Text>
                </View>
                {/* Sign In Start*/}
                {isSubmitting ? (
                  <ActivityIndicator
                    style={{
                      ...styles.loginContainer,
                      ...styles.login,
                      paddingVertical: 10,
                    }}
                    color="white"
                  />
                ) : (
                  <Button
                    type="solid"
                    title="Login"
                    titleStyle={styles.buttonTitle}
                    onPress={handleSubmit}
                    buttonStyle={styles.login}
                    containerStyle={styles.loginContainer}
                  />
                )}
              </>
            )}
          </Formik>
          <Text
            onPress={() => navigation.navigate('ForgotPassword')}
            style={styles.forgotPassword}>
            Forgot Password?
          </Text>
          {/* Sign Up Start*/}
          <View style={styles.signupContainer}>
            <Text style={styles.extra}>Don't have an account? </Text>
            <Text
              onPress={() => navigation.navigate('Signup')}
              style={styles.signUp}>
              Signup
            </Text>
          </View>
          {/* Sign Up end*/}
        </View>
        {/* <View style={styles.lowerDesign}></View> */}
      </ScrollView>
    </>
  );
};

export default Login;
