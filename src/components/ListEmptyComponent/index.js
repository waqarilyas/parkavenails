//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';

import {RFValue} from 'react-native-responsive-fontsize';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {COLORS} from '../../utils/constants';
// create a component
const ListEmptyComponent = ({image, title, action, actionTitle}) => {
  return (
    <View style={styles.container}>
      <FastImage source={image} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>{title}</Text>
      {action && (
        <TouchableOpacity style={styles.button} onPress={action}>
          <Text style={styles.buttonTitle}>{actionTitle}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: wp(45),
    width: wp(45),
  },
  title: {
    fontSize: RFValue(14),
    color: COLORS.BLUE,
    fontWeight: 'bold',
    marginTop: wp(2),
  },
  button: {
    backgroundColor: COLORS.BLUE,
    paddingVertical: wp(2),
    width: '70%',
    alignItems: 'center',
    marginTop: wp(2),
    borderRadius: wp(1),
  },
  buttonTitle: {
    color: 'white',
    fontSize: RFValue(14),
  },
});

//make this component available to the app
export default ListEmptyComponent;
