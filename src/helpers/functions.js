import AsyncStorage from '@react-native-community/async-storage';
import {Dimensions, Linking} from 'react-native';
import {days, DAY_FIELDS} from './constants';
import moment from './moment';
import tokenManager from './Token';

const baselineHeight = 666;
const baselineWidth = 375;

// Grab the window object from that native screen size.
const window = Dimensions.get('window');

// The vertical resolution of the screen.
const screenHeight = window.height;

// The horizontal resolution of the screen.
const screenWidth = window.width;

const scaleSize =
  (screenHeight + screenWidth) / 2 / ((baselineHeight + baselineWidth) / 2);
// Scales the item based on the screen height and baselineHeight

export const scale = (value) => Math.floor(scaleSize * value);
// export const holidaysVerify = holidays => {
//   return holidays.indexOf(getDay("DD-MM")) > -1 ? true : false;
// };

export const getDay = (format = 'dddd') => {
  return format == 'dddd'
    ? moment().lang('en').format(format).toLowerCase()
    : moment().format(format);
};

export const compareDayTime = (string_1, string_2) => {
  return JSON.stringify(string_1) === JSON.stringify(string_2);
};

export const onLoginSuccess = (token, cb = () => {}) => {
  AsyncStorage.setItem('token', token, (err) => {
    if (!err) {
      tokenManager.token = token;
      cb();
    }
  });
};

export const arePointsNear = (checkPoint, centerPoint, km = 0.05) => {
  const ky = 40000 / 360;
  const kx = Math.cos((Math.PI * centerPoint.lat) / 180.0) * ky;
  const dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
  const dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
  return Math.sqrt(dx * dx + dy * dy) <= km;
};

export const getDistance = ({origin, destination, unit = 'K'}) => {
  // console.log({ origin, destination });
  // return null;
  if (origin.lat === destination.lat && origin.lng == destination.lng) {
    return 0;
  } else {
    var radlat1 = (Math.PI * origin.lat) / 180;
    var radlat2 = (Math.PI * destination.lat) / 180;
    var theta = origin.lng - destination.lng;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == 'K') {
      dist = dist * 1.609344;
    }
    if (unit == 'N') {
      dist = dist * 0.8684;
    }
    return dist;
  }
};

export const call = (tel) => {
  const url = `tel:${tel}`;
  Linking.canOpenURL(url).then(() => {
    Linking.openURL(url);
  });
};

//format name

export const removeNonLetters = (string = '') =>
  string.replace(/[^a-zA-Z\s]/g, '');

export const getGradientIndex = (index) => {
  if (index < 4) {
    return index;
  } else {
    return getGradientIndex(index - 4);
  }
};
export function capitalize(s) {
  if (typeof s !== 'string') {
    return '';
  }
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function formatMobile(mobile) {
  if (mobile && typeof mobile === 'string') {
    return mobile.replace('+216', '0');
  } else {
    return '';
  }
}
