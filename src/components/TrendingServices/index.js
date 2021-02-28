//import liraries
import React, {Component} from 'react';
import {View, StyleSheet, FlatList, Image, Text} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';
import {RFValue} from 'react-native-responsive-fontsize';

const data = [
  'https://cdn.dribbble.com/users/3281732/screenshots/11192830/media/7690704fa8f0566d572a085637dd1eee.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/13130602/media/592ccac0a949b39f058a297fd1faa38e.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/9165292/media/ccbfbce040e1941972dbc6a378c35e98.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/11205211/media/44c854b0a6e381340fbefe276e03e8e4.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/7003560/media/48d5ac3503d204751a2890ba82cc42ad.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/6727912/samji_illustrator.jpeg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/13661330/media/1d9d3cd01504fa3f5ae5016e5ec3a313.jpg?compress=1&resize=1200x1200',
];

const TrendingServices = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => {
          return <Text style={styles.header}>Trending Services</Text>;
        }}
        keyExtractor={(_, index) => index.toString()}
        numColumns={2}
        renderItem={({item}) => {
          return <FastImage source={{uri: item}} style={styles.image} />;
        }}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#2c3e50',
  },
  image: {
    resizeMode: 'contain',
    height: wp(50),
    flex: 1,
    margin: wp(2),
    borderRadius: wp(5),
  },
  header: {
    fontSize: RFValue(16),
    fontWeight: 'bold',
    marginLeft: wp(2),
    marginVertical: wp(3),
  },
});

//make this component available to the app
export default TrendingServices;
