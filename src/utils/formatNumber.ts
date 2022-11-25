import { replace } from 'lodash';
import numeral from 'numeral';

// ----------------------------------------------------------------------

export function fCurrency(number: string | number) {
  return numeral(number).format('0,0[.]00').concat(' đ');
}

export function fPercent(number: number) {
  return numeral(number / 100).format('0.0%');
}

export function fNumber(number: string | number) {
  return numeral(number).format();
}

export function fShortenNumber(number: string | number) {
  return replace(numeral(number).format('0.00a'), '.00', '');
}

export function fData(number: string | number) {
  return numeral(number).format('0.0 b');
}