import moment from 'moment';
import {requestMultiple, RESULTS} from 'react-native-permissions';

export const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
export const regPhone = /^[0-9\b]+$/;

export const wait = (timeout: number) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

export const setDateView = (date: Date, format: string = 'default') => {
  try {
    if (date == null) {
      return '-';
    } else {
      if (format === 'default') {
        return moment(date).format('DD-MM-YYYY');
      } else {
        return moment(date).format(format);
      }
    }
  } catch (err) {
    console.log(err);
  }
};

export const currencyFormat = (money: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    currencyDisplay: 'symbol',
  }).format(money ?? 0);
};

export async function checkMultiplePermissions(permissions: any) {
  try {
    let isPermissionGranted = false;
    const statuses = await requestMultiple(permissions);
    for (var index in permissions) {
      if (statuses[permissions[index]] === RESULTS.GRANTED) {
        isPermissionGranted = true;
      } else {
        isPermissionGranted = false;
        break;
      }
    }
    return isPermissionGranted;
  } catch (err) {
    console.log(err);
  }
}

export const mapHelper = {
  centroid: {
    latitude: '24.2472',
    longitude: '89.920914',
  },
  boundingBox: {
    southWest: {
      latitude: '24.234631',
      longitude: '89.907127',
    },
    northEast: {
      latitude: '24.259769',
      longitude: '89.934692',
    },
  },
};
