import {
  ACTION_SET_CITY_DATA,
  ACTION_SET_CURRENT_SELECTING_LEFT_CITY,
  ACTION_SET_FROM,
  ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
  ACTION_SET_IS_LOADING_CITY_DATA,
  ACTION_SET_TO,
} from "./actionTypes";
import { Action } from "../../common/interface/redux";

export default {
  from(state = "北京", action: Action) {
    const { type, payload } = action;
    switch (type) {
      case ACTION_SET_FROM:
        return payload;
      default:
    }

    return state;
  },
  to(state = "上海", action: Action) {
    const { type, payload } = action;
    switch (type) {
      case ACTION_SET_TO:
        return payload;
      default:
    }

    return state;
  },
  isCitySelectorVisible(state = false, action: Action) {
    const { type, payload } = action;
    switch (type) {
      case ACTION_SET_IS_CITY_SELECTOR_VISIBLE:
        return payload;
      default:
        return state;
    }
  },
  currentSelectingLeftCity(state = false, action: Action) {
    const { type, payload } = action;
    switch (type) {
      case ACTION_SET_CURRENT_SELECTING_LEFT_CITY:
        return payload;
      default:
    }
    return state;
  },
  isLoadingCityData(state = false, action: Action) {
    switch (action.type) {
      case ACTION_SET_IS_LOADING_CITY_DATA:
        return action.payload;
    }
    return state;
  },
  cityData(state = null, action: Action) {
    switch (action.type) {
      case ACTION_SET_CITY_DATA:
        return action.payload;
    }
    return state;
  },
};
