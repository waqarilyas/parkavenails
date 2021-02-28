import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {COLORS} from '../../utils/constants';

const rootStyle = {
  flex: 1,
};

const textInputStyle = {
  height: hp(6),
  fontSize: RFValue(14),
  padding: 0,
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  subContainer: {
    ...rootStyle,
    alignItems: 'center',
    marginHorizontal: hp(1.5),

    justifyContent: 'center',
  },
  logo: {
    marginTop: hp(6),
    marginBottom: hp(2.5),
  },
  title: {
    fontWeight: 'bold',
    fontSize: RFValue(24),
  },
  subtitle: {
    fontSize: RFValue(15),
    color: 'rgba(0,0,0,0.4)',
    marginTop: hp(1),
    marginBottom: hp(3),
  },
  formContainer: {
    marginVertical: hp(1),
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
    width: wp(94),
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1.5,
    borderColor: '#F0F0F0',
  },
  emailInput: {
    ...textInputStyle,
    flex: 1,
  },
  passwordInput: {
    ...textInputStyle,
    flex: 12,
  },
  visibilityIconContainer: {
    justifyContent: 'center',
    ...rootStyle,
  },
  icon: {height: hp(3.8), width: wp(3.8)},
  error: {
    color: 'red',
    fontSize: RFValue(9),
    marginTop: 3,
  },
  forgotPassword: {
    // marginTop: hp(1),
    fontSize: RFValue(16),
    color: 'rgba(0,0,0,0.7)',
    fontWeight: 'bold',
    // alignSelf: 'flex-end',
  },
  buttonTitle: {
    fontSize: RFValue(18),
  },
  globalErrorContainer: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 130,
  },
  globalError: {
    fontSize: RFValue(11),
    color: 'red',
  },
  loginContainer: {
    width: '100%',
    marginTop: hp(3.5),
    marginBottom: hp(2),
  },
  login: {
    backgroundColor: COLORS.BLUE,
    borderRadius: hp(1.4),
    height: hp(6.5),
  },
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1),
    position: 'absolute',
    bottom: hp(1),
  },
  signUp: {
    fontSize: RFValue(13),
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: COLORS.BLUE,
    paddingVertical: hp(1),
    paddingHorizontal: hp(1),
    borderRadius: hp(1),
  },
  extra: {
    fontSize: RFValue(13),
    color: 'black',
  },
  upperDesign: {
    height: hp(10),
    width: hp(10),
    backgroundColor: COLORS.LIGHT_BLUE,
    position: 'absolute',
    top: 0,
    borderBottomEndRadius: hp(10),
  },
  lowerDesign: {
    height: hp(10),
    width: hp(10),
    backgroundColor: COLORS.LIGHT_BLUE,
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderTopLeftRadius: hp(10),
  },
});

export default styles;
