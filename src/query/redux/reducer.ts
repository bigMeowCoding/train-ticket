import {
  ACTION_SET_CHECKED_TRAIN_TYPES,
  ACTION_SET_DEPART_DATE,
  ACTION_SET_FROM,
  ACTION_SET_HIGH_SPEED,
  ACTION_SET_IS_FILTERS_VISIBLE,
  ACTION_SET_ONLY_TICKETS,
  ACTION_SET_ORDER_TYPE,
  ACTION_SET_SEARCH_PARSED,
  ACTION_SET_TO,
  ACTION_SET_TRAIN_LIST,
} from "./actionTypes";
import { Action } from "../../common/interface/redux";
import { ORDER_DEPART } from "../../common/utils/config";

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
  trainList(state = [], action: any) {
    const { type, payload } = action;
    switch (type) {
      case ACTION_SET_TRAIN_LIST:
        return payload;
      default:
    }

    return state;
  },
  orderType(state = ORDER_DEPART, action: Action) {
    const { type, payload } = action;
    switch (type) {
      case ACTION_SET_ORDER_TYPE:
        return payload;
      default:
    }

    return state;
  },
  onlyTickets(state = false, action: Action<boolean>) {
    const { type, payload } = action;
    switch (type) {
      case ACTION_SET_ONLY_TICKETS:
        return payload;
      default:
    }

    return state;
  },
  isFiltersVisible(state = false, action: Action<boolean>) {
    const { type, payload } = action;
    switch (type) {
      case ACTION_SET_IS_FILTERS_VISIBLE:
        return payload;
      default:
    }

    return state;
  },
};
