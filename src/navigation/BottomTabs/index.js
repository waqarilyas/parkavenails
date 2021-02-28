import {Image, StyleSheet, View, TouchableOpacity} from 'react-native';
import React from 'react';

import HomeStack from '../HomeStack';
import ServicesScreen from '../../screens/ServicesScreen';
import ServicesStack from '../ServicesStack';
import StaffStack from '../StaffStack';
import StaffScreen from '../../screens/StaffScreen';
import Gallery from '../../screens/Gallery';
import Profile from '../../screens/Gallery';
import ProfileStack from '../ProfileStack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';
import {basket, homeIcon, user, gallery, services} from '../../../assets/Icons';
import {COLORS} from '../../utils/constants';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        keyboardHidesTabBar: true,
        showLabel: false,
        inactiveTintColor: 'black',
      }}
      screenOptions={({route: {name}}) => ({
        tabBarIcon: ({focused}) => {
          let iconName;
          switch (name) {
            case 'Explore':
            case 'HomeStack':
              iconName = homeIcon;
              break;
            case 'ServicesStack':
              iconName = services;
              break;
            case 'StaffStack':
              iconName = basket;
              break;
            case 'Gallery':
              iconName = gallery;
              break;
            case 'ProfileStack':
              iconName = user;
              break;
          }
          return (
            <Image
              source={iconName}
              style={focused ? styles.focusedIcon : styles.icon}
            />
          );
        },
      })}>
      <Tab.Screen name="HomeStack" component={HomeStack} />
      <Tab.Screen name="StaffStack" component={StaffStack} />
      <Tab.Screen name="ServicesStack" component={ServicesStack} />
      <Tab.Screen name="Gallery" component={Gallery} />
      <Tab.Screen name="ProfileStack" component={ProfileStack} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  icon: {
    resizeMode: 'contain',
    height: hp(3),
    width: hp(3),
    // tintColor: '#CECED8',
  },
  focusedIcon: {
    resizeMode: 'contain',
    height: hp(3.3),
    width: hp(3.3),
    tintColor: COLORS.BLUE,
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -12,
  },
});

export default BottomTabs;
