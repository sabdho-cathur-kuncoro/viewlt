/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {FocusAwareStatusBar, Gap, Button} from '../../components';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {PERMISSIONS} from 'react-native-permissions';
import {useIsFocused} from '@react-navigation/native';
import {useAppDispatch} from '../../redux/hooks';
import {setToast} from '../../redux/action/global';
import {
  bgColor2,
  blackTextStyle,
  borderColor,
  FontFamily,
  greyColor,
  primaryColor,
  whiteColor,
} from '../../constant/theme';
import {checkMultiplePermissions} from '../../utils/helper';
import {loginAction} from '../../redux/action/auth';

const Login = ({navigation}: any) => {
  const [userId, setUserId] = useState<string>('sabdho.kuncoro');
  const [password, setPassword] = useState<string>('P@ssword123');
  const [isVisiblePass, setIsVisiblePass] = useState({
    icon: 'eye-off',
    pass: true,
  });
  const userIdRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);

  const isFocused = useIsFocused();
  const dispatch = useAppDispatch();

  useEffect(() => {
    isFocused && checkPermission();
  }, [isFocused]);

  async function checkPermission() {
    try {
      setTimeout(() => {
        const arrPermissions = [
          PERMISSIONS.ANDROID.CAMERA,
          PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ];
        checkMultiplePermissions(arrPermissions);
      }, 800);
    } catch (err) {
      console.log(err);
    }
  }

  const changeVisiblePass = () => {
    setIsVisiblePass(prevState => ({
      icon: prevState.icon === 'eye' ? 'eye-off' : 'eye',
      pass: !prevState.pass,
    }));
  };

  const onLogin = async () => {
    const data = {
      user_name: userId,
      password: password,
    };
    if (userId === '') {
      dispatch(
        setToast({
          toastVisible: true,
          toastType: 'warning',
          toastMessage: 'User ID tidak boleh kosong',
          toastDuration: 2000,
        }),
      );
      userIdRef?.current?.focus();
    } else if (password === '') {
      dispatch(
        setToast({
          toastVisible: true,
          toastType: 'warning',
          toastMessage: 'Password tidak boleh kosong',
          toastDuration: 2000,
        }),
      );
      passwordRef?.current?.focus();
    } else {
      dispatch(loginAction(data, navigation));
      // navigation.replace('Home');
    }
  };
  return (
    <View style={styles.page}>
      <FocusAwareStatusBar
        backgroundColor={bgColor2}
        barStyle={'dark-content'}
      />
      <Gap height={48} />
      <View
        style={{
          width: '100%',
          backgroundColor: whiteColor,
          borderRadius: 32,
          padding: 16,
        }}>
        <Text
          style={[
            blackTextStyle,
            {
              fontFamily: FontFamily.poppinsBold,
              fontSize: 24,
            },
          ]}>
          Sign In
        </Text>
        <Text
          style={[
            blackTextStyle,
            {
              fontFamily: FontFamily.poppinsLight,
            },
          ]}>
          Let's start your activity today!
        </Text>
        <Gap height={24} />
        <Text
          style={[
            blackTextStyle,
            {
              fontFamily: FontFamily.poppinsSemiBold,
              fontSize: 16,
            },
          ]}>
          Username
        </Text>
        <Gap height={4} />
        <View style={styles.input}>
          <TextInput
            ref={userIdRef}
            value={userId}
            onChangeText={text => setUserId(text)}
            placeholder="25001"
            placeholderTextColor={greyColor}
            style={blackTextStyle}
          />
        </View>
        <Gap height={16} />
        <Text
          style={[
            blackTextStyle,
            {
              fontFamily: FontFamily.poppinsSemiBold,
              fontSize: 16,
            },
          ]}>
          Password
        </Text>
        <Gap height={4} />
        <View
          style={[styles.input, {flexDirection: 'row', alignItems: 'center'}]}>
          <TextInput
            ref={passwordRef}
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry={isVisiblePass.pass}
            placeholder={isVisiblePass.pass ? '**********' : 'your password'}
            placeholderTextColor={greyColor}
            style={[blackTextStyle, {width: '90%'}]}
            onSubmitEditing={onLogin}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={changeVisiblePass}
            style={{
              width: '10%',
              alignItems: 'flex-end',
            }}>
            <MaterialIcon
              name={isVisiblePass.icon}
              size={24}
              color={greyColor}
            />
          </TouchableOpacity>
        </View>
        <Gap height={24} />
        <Button
          title="Sign In"
          bgColor={primaryColor}
          borderRadius={16}
          height={56}
          fontSize={16}
          onPress={onLogin}
        />
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: bgColor2,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: borderColor,
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
});
