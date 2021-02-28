import React, {useState} from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {RFValue} from 'react-native-responsive-fontsize';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const ServicesBottomSheet = ({visible, closeAction, selectAction}) => {
  const [value, setValue] = useState('');
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
      <Pressable style={styles.centeredView} onPress={closeAction}>
        <View style={styles.modalView}>
          <Text style={styles.title}>Select a service</Text>

          <RadioButton.Group
            onValueChange={(value) => {
              setValue(value);
              selectAction(value);
              closeAction();
            }}
            value={value}>
            <RadioButton.Item label="First item" value="first" />
            <RadioButton.Item label="Second item" value="third" />
            <RadioButton.Item label="Second item" value="fourth" />
            <RadioButton.Item label="Second item" value="fifth" />
            <RadioButton.Item label="Second item" value="sixth" />
          </RadioButton.Group>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  modalView: {
    height: '40%',
    width: '80%',

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
  title: {
    textAlign: 'center',
    fontSize: RFValue(14),
    fontWeight: '700',
  },
});

export default ServicesBottomSheet;
