//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import styles from './styles';
import ServiceHeader from '../../components/ServiceHeader';
import CardSlider from '../../components/CardSlider';
import TrendingServices from '../../components/TrendingServices';

// create a component
const HomePage = () => {
  return (
    <ScrollView style={styles.container}>
      <ServiceHeader />
      <CardSlider />
      <TrendingServices />
    </ScrollView>
  );
};

// define your styles

//make this component available to the app
export default HomePage;
