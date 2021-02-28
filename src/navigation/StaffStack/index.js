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
import HomePage from '../../screens/HomePage';
import AppHeader from '../../components/AppHeader';
import ServicesScreen from '../../screens/ServicesScreen';
import BottomTabs from '../BottomTabs';
import StaffScreen from '../../screens/StaffScreen';
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

const StaffStack = ({navigation, route}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="StaffScreen"
        component={StaffScreen}
        options={({navigation}) => ({
          // headerShown: false,
          header: () => <AppHeader />,
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

export default StaffStack;
