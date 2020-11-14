import {
  ACTION_SET_ARRIVE_DATE,
  ACTION_SET_ARRIVE_STATION,
  ACTION_SET_ARRIVE_TIME_STR,
  ACTION_SET_DEPART_DATE,
  ACTION_SET_DEPART_STATION,
  ACTION_SET_DEPART_TIME_STR,
  ACTION_SET_DURATION_STR,
  ACTION_SET_SEARCH_PARSED,
  ACTION_SET_TRAIN_NUMBER,
} from "./actionTypes";
import { Action } from "../../common/interface/redux";

export default {
  departStation(state = null, action: Action<string>) {
    const { type, payload } = action;
    switch (type) {
      case ACTION_SET_DEPART_STATION:
        return payload;
      default:
    }

    return state;
  },
  arriveStation(state = null, action: Action<string>) {
    const { type, payload } = action;
    switch (type) {
      case ACTION_SET_ARRIVE_STATION:
        return payload;
      default:
    }

    return state;
  },
  trainNumber(state = null, action: Action<string>) {
    const { type, payload } = action;
    switch (type) {
      case ACTION_SET_TRAIN_NUMBER:
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
  departTimeStr(state = null, action: Action<string>) {
    const { type, payload } = action;
    switch (type) {
      case ACTION_SET_DEPART_TIME_STR:
        return payload;
      default:
    }

    return state;
  },
  arriveTimeStr(state = null, action: Action<string>) {
    const { type, payload } = action;
    switch (type) {
      case ACTION_SET_ARRIVE_TIME_STR:
        return payload;
      default:
    }

    return state;
  },
  arriveDate(state = Date.now(), action: Action<number>) {
    const { type, payload } = action;
    switch (type) {
      case ACTION_SET_ARRIVE_DATE:
        return payload;
      default:
    }

    return state;
  },
  durationStr(state = null, action: Action<string>) {
    const { type, payload } = action;
    switch (type) {
      case ACTION_SET_DURATION_STR:
        return payload;
      default:
    }

    return state;
  },
};
