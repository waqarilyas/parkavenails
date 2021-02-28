import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS} from '../../utils/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  subContainer: {
    marginHorizontal: hp(1.5),
  },
  backContainer: {
    alignSelf: 'flex-start',
    position: 'absolute',
    top: hp(2),
    left: 0,
  },
  back: {
    height: hp(6),
    width: wp(6),
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    marginTop: hp(4),
  },
  title: {
    fontWeight: 'bold',
    fontSize: RFValue(22),
    marginVertical: hp(3),
    color: COLORS.BLUE,
  },

  formContainer: {
    marginVertical: hp(2),
  },
  heading: {
    color: 'rgba(0,0,0,0.5)',
    fontSize: RFValue(11),
    fontWeight: '500',
    marginTop: hp(0.5),
    width: '100%',
  },
  emailHeading: {
    color: 'rgba(0,0,0,0.5)',
    fontSize: RFValue(11),
    fontWeight: '500',
    marginTop: hp(0.4),
  },
  emailHeading: {
    color: 'rgba(0,0,0,0.5)',
    fontSize: RFValue(11),
    fontWeight: '500',
    marginTop: hp(0.4),
  },
  textInputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1.5,
    borderColor: '#F0F0F0',
  },
  emailStyle: {
    paddingVertical: hp(1),
    fontSize: RFValue(12),
    padding: 0,
    width: '100%',
  },
  error: {
    color: 'red',
    fontSize: RFValue(9),
    marginTop: 3,
  },
  gendertextStyle: {
    color: 'grey',
    opacity: 0.8,
    fontSize: RFValue(11),
    fontWeight: '900',
    marginTop: hp('1%'),
    alignSelf: 'flex-start',
  },
  genderContainer: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    marginBottom: hp(0.8),
    alignItems: 'center',
  },
  tick: {
    tintColor: 'white',
    width: wp(3),
    height: wp(3),
    alignSelf: 'center',
  },
  femaleContainer: {
    flexDirection: 'row',
    marginLeft: wp(10),
    alignItems: 'center',
  },
  text: {
    marginLeft: wp(1),
    fontSize: RFValue(11),
  },
  passwordStyle: {
    height: hp(6),
    fontSize: RFValue(12),
    flex: 12,
    padding: 0,
  },
  visibilityIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    height: hp(3.8),
    width: wp(3.8),
  },
  signupContainer: {
    width: '100%',
    marginVertical: hp(0.5),
  },
  buttonTitle: {
    fontSize: RFValue(18),
    fontWeight: 'bold',
  },
  signup: {
    backgroundColor: COLORS.BLUE,
    borderRadius: hp(1.4),
    height: hp(6.5),
  },
  signinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(1),
    marginTop: hp(1),
  },
  extra: {
    fontSize: RFValue(13),
    color: 'black',
  },
  signin: {
    fontWeight: 'bold',
    fontSize: RFValue(16),
    marginLeft: 3,
    borderRadius: hp(1),
  },
});

export default styles;
