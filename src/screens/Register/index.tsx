import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  Button,
  Dropdown,
  FocusAwareStatusBar,
  Gap,
  Header,
} from '../../components';
import {
  bgColor2,
  blackTextStyle,
  borderColor,
  greenColor,
  greenRGBAColor,
  greenTextStyle,
  greyColor,
  greyTextStyle,
  greyThirdColor,
  primaryColor,
  whiteColor,
} from '../../constant/theme';
import {layout} from '../../constant/style';
import {setDateView} from '../../utils/helper';
import IcMaterialCom from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useAppDispatch} from '../../redux/hooks';
import {setToast} from '../../redux/action/global';

const genders = [
  {value: 1, label: 'Pria'},
  {value: 2, label: 'Wanita'},
];

const Register = ({navigation}: any) => {
  const [name, setName] = useState<string>('');
  const [religion, setReligion] = useState<string>('');
  const [education, setEducation] = useState<string>('');
  const [address, setaddress] = useState<string>('');
  const [placeofBirth, setPlaceofBirth] = useState<string>('');
  const [dateofBirth, setDateofBirth] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [labelGender, setLabelGender] = useState<string>('');
  const [isGenderVisible, setIsGenderVisible] = useState(false);
  const [startShow, setStartShow] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [step, setStep] = useState<number>(1);

  const dispatch = useAppDispatch();

  // ONCHANGE START DATE
  const onChangeStartDate = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setStartShow(false);
    setStartDate(currentDate);
  };

  // MODAL DROPDOWN
  const changeModalVisibilityGender = (bool: boolean) => {
    setIsGenderVisible(bool);
  };
  const setDataGender = (option: any, label: any) => {
    setLabelGender(label);
  };

  async function onHandleRegistration() {
    try {
      dispatch(
        setToast({
          toastVisible: true,
          toastType: 'success',
          toastMessage: 'Success Registration',
          toastDuration: 2000,
        }),
      );
      navigation.pop();
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <View style={styles.page}>
      <FocusAwareStatusBar
        backgroundColor={whiteColor}
        barStyle={'dark-content'}
      />
      <Header
        title="User Registration"
        bgColor={whiteColor}
        onPress={() => navigation.pop()}
      />
      {/* // NOTE: STEP */}
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
        }}>
        <View
          style={[styles.stepContent, {borderBottomWidth: step === 1 ? 1 : 0}]}>
          <Text style={[step === 1 ? greenTextStyle : greyTextStyle]}>
            Personal Details
          </Text>
        </View>
        <View
          style={[styles.stepContent, {borderBottomWidth: step === 2 ? 1 : 0}]}>
          <Text style={[step === 2 ? greenTextStyle : greyTextStyle]}>
            Account Information
          </Text>
        </View>
      </View>
      {/* // NOTE: Personal Details */}
      {step === 1 ? (
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingTop: 16,
            paddingBottom: 50,
          }}>
          <Text style={[blackTextStyle]}>Full Name</Text>
          <View style={[styles.input]}>
            <TextInput style={[blackTextStyle]} />
          </View>
          <Gap height={10} />
          <Text style={[blackTextStyle]}>Gender</Text>
          <Dropdown
            visible={isGenderVisible}
            data={genders}
            label={labelGender}
            height={48}
            borderRadius={16}
            isBorder={false}
            backgroundColor={greyThirdColor}
            setLabel={setLabelGender}
            setData={setDataGender}
            changeModalVisibility={changeModalVisibilityGender}
          />
          <Gap height={10} />
          <Text style={[blackTextStyle]}>Place of Birth</Text>
          <View style={[styles.input]}>
            <TextInput style={[blackTextStyle]} />
          </View>
          <Gap height={10} />
          <Text style={[blackTextStyle]}>Date of Birth</Text>
          <View style={[styles.input]}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setStartShow(true)}
              style={[styles.dateContainer]}>
              <Text style={[blackTextStyle, {fontSize: 12}]}>
                {setDateView(startDate, 'DD-MM-YYYY')}
              </Text>
              <IcMaterialCom name={'calendar'} size={24} color={greyColor} />
            </TouchableOpacity>
          </View>
          <Gap height={10} />
          <Text style={[blackTextStyle]}>Religion</Text>
          <View style={[styles.input]}>
            <TextInput style={[blackTextStyle]} />
          </View>
          <Gap height={10} />
          <Text style={[blackTextStyle]}>Education</Text>
          <View style={[styles.input]}>
            <TextInput style={[blackTextStyle]} />
          </View>
          <Gap height={10} />
          <Text style={[blackTextStyle]}>Address</Text>
          <View style={[styles.input, {height: 60}]}>
            <TextInput style={[blackTextStyle]} multiline />
          </View>
          <Gap height={20} />
        </ScrollView>
      ) : (
        <></>
      )}
      {/* // NOTE: ACCOUNT INFORMATION */}
      {step === 2 ? (
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingTop: 16,
            paddingBottom: 50,
          }}>
          <Text style={[blackTextStyle]}>Email</Text>
          <View style={[styles.input]}>
            <TextInput style={[blackTextStyle]} />
          </View>
          <Gap height={10} />
          <Text style={[blackTextStyle]}>Phone Number</Text>
          <View style={[styles.input]}>
            <TextInput style={[blackTextStyle]} />
          </View>
          <Gap height={10} />
          <Text style={[blackTextStyle]}>Username</Text>
          <View style={[styles.input]}>
            <TextInput style={[blackTextStyle]} />
          </View>
          <Gap height={10} />
          <Text style={[blackTextStyle]}>Password</Text>
          <View style={[styles.input]}>
            <TextInput style={[blackTextStyle]} secureTextEntry />
          </View>
          <Gap height={20} />
        </ScrollView>
      ) : (
        <></>
      )}
      <View style={{paddingHorizontal: 16}}>
        {step === 1 ? (
          <Button title="Next" onPress={() => setStep(2)} />
        ) : (
          <View
            style={{
              width: 'auto',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{width: '49%'}}>
              <Button
                title="Go Back"
                bgColor={whiteColor}
                titleColor={primaryColor}
                borderColor={primaryColor}
                borderWidth={1}
                onPress={() => setStep(1)}
              />
            </View>
            <View style={{width: '49%'}}>
              <Button
                title="Send Registration"
                onPress={onHandleRegistration}
              />
            </View>
          </View>
        )}
      </View>
      {startShow && (
        <DateTimePicker
          testID="dateTimePicker"
          value={startDate}
          mode={'date'}
          onChange={onChangeStartDate}
        />
      )}
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: whiteColor,
    paddingTop: 16,
  },
  input: {
    width: '100%',
    height: 48,
    borderRadius: 16,
    backgroundColor: greyThirdColor,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stepContent: {
    width: '48%',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderBottomColor: greenColor,
  },
});
