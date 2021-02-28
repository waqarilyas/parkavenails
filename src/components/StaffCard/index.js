//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Rating} from 'react-native-elements';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS} from '../../utils/constants';
// create a component
const StaffCard = () => {
  return (
    <View style={styles.container}>
      <FastImage
        source={require('../../../assets/Images/sample-image-2.jpg')}
        style={styles.image}
        resizeMode="stretch"
      />

      <View style={styles.containerRight}>
        <View style={styles.ratingContainer}>
          <Text style={styles.name}>Timmy</Text>
          <View style={styles.ratingLeft}>
            <Rating
              //   type='heart'
              ratingCount={5}
              imageSize={wp(4)}
              showRating={false}
              readonly
              //   onFinishRating={this.ratingCompleted}
            />
            <Text style={styles.ratingCount}>(350)</Text>
          </View>
        </View>

        <Text style={styles.heading}>lorem ipsum fast image ia fooh</Text>
        <Text style={styles.description}>
          fOur marketing department likes to say stuff like, “Hi-Rez Studios is
          an industry-leading video game developer at the forefront of the
          free-to-play, games as a service
        </Text>

        <View style={styles.bookingContainer}>
          <Text style={styles.price}>$150/day</Text>
          <TouchableOpacity style={styles.bookButton}>
            <Text style={styles.bookText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',

    paddingVertical: wp(4),
    marginBottom: wp(2),
    width: '95%',
    alignSelf: 'center',
    borderRadius: wp(2),

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  image: {
    height: wp(25),
    width: wp(25),
    borderRadius: wp(5),
    marginHorizontal: wp(2),
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: RFValue(14),
    fontWeight: 'bold',
    color: 'rgba(0,0,0,0.7)',
  },
  description: {
    color: 'rgba(0,0,0,0.6)',
    maxWidth: wp(63),
    textAlign: 'justify',
  },
  containerRight: {
    // marginLeft: wp(4),
  },
  name: {
    fontSize: RFValue(16),
    fontWeight: 'bold',
  },
  ratingCount: {
    color: 'grey',
  },
  ratingLeft: {
    flexDirection: 'row',
  },
  bookingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: wp(1),
  },
  bookButton: {
    backgroundColor: COLORS.BLUE,
    padding: wp(2),
  },
  bookText: {
    color: 'white',
    fontWeight: 'bold',
  },
  price: {
    marginRight: wp(1),
    fontSize: RFValue(12),
    fontWeight: 'bold',
  },
});

//make this component available to the app
export default StaffCard;
