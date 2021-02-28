import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS} from '../../utils/constants';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  subContainer: {
    marginHorizontal: hp(1.5),
    marginTop: hp(1),
  },
  iconContainer: {
    width: wp(6),
    height: hp(6),
    justifyContent: 'center',
  },
  icon: {
    width: wp(6),
    height: hp(6),
  },
  header: {
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  headerTitleStyle: {
    fontSize: RFValue(22),
    fontWeight: '700',
    alignSelf: 'center',
    marginTop: hp(1),
  },
  profileContainer: {
    marginTop: hp(2),
    height: hp(16),
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileStyle: {
    width: hp(15),
    height: hp(15),
    borderRadius: 100,
  },
  rounded: {
    width: hp(4),
    height: hp(4),
    borderRadius: 100,
    backgroundColor: COLORS.BLUE,
    position: 'absolute',
    borderWidth: 2,
    borderColor: 'white',
    bottom: 7,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraStyle: {
    width: hp(2),
    height: hp(2),
    tintColor: 'white',
  },
  formContainer: {
    marginVertical: hp(3),
  },
  heading: {
    color: 'rgba(0,0,0,0.5)',
    fontSize: RFValue(11),
    fontWeight: '500',
    marginTop: hp(1.2),
    width: '100%',
  },
  textInputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  error: {
    color: 'red',
    fontSize: RFValue(9),
    marginTop: 3,
  },
  textInputStyle: {
    paddingVertical: hp(1),
    fontSize: RFValue(14),
    padding: 0,
    width: '100%',
  },
  layout: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    width: wp(100),
    height: hp(100),
  },
  centeredView: {
    marginTop: hp(35),
    marginHorizontal: wp(10),
    elevation: 2,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: wp(3),
  },
  modalheading: {
    color: 'rgba(0,0,0,0.5)',
    fontSize: RFValue(11),
    fontWeight: '500',
    marginTop: hp('1.3%'),
  },
  modaltextInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  passwordStyle: {
    height: hp('6%'),
    fontSize: RFValue(14),
    flex: 12,
    padding: 0,
  },
  visibilityIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  visibilityIcon: {
    width: hp(2.5),
    height: hp(2.5),
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(12),
  },
  signup: {
    backgroundColor: COLORS.BLUE,
    borderRadius: hp(1),
  },
  cancelContainer: {
    width: '46%',
    marginVertical: hp(1),
    height: hp(4),
    justifyContent: 'center',
  },
  update: {
    backgroundColor: '#00A5FF',
    borderRadius: hp(1),
    height: hp(6.5),
  },
  cancel: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: hp(1),
  },
  genderheading: {
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
    marginBottom: hp('0.8'),
    alignItems: 'center',
  },
  text: {
    marginLeft: wp('1%'),
    fontSize: RFValue(11),
  },
  radioContainer: {
    flexDirection: 'row',
    marginLeft: wp('10%'),
    alignItems: 'center',
  },
  emailHeading: {
    color: 'rgba(0,0,0,0.5)',
    fontSize: RFValue(11),
    fontWeight: '500',
    marginTop: hp(0.4),
  },
  buttonTitle: {
    fontSize: RFValue(18),
  },
  updateContainer: {
    width: '100%',
    marginVertical: hp(1),
    height: hp(6.5),
  },
  selectionModal: {
    width: '90%',
    height: '30%',
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    bottom: '10%',
    position: 'absolute',
    borderRadius: hp(1),
  },
  itemViewHeading: {
    color: '#212121',
    fontSize: RFValue(16),
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  selectionSubModal: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  itemViewContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: hp(5),
    width: wp(6),
    resizeMode: 'contain',
  },
});

export default styles;
