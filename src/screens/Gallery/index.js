//import liraries
import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import ImageView from 'react-native-image-viewing';
import FastImage from 'react-native-fast-image';
const {width, height} = Dimensions.get('screen');

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';

const data = [
  {
    uri:
      'https://cdn.dribbble.com/users/3281732/screenshots/11192830/media/7690704fa8f0566d572a085637dd1eee.jpg?compress=1&resize=1200x1200',
  },
  {
    uri:
      'https://cdn.dribbble.com/users/3281732/screenshots/13130602/media/592ccac0a949b39f058a297fd1faa38e.jpg?compress=1&resize=1200x1200',
  },
  {
    uri:
      'https://cdn.dribbble.com/users/3281732/screenshots/9165292/media/ccbfbce040e1941972dbc6a378c35e98.jpg?compress=1&resize=1200x1200',
  },
  {
    uri:
      'https://cdn.dribbble.com/users/3281732/screenshots/11205211/media/44c854b0a6e381340fbefe276e03e8e4.jpg?compress=1&resize=1200x1200',
  },
  {
    uri:
      'https://cdn.dribbble.com/users/3281732/screenshots/7003560/media/48d5ac3503d204751a2890ba82cc42ad.jpg?compress=1&resize=1200x1200',
  },
  {
    uri:
      'https://cdn.dribbble.com/users/3281732/screenshots/6727912/samji_illustrator.jpeg?compress=1&resize=1200x1200',
  },
  {
    uri:
      'https://cdn.dribbble.com/users/3281732/screenshots/13661330/media/1d9d3cd01504fa3f5ae5016e5ec3a313.jpg?compress=1&resize=1200x1200',
  },
];

const Gallery = () => {
  const [visible, setIsVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gallery</Text>

      <FlatList
        data={data}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{alignItems: 'center'}}
        numColumns={2}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setSelectedIndex(index);
                setIsVisible(true);
              }}>
              <FastImage
                source={{uri: item.uri}}
                resizeMode="contain"
                style={styles.image}
              />
            </TouchableOpacity>
          );
        }}
      />

      <ImageView
        images={data.map((item) => item)}
        imageIndex={selectedIndex}
        visible={visible}
        onImageIndexChange={(item) => {
          console.log(item);
        }}
        onRequestClose={() => setIsVisible(false)}
        FooterComponent={({imageIndex}) => (
          <View style={styles.root}>
            <Text style={styles.text}>{`${imageIndex + 1} / ${
              data.length
            }`}</Text>
          </View>
        )}
        shift={0.75}
      />
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
  title: {},
  image: {
    height: wp(50),
    width: wp(50),
  },
  root: {
    height: 64,
    backgroundColor: '#00000077',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 17,
    color: '#FFF',
  },
  title: {
    fontSize: RFValue(18),
    fontWeight: '700',
    marginVertical: wp(8),
  },
});

//make this component available to the app
export default Gallery;
