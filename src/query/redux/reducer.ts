import {
  ACTION_SET_CHECKED_TRAIN_TYPES,
  ACTION_SET_DEPART_DATE,
  ACTION_SET_FROM,
  ACTION_SET_HIGH_SPEED,
  ACTION_SET_SEARCH_PARSED,
  ACTION_SET_TO,
} from "./actionTypes";
import { Action } from "../../common/interface/redux";

export default {
  from(state = null, action: Action<string>) {
    const { type, payload } = action;
    switch (type) {
      case ACTION_SET_FROM:
        return payload;
      default:
    }

    return state;
  },
  to(state = null, action: Action<string>) {
    const { type, payload } = action;
    switch (type) {
      case ACTION_SET_TO:
        return payload;
      default:
    }

    return state;
  },
  departDate(state = Date.now(), action: Action<number>) {
    const { type, payload } = action;
    switch (type) {
      case ACTION_SET_DEPART_DATE:
        return payload;
      default:
    }

    return state;
  },
  searchParsed(state = false, action: Action<boolean>) {
    const { type, payload } = action;
    switch (type) {
      case ACTION_SET_SEARCH_PARSED:
        return payload;
      default:
    }

    return state;
  },
  highSpeed(state = false, action: Action<boolean>) {
    const { type, payload } = action;

    switch (type) {
      case ACTION_SET_HIGH_SPEED:
        return payload;
      default:
    }

    return state;
  },
};
