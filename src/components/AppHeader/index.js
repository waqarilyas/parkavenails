import * as React from 'react';
import {Appbar} from 'react-native-paper';
import {
  Platform,
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';

import {tilted_bell, user} from '../../../assets/Icons';
import {COLORS} from '../../utils/constants';
import {RFValue} from 'react-native-responsive-fontsize';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

const AppHeader = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Park Ave Nailss</Text>

    <View style={styles.containerRight}>
      <View style={styles.iconContainer} style={styles.iconContainer}>
        <Image source={tilted_bell} style={styles.icon} />
      </View>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => auth().signOut()}>
        <Image source={user} style={styles.icon} />
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: wp(3),
  },
  containerRight: {
    flexDirection: 'row',
  },
  title: {
    fontSize: RFValue(16),
    color: COLORS.BLUE,
  },
  icon: {
    resizeMode: 'contain',
    height: wp(4),
    width: wp(4),
  },
  iconContainer: {
    backgroundColor: 'white',
    marginHorizontal: wp(3),
    padding: wp(2),
    borderRadius: wp(1),

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
});

export default AppHeader;
