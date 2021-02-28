/* eslint-disable no-shadow */
/* eslint-disable prettier/prettier */
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {back as backIcon} from '../../../assets/Icons';
import ForgotPassword from '../../screens/ForgotPassword';
import Login from '../../screens/Login';
import Signup from '../../screens/Signup';

const Stack = createStackNavigator();

const back = (navigation) => {
  return (
    <View style={{marginLeft: wp('5')}}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image source={backIcon} style={styles.backk} resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

const AuthStack = ({navigation, route}) => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={({navigation}) => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={({navigation}) => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={({navigation}) => ({
          headerShown: false,
        })}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    elevation: 0,
    borderBottomWidth: 0,
    opacity: 0,
  },
  headerTitleStyle: {
    fontSize: hp('4.5'),
  },
  headerStyle: {
    elevation: 0,
  },
  backk: {
    width: wp('5'),
    height: hp('5'),
    tintColor: '#2E2D2D',
  },
});

export default AuthStack;
