export const btnTypes = {
  primary: 'primary',
  warning: 'warning',
  danger: 'danger',
  cancel: 'cancel',
};

export const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const NAME_REGEX = /^[a-zA-Z ]{2,50}$/;
export const REGEX_MOBILE = /^(?:\+33)[0-9]{9,10}$/;
export const MOBILE_REGEX_INCLUSIVE = /^(:?(?:\+|00)33|0)[0-9]{1}[0-9]{8}$/;
export const DEFAULT_COUNTRY_CODE = '+33';

// time format
export const FRENCH_DATE = 'DD/MM/YYYY';
export const FRENCH_TIME = 'HH:mm';
export const FRENCH_DATE_TIME_FORMAT = `${FRENCH_DATE} ${FRENCH_TIME}`;
export const DAY_FORMAT = 'dddd MMMM DD';

export const frenchDays = {
  monday: 'Lundi',
  tuesday: 'Mardi',
  wednesday: 'Mercredi',
  thursday: 'Jeudi',
  friday: 'Vendredi',
  saturday: 'Samedi',
  sunday: 'Dimanche',
};

export const days = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

export const defaultPhoto =
  'https://i1.rgstatic.net/ii/profile.image/740281066463239-1553508168775_Q128/Abdessamad_Daoudi.jpg';

// rating strings

export const TERRIBLE = 'Terrible';
export const BAD = 'Mauvais';
export const OKAY = 'Pas mal';
export const GOOD = 'Bien';
export const EXCELLENT = 'Excellent';
