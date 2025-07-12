import {Action, Dispatch} from '@reduxjs/toolkit';
import {APIBEARER} from '../../constant/API';
import {setBtnLoading, setLoading, setMechanism, setToast} from './global';
// import {storage} from '../../utils/storage';

export const getProductAction = () => async (dispatch: Dispatch<Action>) => {
  try {
    dispatch(setLoading(true));
    //   const sales_id = storage.getString('salesId');
    //   const date = new Date();
    //   const visit_date = setDateView(date, 'YYYY-MM-DD');
    const response = await APIBEARER.get('product/get-product');
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

export const getPricingMechanismAction =
  () => async (dispatch: Dispatch<Action>) => {
    try {
      // dispatch(setLoading(true));
      const response = await APIBEARER.get('product-pricing/get-mechanisme');
      const res = response?.data;
      if (response?.status === 200 && res?.code === 200) {
        const data = res?.result?.map((i: any) => {
          return {
            label: i?.name,
            value: i?.name,
          };
        });
        dispatch(setMechanism(data));
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
    }
  };

export const postProductPriceAction =
  (data: any, navigation: any) => async (dispatch: Dispatch<Action>) => {
    try {
      dispatch(setBtnLoading(true));
      const response = await APIBEARER.post('product-pricing/price', data);
      const res = response?.data;
      if (response?.status === 200 && res?.code === 200) {
        dispatch(
          setToast({
            toastVisible: true,
            toastType: 'success',
            toastMessage: res?.message || 'Price update succesfully',
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
              `[${response?.status ?? '-'}] Price update failed`,
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
