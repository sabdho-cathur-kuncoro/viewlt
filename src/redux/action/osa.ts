import {Action, Dispatch} from '@reduxjs/toolkit';
import {APIBEARER} from '../../constant/API';
import {setBtnLoading, setLoading, setToast} from './global';
import {storage} from '../../utils/storage';

export const getProductStockAction =
  () => async (dispatch: Dispatch<Action>) => {
    try {
      dispatch(setLoading(true));
      const sales_id = storage.getString('salesId');
      const date = new Date();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      //   const visit_date = setDateView(date, 'YYYY-MM-DD');
      const response = await APIBEARER.get(
        `product-stock/get-osa-mobile/${sales_id}/${month}/${year}`,
      );
      const res = response?.data;
      if (response?.status === 200 && res?.code === 200) {
        return res;
      } else {
        dispatch(
          setToast({
            toastVisible: true,
            toastType: 'danger',
            toastMessage:
              `[${response?.status ?? '-'}] ${res?.message}` ||
              `[${
                response?.status ?? '-'
              }] Store failed to get, please try again later`,
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
            '[System]Error get some data',
          toastDuration: 3000,
        }),
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

export const postProductStockAction =
  (data: any, navigation: any) => async (dispatch: Dispatch<Action>) => {
    try {
      dispatch(setBtnLoading(true));
      //   const sales_id = storage.getString('salesId');
      //   const visit_date = setDateView(date, 'YYYY-MM-DD');
      const response = await APIBEARER.post('product-stock/stock-osa', data);
      const res = response?.data;
      if (response?.status === 200 && res?.code === 200) {
        dispatch(
          setToast({
            toastVisible: true,
            toastType: 'success',
            toastMessage: res?.message || 'Stock update succesfully',
            toastDuration: 3000,
          }),
        );
        navigation.pop();
        return res;
      } else {
        dispatch(
          setToast({
            toastVisible: true,
            toastType: 'danger',
            toastMessage:
              `[${response?.status ?? '-'}] ${res?.message}` ||
              `[${response?.status ?? '-'}] Stock update failed`,
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
      dispatch(setBtnLoading(false));
    }
  };
