import {Action, Dispatch} from '@reduxjs/toolkit';
import {setBtnLoading, setToast} from './global';
import {storage} from '../../utils/storage';
import {APIBASIC, APIBEARER} from '../../constant/API';
import DeviceInfo from 'react-native-device-info';

export const loginAction =
  (data: any, navigation: any) => async (dispatch: Dispatch<Action>) => {
    try {
      dispatch(setBtnLoading(true));
      const deviceId = await DeviceInfo.syncUniqueId();
      const form = {
        ...data,
        device_id: deviceId,
      };
      const response = await APIBASIC.post('user/login', form);
      const res = response?.data;
      // console.log(res);
      if (response?.status === 200 && res?.success) {
        storage.set('fullName', res?.sales_name);
        storage.set('username', res?.user_name);
        storage.set('salesId', res?.sales_id);
        storage.set('password', data.password);
        storage.set('deviceId', deviceId);
        storage.set('token', res?.token);
        // storage.set('refreshToken', res?.refreshToken);
        // storage.set('generalId', res?.general_id);
        // storage.set('role', res?.role);
        // storage.set('roleId', res?.role_id);
        // subscribeTopic(res?.user_id);
        dispatch(
          setToast({
            toastVisible: true,
            toastType: 'success',
            toastMessage: res?.message || 'Login Success!',
            toastDuration: 3000,
          }),
        );
        navigation.reset({index: 0, routes: [{name: 'Home'}]});
      } else if (res?.code === 401) {
        dispatch(
          setToast({
            toastVisible: true,
            toastType: 'danger',
            toastMessage: `[${
              res?.status ?? '-'
            }]Nomor telepon atau password salah`,
            toastDuration: 3000,
          }),
        );
      } else if (res?.code === 404) {
        dispatch(
          setToast({
            toastVisible: true,
            toastType: 'danger',
            toastMessage: `[${res?.status ?? '-'}]User tidak ditemukan`,
            toastDuration: 3000,
          }),
        );
      } else {
        dispatch(
          setToast({
            toastVisible: true,
            toastType: 'danger',
            toastMessage: `[${
              res?.status ?? '-'
            }]Terjadi kesalahan saat login, silahkan ulangi kembali`,
            toastDuration: 3000,
          }),
        );
      }
    } catch (err: any) {
      const error = err?.response?.data;
      console.log('[err]', error);
      dispatch(
        setToast({
          toastVisible: true,
          toastType: 'danger',
          toastMessage:
            `[${error?.code ?? '-'}]${error?.message}` || '[System]Error login',
          toastDuration: 3000,
        }),
      );
    } finally {
      dispatch(setBtnLoading(false));
    }
  };
export const loginSplashAction =
  (data: any, navigation: any) => async (dispatch: Dispatch<Action>) => {
    try {
      dispatch(setBtnLoading(true));
      const deviceId = await DeviceInfo.syncUniqueId();
      const form = {
        ...data,
        device_id: deviceId,
      };
      const response = await APIBASIC.post('user/login', form);
      const res = response?.data;
      if (response?.status === 200 && res?.success) {
        storage.set('token', res?.token);
        navigation.reset({index: 0, routes: [{name: 'Home'}]});
      } else if (res?.code === 401) {
        dispatch(
          setToast({
            toastVisible: true,
            toastType: 'danger',
            toastMessage: `[${
              res?.status ?? '-'
            }]Nomor telepon atau password salah`,
            toastDuration: 3000,
          }),
        );
        navigation.replace('Login');
      } else if (res?.code === 404) {
        dispatch(
          setToast({
            toastVisible: true,
            toastType: 'danger',
            toastMessage: `[${res?.status ?? '-'}]User tidak ditemukan`,
            toastDuration: 3000,
          }),
        );
        navigation.replace('Login');
      } else {
        dispatch(
          setToast({
            toastVisible: true,
            toastType: 'danger',
            toastMessage:
              `[${response.status ?? '-'}] ${res?.message}` ||
              `[${
                res?.status ?? '-'
              }]Terjadi kesalahan saat login, silahkan ulangi kembali`,
            toastDuration: 3000,
          }),
        );
        navigation.replace('Login');
      }
    } catch (err: any) {
      const error = err?.response?.data;
      dispatch(
        setToast({
          toastVisible: true,
          toastType: 'danger',
          toastMessage:
            `[${error?.code ?? '-'}]${error?.message}` || '[System]Error login',
          toastDuration: 3000,
        }),
      );
      navigation.replace('Login');
    } finally {
      dispatch(setBtnLoading(false));
    }
  };

export const logoutAction =
  (navigation: any) => async (dispatch: Dispatch<Action>) => {
    try {
      dispatch(setBtnLoading(true));
      const username = await storage.getString('username');
      const deviceId = await DeviceInfo.syncUniqueId();
      const form = {
        user_name: username,
        device_id: deviceId,
      };
      console.log(form);
      const response = await APIBEARER.post('user/logout', form);
      const res = response?.data;
      // console.log(response);
      if (response?.status === 200) {
        await storage.clearAll();
        // storage.set('telepon', data.user_id);
        // storage.set('salesId', res?.sales_id);
        // storage.set('password', data.password);
        // storage.set('token', res?.token);
        // storage.set('username', res?.user_name);
        // storage.set('refreshToken', res?.refreshToken);
        // storage.set('generalId', res?.general_id);
        // storage.set('role', res?.role);
        // storage.set('roleId', res?.role_id);
        // subscribeTopic(res?.user_id);
        dispatch(
          setToast({
            toastVisible: true,
            toastType: 'success',
            toastMessage: res?.message || 'Logout Success!',
            toastDuration: 3000,
          }),
        );
        navigation.replace('Login');
      } else {
        dispatch(
          setToast({
            toastVisible: true,
            toastType: 'danger',
            toastMessage: `[${
              res?.status ?? '-'
            }]Terjadi kesalahan saat logout, silahkan ulangi kembali`,
            toastDuration: 3000,
          }),
        );
      }
    } catch (err: any) {
      const error = err?.response?.data;
      console.log('[err]', error);
      dispatch(
        setToast({
          toastVisible: true,
          toastType: 'danger',
          toastMessage:
            `[${error?.code ?? '-'}]${error?.message}` ||
            '[System]Error logout',
          toastDuration: 3000,
        }),
      );
    } finally {
      dispatch(setBtnLoading(false));
    }
  };
