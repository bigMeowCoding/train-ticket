import {
  ACTION_SET_DEPART_DATE,
  ACTION_SET_FROM,
  ACTION_SET_HIGH_SPEED, ACTION_SET_SEARCH_PARSED,
  ACTION_SET_TO,
} from "./actionTypes";

export function setFrom(from: string) {
  return {
    type: ACTION_SET_FROM,
    payload: from,
  };
}
export function setTo(to: string) {
  return {
    type: ACTION_SET_TO,
    payload: to,
  };
}
export function setHighSpeed(highSpeed: boolean) {
  return {
    type: ACTION_SET_HIGH_SPEED,
    payload: highSpeed,
  };
}
export function setDepartDate(departDate: number) {
  return {
    type: ACTION_SET_DEPART_DATE,
    payload: departDate,
  };
}
export function setSearchParsed(searchParsed:boolean) {
  return {
    type: ACTION_SET_SEARCH_PARSED,
    payload: searchParsed,
  };
}
