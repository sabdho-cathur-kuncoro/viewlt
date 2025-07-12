/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {
  FontFamily,
  primaryColor,
  primaryTextStyle,
  whiteColor,
} from '../../constant/theme';
import {FocusAwareStatusBar} from '../../components';
import {useAppDispatch} from '../../redux/hooks';
import {storage} from '../../utils/storage';
import {loginSplashAction} from '../../redux/action/auth';

const Splash = ({navigation}: any) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    onLogin();
  }, []);

  async function onLogin() {
    try {
      setTimeout(async () => {
        let user_name = storage.getString('username');
        let password = storage.getString('password');
        const form = {
          user_name,
          password,
        };
        if (user_name !== undefined && password !== undefined) {
          dispatch(loginSplashAction(form, navigation));
        } else {
          navigation.replace('Login');
        }
      }, 500);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <FocusAwareStatusBar
        backgroundColor={primaryColor}
        barStyle={'light-content'}
      />
      <View
        style={{
          paddingHorizontal: 24,
          paddingVertical: 8,
          borderRadius: 16,
          backgroundColor: whiteColor,
        }}>
        <Text
          style={[
            primaryTextStyle,
            {fontSize: 32, fontFamily: FontFamily.poppinsMedium},
          ]}>
          ViewLT
        </Text>
      </View>
    </View>
  );
};

export default Splash;
