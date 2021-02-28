//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {COLORS} from '../../utils/constants';
// create a component
const ServiceIcon = ({image, title}) => {
  return (
    <View style={styles.subContainer}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.icon} resizeMode="contain" />
      </View>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  icon: {
    height: wp(10),
    width: wp(10),
    resizeMode: 'contain',
    tintColor: COLORS.BLUE,
  },
  imageContainer: {
    padding: wp(3),
    borderRadius: wp(10),
    resizeMode: 'cover',
    backgroundColor: 'white',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  subContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: RFValue(14),
    marginTop: wp(1.5),
    fontWeight: 'bold',
    color: 'grey',
  },
});

//make this component available to the app
export default ServiceIcon;
