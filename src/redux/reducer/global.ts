type stateType = {
  isLoading?: boolean;
  btnLoading?: boolean;
  appVersion?: string;
  toastVisible?: boolean;
  toastMessage?: string;
  toastType?: string;
  toastDuration?: number;
  popupVisible?: boolean;
  popupIcon?: string;
  popupTitle?: string;
  popupMessage?: string;
  popupDuration?: number;
  mechanism?: any[];
};

const initGlobalState = {
  isLoading: false,
  btnLoading: false,
  appVersion: '',
  toastVisible: false,
  toastMessage: '',
  toastType: '',
  toastDuration: 0,
  popupVisible: false,
  popupIcon: '',
  popupTitle: '',
  popupMessage: '',
  popupDuration: 0,
  mechanism: [],
};

export const globalReducer = (
  state: stateType = initGlobalState,
  action: any,
) => {
  if (action.type === 'SET_LOADING') {
    return {
      ...state,
      isLoading: action.value,
    };
  }
  if (action.type === 'SET_BTN_LOADING') {
    return {
      ...state,
      btnLoading: action.value,
    };
  }
  if (action.type === 'SET_TOAST') {
    return {
      ...state,
      toastVisible: action.value.toastVisible,
      toastMessage: action.value.toastMessage,
      toastType: action.value.toastType,
      toastDuration: action.value.toastDuration,
    };
  }
  if (action.type === 'SET_POPUP') {
    return {
      ...state,
      popupVisible: action.value.popupVisible,
      popupIcon: action.value.popupIcon,
      popupTitle: action.value.popupTitle,
      popupMessage: action.value.popupMessage,
      popupDuration: action.value.popupDuration,
    };
  }
  if (action.type === 'SET_APP_VERSION') {
    return {
      ...state,
      appVersion: action.value,
    };
  }
  if (action.type === 'SET_MECHANISM') {
    return {
      ...state,
      mechanism: action.value,
    };
  }
  return state;
};
