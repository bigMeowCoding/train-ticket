import { ACTION_SET_FROM, ACTION_SET_TO } from "./actionTypes";
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
};
