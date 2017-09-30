import { SET_DOORS_LOCKED_STATE, SET_FULL_STATUS, SET_GEO } from '../constants';

const defaultState = { doors: { locked: true } };

export default function runtime(state = defaultState, action) {
  switch (action.type) {
    case SET_DOORS_LOCKED_STATE:
      return {
        ...state,
        doors: {
          ...state.doors,
          locked: action.payload,
        },
      };

    case SET_FULL_STATUS:
      return {
        ...state,
        ...action.payload,
      };

    case SET_GEO:
      return {
        ...state,
        geo: { ...action.payload },
      };

    default:
      return state;
  }
}
