//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import StaffCard from '../../components/StaffCard';

// create a component
const StaffScreen = () => {
  const data = ['1', '2', '3', '4', '5', '6', '7', '8'];
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => {
          return (
            <Text style={styles.heading}>
              Choose staff you want to book with
            </Text>
          );
        }}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => {
          return <StaffCard />;
        }}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontSize: RFValue(16),
    marginVertical: wp(6),
    fontWeight: 'bold',
  },
});

//make this component available to the app
export default StaffScreen;
