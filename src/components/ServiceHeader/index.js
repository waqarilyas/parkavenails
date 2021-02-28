//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {refill, discount, washing, massage} from '../../../assets/Icons';
import FastImage from 'react-native-fast-image';
import {COLORS} from '../../utils/constants';
import {RFValue} from 'react-native-responsive-fontsize';
import ServiceIcon from '../ServiceIcon';
// create a component
const ServiceHeader = () => {
  return (
    <View style={styles.container}>
      <ServiceIcon image={refill} title="REFILL" />
      <ServiceIcon image={discount} title="OFFERS" />
      <ServiceIcon image={massage} title="SPA" />
      <ServiceIcon image={washing} title="WASHING" />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingHorizontal: wp(5),
    paddingVertical: wp(4),
  },
});

//make this component available to the app
export default ServiceHeader;
