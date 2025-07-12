import {Action, Dispatch} from '@reduxjs/toolkit';
import {APIBEARER} from '../../constant/API';
// import {storage} from '../../utils/storage';
import {setBtnLoading, setLoading, setToast} from './global';
import {storage} from '../../utils/storage';
import {StackActions} from '@react-navigation/native';
import {setDateView} from '../../utils/helper';

export const getStoreAction = () => async (dispatch: Dispatch<Action>) => {
  try {
    dispatch(setLoading(true));
    const sales_id = storage.getString('salesId');
    const response = await APIBEARER.get(`store/region-store/${sales_id}`);
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

export const getStoreVisitAction =
  (store_id: string) => async (dispatch: Dispatch<Action>) => {
    try {
      dispatch(setLoading(true));
      const sales_id = storage.getString('salesId');
      const date = new Date();
      const visit_date = setDateView(date, 'YYYY-MM-DD');
      const response = await APIBEARER.get(
        `store-visit/store-visit-date/${sales_id}/${store_id}/${visit_date}`,
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

export const postStoreVisitAction =
  (data: any, navigation: any) => async (dispatch: Dispatch<Action>) => {
    try {
      dispatch(setBtnLoading(true));
      dispatch(setLoading(true));
      const response = await APIBEARER.post('store-visit/visit', data);
      const res = response?.data;
      console.log(response);
      if (response?.status === 200) {
        dispatch(
          setToast({
            toastVisible: true,
            toastType: 'success',
            toastMessage: 'Store zonation input success',
            toastDuration: 3000,
          }),
        );
        navigation.dispatch(StackActions.pop(3));
      } else {
        dispatch(
          setToast({
            toastVisible: true,
            toastType: 'danger',
            toastMessage:
              `[${response?.status ?? '-'}] ${res?.message}` ||
              `[${
                response?.status ?? '-'
              }] Store visit failed, please try again later`,
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
      dispatch(setLoading(false));
    }
  };

export const postReportStoreVisitAction =
  (data: any, navigation: any, type: number) =>
  async (dispatch: Dispatch<Action>) => {
    try {
      dispatch(setBtnLoading(true));
      const response = await APIBEARER.post(
        `photo-product/${
          type === 1
            ? 'home-shelf'
            : type === 2
            ? 'coc-cashier'
            : type === 3
            ? 'secondary-display'
            : '-'
        }`,
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
              `Report ${
                type === 1
                  ? 'homeshelf'
                  : type === 2
                  ? 'coc cashier'
                  : type === 3
                  ? 'secondary display'
                  : 'unknown'
              } saved successfully`,
            toastDuration: 3000,
          }),
        );
        navigation.dispatch(StackActions.pop());
      } else {
        dispatch(
          setToast({
            toastVisible: true,
            toastType: 'danger',
            toastMessage:
              `[${response?.status ?? '-'}] ${res?.message}` ||
              `[${response?.status ?? '-'}] Report ${
                type === 1
                  ? 'homeshelf'
                  : type === 2
                  ? 'coc cashier'
                  : type === 3
                  ? 'secondary display'
                  : 'unknown'
              } failed, please try again later`,
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

export const postReportCashierAction =
  (data: any, navigation: any) => async (dispatch: Dispatch<Action>) => {
    try {
      dispatch(setBtnLoading(true));
      const response = await APIBEARER.post('photo-product/coc-cashier', data);
      const res = response?.data;
      console.log(response);
      if (response?.status === 200) {
        dispatch(
          setToast({
            toastVisible: true,
            toastType: 'success',
            toastMessage: 'Report COC cashier input success',
            toastDuration: 3000,
          }),
        );
        navigation.dispatch(StackActions.pop());
      } else {
        dispatch(
          setToast({
            toastVisible: true,
            toastType: 'danger',
            toastMessage:
              `[${response?.status ?? '-'}] ${res?.message}` ||
              `[${
                response?.status ?? '-'
              }] Report COC cashier failed, please try again later`,
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

export const postReportSecondaryAction =
  (data: any, navigation: any) => async (dispatch: Dispatch<Action>) => {
    try {
      dispatch(setBtnLoading(true));
      const response = await APIBEARER.post(
        'photo-product/secondary-display',
        data,
      );
      const res = response?.data;
      console.log(response);
      if (response?.status === 200) {
        dispatch(
          setToast({
            toastVisible: true,
            toastType: 'success',
            toastMessage: 'Report secondary display input success',
            toastDuration: 3000,
          }),
        );
        navigation.dispatch(StackActions.pop());
      } else {
        dispatch(
          setToast({
            toastVisible: true,
            toastType: 'danger',
            toastMessage:
              `[${response?.status ?? '-'}] ${res?.message}` ||
              `[${
                response?.status ?? '-'
              }] Report secondary display failed, please try again later`,
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
