//import liraries
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {plusIcon, noAppointment} from '../../../assets/Icons';
import FastImage from 'react-native-fast-image';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';
import AppointmentCard from '../../components/AppointmentCard';
import ListEmptyComponent from '../../components/ListEmptyComponent';
import NewAppointmentSheet from '../../components/NewAppointmentSheet';

const data = ['1', '2', '3', '4', '5', '6', '7'];

const ServicesScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.container}>
      <NewAppointmentSheet visible={modalVisible} handleModal={handleModal} />

      <FlatList
        data={[]}
        contentContainerStyle={{
          flex: 1,
        }}
        keyExtractor={(_, index) => index.toString()}
        ListHeaderComponent={() => {
          return (
            <View style={styles.header}>
              <Text style={styles.headerText}>Your appointments</Text>
              <TouchableOpacity onPress={handleModal}>
                <FastImage
                  source={plusIcon}
                  style={styles.plus}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          );
        }}
        ListEmptyComponent={() => (
          <ListEmptyComponent
            image={noAppointment}
            title="No Appointments yet!"
            actionTitle="Book an appointment"
            action={handleModal}
          />
        )}
        renderItem={({item}) => {
          return <AppointmentCard />;
        }}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp(2),

    paddingVertical: wp(2),
  },
  plus: {
    height: wp(6),
    width: wp(6),
  },
  headerText: {
    fontSize: RFValue(16),
    fontWeight: 'bold',
  },
});

//make this component available to the app
export default ServicesScreen;
