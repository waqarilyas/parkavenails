/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {COLORS} from '../../utils/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  subContainer: {
    alignItems: 'center',
    marginHorizontal: hp(1.5),
  },
  backContainer: {
    marginTop: hp('2'),
    alignSelf: 'flex-start',
  },
  icon: {
    height: hp(6),
    width: wp(6),
  },
  title: {
    marginTop: hp('2.5'),
    fontWeight: 'bold',
    fontSize: RFValue(25),
  },
  subtitleContainer: {
    marginVertical: hp(2),
  },
  subtitle: {
    color: 'rgba(0,0,0,0.5)',
    textAlign: 'center',
  },
  heading: {
    color: 'rgba(0,0,0,0.4)',
    fontSize: RFValue(11),
    fontWeight: '500',
    alignSelf: 'flex-start',
    marginTop: hp('1%'),
    width: '100%',
  },
  textInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1.5,
    borderColor: '#F0F0F0',
  },
  emailInput: {
    height: hp('6%'),
    fontSize: RFValue(14),
    padding: 0,
    flex: 1,
  },
  error: {
    color: 'red',
    fontSize: RFValue(9),
    marginTop: 3,
    alignSelf: 'flex-start',
  },
  buttonTitle: {
    fontSize: RFValue(18),
  },
  linkContainer: {
    width: '100%',
    marginVertical: hp(3),
  },
  link: {
    backgroundColor: COLORS.BLUE,
    borderRadius: hp(1.4),
    height: hp(6.5),
  },
  text: {
    fontWeight: 'bold',
  },
});

export default styles;
