/* eslint-disable import/prefer-default-export */

import { SET_DOORS_LOCKED_STATE, SET_FULL_STATUS, SET_GEO } from '../constants';

export function setDoorsLockState(isLocked) {
  return {
    type: SET_DOORS_LOCKED_STATE,
    payload: isLocked,
  };
}

export function setFullStatus(status) {
  return {
    type: SET_FULL_STATUS,
    payload: status,
  };
}

export function setGeo(geo) {
  return {
    type: SET_GEO,
    payload: geo,
  };
}
