import {
  ACTION_SET_CURRENT_SELECTING_LEFT_CITY,
  ACTION_SET_FROM,
  ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
  ACTION_SET_TO,
} from "./actionTypes";
import { Action } from "../../common/interface/redux";
import { dispatch, getState } from "jest-circus/build/state";
import { Dispatch } from "redux";

export function setFrom(from: string): Action<string> {
  return {
    type: ACTION_SET_FROM,
    payload: from,
  };
}

export function setTo(to: string): Action<string> {
  return {
    type: ACTION_SET_TO,
    payload: to,
  };
}

export function exchangeFromTo() {
  return (dispatch: Dispatch, getState: any) => {
    const { from, to } = getState();
    dispatch(setFrom(to));
    dispatch(setTo(from));
  };
}

export function showCitySelector(selectingLeftCity: boolean) {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
      payload: true,
    });
    dispatch({
      type: ACTION_SET_CURRENT_SELECTING_LEFT_CITY,
      payload: selectingLeftCity,
    });
  };
}

export function hideCitySelector() {
  return {
    type: ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
    payload: false,
  };
}
