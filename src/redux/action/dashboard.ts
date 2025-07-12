/* eslint-disable radix */
import {Action, Dispatch} from '@reduxjs/toolkit';
import {APIBEARER} from '../../constant/API';
import {storage} from '../../utils/storage';
import {setToast} from './global';
import {primaryColor, primaryRGBAColor} from '../../constant/theme';
import {setDateView} from '../../utils/helper';

export const getDashboardAttendanceAction =
  () => async (dispatch: Dispatch<Action>) => {
    try {
      const sales_id = storage.getString('salesId');
      const response = await APIBEARER.get(`dashboard/attendance/${sales_id}`);
      const res = response?.data;
      if (response?.status === 200 && res?.code === 200) {
        const temp = res?.result[0];
        const d = new Date();
        const date = setDateView(d, 'DD-MM-YYYY');
        const inDate = setDateView(temp?.incoming_attendance, 'DD-MM-YYYY');
        const outDate = setDateView(temp?.repeat_attendance, 'DD-MM-YYYY');
        const data = {
          // ...temp,
          // in_time: setDateView(temp?.incoming_attendance, 'HH:mm'),
          // out_time: setDateView(temp?.repeat_attendance, 'HH:mm'),
          done_clock_in: date === inDate ? true : false,
          done_clock_out: date === outDate ? true : false,
        };
        return data;
      }
    } catch (err: any) {
      const error = err?.response;
      // console.log('[err]', error);
      dispatch(
        setToast({
          toastVisible: true,
          toastType: 'danger',
          toastMessage:
            `[${error?.status ?? '-'}]${error?.data?.message}` ||
            '[System]Error get some data',
          toastDuration: 3000,
        }),
      );
    }
  };

export const getDashboardDailyActivitiesAction =
  () => async (dispatch: Dispatch<Action>) => {
    try {
      const sales_id = storage.getString('salesId');
      const response = await APIBEARER.get(
        `dashboard/today-activities/${sales_id}`,
      );
      const res = response?.data;
      if (response?.status === 200 && res?.code === 200) {
        return res?.result[0];
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
            '[System]Error get some data',
          toastDuration: 3000,
        }),
      );
    }
  };

export const getDashboardStoreVisitMonthlyAction =
  () => async (dispatch: Dispatch<Action>) => {
    try {
      const sales_id = storage.getString('salesId');
      const d = new Date();
      const m = d.getMonth() + 1;
      const response = await APIBEARER.get(
        `dashboard/store-visit-monthly/${sales_id}`,
      );
      const res = response?.data;
      if (response?.status === 200 && res?.code === 200) {
        const dataTemp = res?.result?.filter(
          (datas: any) => parseInt(datas?.month) === m,
        );
        let data_percent = [];
        const target = dataTemp[0]?.target_visit;
        const done = dataTemp[0]?.total_visit;
        const calPercent = (done / target) * 100;
        const percentDone = calPercent <= 100 ? calPercent : 100;
        const percentTarget = calPercent <= 100 ? 100 - calPercent : 0;
        if (percentDone === 100) {
          data_percent = [{value: percentDone, color: primaryColor as string}];
        } else {
          data_percent = [
            {value: percentTarget, color: primaryRGBAColor as string},
            {value: percentDone, color: primaryColor as string},
          ];
        }
        const data = {
          ...dataTemp[0],
          percent_done: percentDone,
          data_percent,
        };
        return data;
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
            '[System]Error get some data',
          toastDuration: 3000,
        }),
      );
    }
  };
