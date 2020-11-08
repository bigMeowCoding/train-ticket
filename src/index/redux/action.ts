import {
  ACTION_SET_CITY_DATA,
  ACTION_SET_CURRENT_SELECTING_LEFT_CITY,
  ACTION_SET_FROM,
  ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
  ACTION_SET_IS_LOADING_CITY_DATA,
  ACTION_SET_TO,
} from "./actionTypes";
import { Action } from "../../common/interface/redux";
import { Dispatch } from "redux";
import { HttpReturn, HttpStatus } from "../../common/interface/http";
import { City } from "../../common/interface/city";

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

export function setLoadingCityData(isLoading: boolean) {
  return {
    type: ACTION_SET_IS_LOADING_CITY_DATA,
    payload: isLoading,
  };
}

export function setCityData(cityData: City[]) {
  return {
    type: ACTION_SET_CITY_DATA,
    payload: cityData,
  };
}
export function fetchCityData() {
  return (dispatch: Dispatch, getState: any) => {
    const { isLoadingCityData } = getState();
    if (isLoadingCityData) {
      return;
    }
    dispatch(setLoadingCityData(true));
    fetch("/api/getCities")
      .then((res) => {
        return res.json();
      })
      .then((res: HttpReturn<City[]>) => {
        if (res.code === HttpStatus.ok) {
          dispatch(setCityData(res.data));
        }
        dispatch(setLoadingCityData(false));
      })
      .catch(() => {
        dispatch(setLoadingCityData(false));
      });
  };
}
