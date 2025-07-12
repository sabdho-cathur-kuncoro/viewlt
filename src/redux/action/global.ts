import {Action, Dispatch} from '@reduxjs/toolkit';
import {APIBEARER} from '../../constant/API';
import {storage} from '../../utils/storage';

export const setLoading = (value: boolean) => {
  return {type: 'SET_LOADING', value};
};

export const setBtnLoading = (value: boolean) => {
  return {type: 'SET_BTN_LOADING', value};
};

export const setToast = ({
  toastVisible,
  toastType,
  toastMessage,
  toastDuration,
}: {
  toastVisible: boolean;
  toastType: string;
  toastMessage: string;
  toastDuration: number | null;
}) => {
  return {
    type: 'SET_TOAST',
    value: {
      toastVisible,
      toastType,
      toastMessage,
      toastDuration,
    },
  };
};

export const setPopup = ({
  popupVisible,
  popupIcon,
  popupTitle,
  popupMessage,
  popupDuration,
}: {
  popupVisible: boolean;
  popupIcon: string;
  popupTitle: string;
  popupMessage: string;
  popupDuration: number | null;
}) => {
  return {
    type: 'SET_POPUP',
    value: {
      popupVisible,
      popupIcon,
      popupTitle,
      popupMessage,
      popupDuration,
    },
  };
};

export const setAppVersion = (value: string) => {
  return {type: 'SET_APP_VERSION', value};
};
export const setMechanism = (value: any[]) => {
  return {type: 'SET_MECHANISM', value};
};

export const postResetDeviceAction =
  () => async (dispatch: Dispatch<Action>) => {
    try {
      dispatch(setLoading(true));
      const user_name = storage.getString('username');
      const password = storage.getString('password');
      const data = {
        user_name,
        password,
      };
      const response = await APIBEARER.post('user/reset-device', data);
      const res = response?.data;
      if (response?.status === 200 && res?.code === 200) {
        dispatch(
          setToast({
            toastVisible: true,
            toastType: 'danger',
            toastMessage:
              `[${response?.status ?? '-'}] ${res?.message}` ||
              `[${response?.status ?? '-'}] Reset device succesfully`,
            toastDuration: 3000,
          }),
        );
      } else {
        dispatch(
          setToast({
            toastVisible: true,
            toastType: 'danger',
            toastMessage:
              `[${response?.status ?? '-'}] ${res?.message}` ||
              `[${response?.status ?? '-'}] Reset device failed`,
            toastDuration: 3000,
          }),
        );
      }
    } catch (err: any) {
      const error = err?.response;
      console.log('[err]', error);
      dispatch(
        setToast({
          toastVisible: true,
          toastType: 'danger',
          toastMessage:
            `[${error?.status ?? '-'}]${error?.data?.message}` ||
            '[System]Error send some data',
          toastDuration: 3000,
        }),
      );
    } finally {
      dispatch(setLoading(false));
    }
  };
