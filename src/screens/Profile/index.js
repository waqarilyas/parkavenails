//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, Button, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';
import FastImage from 'react-native-fast-image';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS} from '../../utils/constants';
import {exitIcon} from '../../../assets/Icons';
import {handleLogout} from '../../utils/helper';

const Profile = ({navigation}) => {
  const user = auth().currentUser;
  console.log(user);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logoutContainer} onPress={handleLogout}>
        <FastImage source={exitIcon} style={styles.exitIcon} />
      </TouchableOpacity>

      <FastImage
        source={
          user?.photoURL
            ? {uri: user.photoURL}
            : require('../../../assets/Images/sample1.jpg')
        }
        resizeMode="cover"
        style={styles.cover}
      />
      <Text style={styles.name}>{user?.displayName}</Text>
      <Text style={styles.email}>{user?.email}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('EditProfile')}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>About Us</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  cover: {
    height: wp(30),
    width: wp(30),
    marginTop: wp(20),
    borderRadius: wp(15),
  },
  name: {
    fontSize: RFValue(18),
    fontWeight: 'bold',
    marginTop: wp(6),
    textTransform: 'uppercase',
  },
  button: {
    backgroundColor: COLORS.BLUE,
    paddingVertical: wp(3),
    width: '60%',
    alignItems: 'center',
    marginTop: wp(3),
    borderRadius: wp(2),
  },
  buttonText: {
    color: 'white',
    fontSize: RFValue(14),
    fontWeight: 'bold',
  },
  email: {
    color: 'rgba(0,0,0,0.6)',
    marginBottom: wp(10),
  },
  exitIcon: {
    height: wp(10),
    width: wp(10),
  },
  logoutContainer: {
    position: 'absolute',
    right: wp(3),
    top: wp(3),
  },
});

export default Profile;
