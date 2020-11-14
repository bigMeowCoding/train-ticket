import {
  ACTION_SET_ARRIVE_STATION,
  ACTION_SET_DEPART_DATE,
  ACTION_SET_DEPART_STATION,
  ACTION_SET_SEARCH_PARSED,
  ACTION_SET_TRAIN_NUMBER,
} from "./actionTypes";

export function setDepartStation(departStation: string) {
  return {
    type: ACTION_SET_DEPART_STATION,
    payload: departStation,
  };
}
export function setArriveStation(arriveStation: string) {
  return {
    type: ACTION_SET_ARRIVE_STATION,
    payload: arriveStation,
  };
}
export function setTrainNumber(trainNumber: string) {
  return {
    type: ACTION_SET_TRAIN_NUMBER,
    payload: trainNumber,
  };
}
export function setDepartDate(departDate: number) {
  return {
    type: ACTION_SET_DEPART_DATE,
    payload: departDate,
  };
}
export function setSearchParsed(searchParsed: boolean) {
  return {
    type: ACTION_SET_SEARCH_PARSED,
    payload: searchParsed,
  };
}
