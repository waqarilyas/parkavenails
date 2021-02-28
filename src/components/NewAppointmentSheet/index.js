//import liraries
import moment from 'moment';
import React, {useState} from 'react';
import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {RFValue} from 'react-native-responsive-fontsize';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {crossIcon, massage, refill, washing} from '../../../assets/Icons';
import {COLORS} from '../../utils/constants';
import ServiceIcon from '../ServiceIcon';
import ServicesBottomSheet from '../ServicesBottomSheet';

const NewAppointmentSheet = ({visible, handleModal}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [serviceOptionsOpen, setServiceOptionsOpen] = useState(false);

  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [service, setService] = useState(null);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleDate = (date) => {
    let dt = moment(date).format('DD MMMM, YYYY');
    setDate(dt);
    console.warn('A date has been picked: ', date);
    hideDatePicker();
  };

  const handleTime = (time) => {
    var formatted = moment(time, 'HH:mm:ss').format('hh:mm A');
    setTime(formatted);
    console.warn('A time has been picked: ', time);
    hideTimePicker();
  };

  const handleService = (value) => {
    setService(value);
  };

  const toggleServiceOptions = () => {
    setServiceOptionsOpen(!serviceOptionsOpen);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
      <Pressable style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.crossContainer} onPress={handleModal}>
            <Image source={crossIcon} style={styles.closeIcon} />
          </TouchableOpacity>

          <View style={styles.header}>
            <Text style={styles.heading}>Filter</Text>
            <Text style={styles.headingButton}>Clear All</Text>
          </View>
          <Text style={styles.heading}>Category</Text>
          <View style={styles.serviceIconsContainer}>
            <ServiceIcon image={refill} title="REFILL" />
            <ServiceIcon image={massage} title="SPA" />
            <ServiceIcon image={washing} title="WASHING" />
          </View>
          <Text style={styles.heading}>Services</Text>

          <TouchableOpacity
            style={styles.serviceSheet}
            onPress={toggleServiceOptions}>
            <Text style={styles.serviceSheetText}>
              {service ? service : 'Select a service'}
            </Text>
          </TouchableOpacity>

          <Text style={styles.heading}>Set Schedule</Text>
          <View style={styles.dateTimeContainer}>
            <View style={styles.pickerContainer}>
              <TouchableOpacity onPress={showDatePicker}>
                <Text>{date ? date : 'Select Date'}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.pickerContainer}>
              <TouchableOpacity onPress={showTimePicker}>
                <Text>{time ? time : 'Select Time'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.heading}>Expected Price</Text>
          <Text style={styles.price}>$3.5/day</Text>

          <TouchableOpacity style={styles.appointmenButton}>
            <Text style={styles.appointmenButtonText}>
              Request an appointment
            </Text>
          </TouchableOpacity>
          {/* <Button title="Show Date Picker" onPress={showDatePicker} /> */}

          <ServicesBottomSheet
            visible={serviceOptionsOpen}
            closeAction={toggleServiceOptions}
            selectAction={handleService}
          />

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleDate}
            onCancel={hideDatePicker}
          />
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={handleTime}
            onCancel={hideTimePicker}
          />
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  modalView: {
    height: '90%',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingTop: wp(8),
    paddingHorizontal: wp(5),
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    // backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: wp(2),
  },
  headingButton: {
    backgroundColor: COLORS.BLUE,
    paddingVertical: wp(2),
    paddingHorizontal: wp(3),
    color: 'white',
    fontSize: RFValue(13),
    fontWeight: '700',
    borderRadius: wp(2),
  },
  heading: {
    fontSize: RFValue(14),
    fontWeight: '700',
  },
  serviceIconsContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingHorizontal: wp(5),
    paddingVertical: wp(4),
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.5)',
    width: '40%',
    flex: 1,
    marginHorizontal: wp(1),
    paddingVertical: wp(2),
    borderRadius: wp(1),
    alignItems: 'center',
  },
  dateTimeContainer: {
    // backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: wp(6),
  },
  serviceSheet: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.5)',
    paddingVertical: wp(2),
    alignItems: 'center',
    marginVertical: wp(6),
  },
  appointmenButton: {
    backgroundColor: COLORS.BLUE,
    paddingVertical: wp(3),
    alignItems: 'center',
  },
  appointmenButtonText: {
    color: 'white',
    fontSize: RFValue(14),
    fontWeight: 'bold',
  },
  price: {
    fontSize: RFValue(20),
    fontWeight: 'bold',
    color: COLORS.BLUE,
    textAlign: 'center',
    marginVertical: wp(3),
  },
  closeIcon: {
    height: wp(8),
    width: wp(8),
    resizeMode: 'contain',
    tintColor: COLORS.BLUE,
  },
  crossContainer: {
    position: 'absolute',
    top: -wp(4),
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: wp(10),
    padding: wp(1),
  },
});

//make this component available to the app
export default NewAppointmentSheet;
