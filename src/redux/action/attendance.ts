import {Action, Dispatch} from '@reduxjs/toolkit';
import {APIBEARER} from '../../constant/API';
import {setBtnLoading, setLoading, setToast} from './global';
import {StackActions} from '@react-navigation/native';
import {storage} from '../../utils/storage';

export const presenceAction =
  (data: any, type: number, navigation: any) =>
  async (dispatch: Dispatch<Action>) => {
    try {
      dispatch(setBtnLoading(true));
      const response = await APIBEARER.post(
        `${type === 1 ? 'attendance/clock-in' : 'attendance/clock-out'}`,
        data,
      );
      const res = response?.data;
      console.log(response);
      if (response?.status === 200) {
        dispatch(
          setToast({
            toastVisible: true,
            toastType: 'success',
            toastMessage:
              res?.message ||
              `${type === 1 ? 'Clock In' : 'Clock Out'} Success!`,
            toastDuration: 3000,
          }),
        );
        navigation.dispatch(StackActions.popToTop());
      } else {
        dispatch(
          setToast({
            toastVisible: true,
            toastType: 'danger',
            toastMessage: `[${res?.status}]Presence failed, please try again later`,
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
            `[${error?.status}]${error?.data?.message}` ||
            '[System]Error Presence',
          toastDuration: 3000,
        }),
      );
    } finally {
      dispatch(setBtnLoading(false));
    }
  };

export const getAttendanceReportAction =
  (month: number, year: number) => async (dispatch: Dispatch<Action>) => {
    try {
      dispatch(setLoading(true));
      const sales_id = await storage.getString('salesId');
      const response = await APIBEARER.get(
        `attendance/attendance-mobile-sales/${sales_id}/${month}/${year}`,
      );
      const res = response?.data;
      if (response?.status === 200) {
        return res;
      } else {
        dispatch(
          setToast({
            toastVisible: true,
            toastType: 'danger',
            toastMessage:
              `[${response?.status}] ${res?.message}` ||
              `[${response?.status}] Presence Report failed to get, please try again later`,
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
            `[${error?.status}]${error?.data?.message}` ||
            '[System]Error Presence',
          toastDuration: 3000,
        }),
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

export const getAttendanceReportDetailAction =
  (attendance_date: string) => async (dispatch: Dispatch<Action>) => {
    try {
      dispatch(setLoading(true));
      const sales_id = await storage.getString('salesId');
      const response = await APIBEARER.get(
        `attendance/attendance-sales-date/${sales_id}/${attendance_date}`,
      );
      const res = response?.data;
      if (response?.status === 200) {
        return res;
      } else {
        dispatch(
          setToast({
            toastVisible: true,
            toastType: 'danger',
            toastMessage:
              `[${response?.status}] ${res?.message}` ||
              `[${response?.status}] Presence Report failed to get, please try again later`,
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
            `[${error?.status}]${error?.data?.message}` ||
            '[System]Error Presence',
          toastDuration: 3000,
        }),
      );
    } finally {
      dispatch(setLoading(false));
    }
  };
