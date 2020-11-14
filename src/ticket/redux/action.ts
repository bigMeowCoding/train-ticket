import {
  ACTION_SET_ARRIVE_DATE,
  ACTION_SET_ARRIVE_STATION,
  ACTION_SET_ARRIVE_TIME_STR,
  ACTION_SET_DEPART_DATE,
  ACTION_SET_DEPART_STATION,
  ACTION_SET_DEPART_TIME_STR,
  ACTION_SET_DURATION_STR, ACTION_SET_IS_SCHEDULE_VISIBLE,
  ACTION_SET_SEARCH_PARSED,
  ACTION_SET_TICKETS,
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
export function setDepartTimeStr(departTimeStr: string) {
  return {
    type: ACTION_SET_DEPART_TIME_STR,
    payload: departTimeStr,
  };
}
export function setArriveTimeStr(arriveTimeStr: string) {
  return {
    type: ACTION_SET_ARRIVE_TIME_STR,
    payload: arriveTimeStr,
  };
}
export function setArriveDate(arriveDate: number) {
  return {
    type: ACTION_SET_ARRIVE_DATE,
    payload: arriveDate,
  };
}
export function setDurationStr(durationStr: string) {
  return {
    type: ACTION_SET_DURATION_STR,
    payload: durationStr,
  };
}

export function setTickets(tickets: any) {
  return {
    type: ACTION_SET_TICKETS,
    payload: tickets,
  };
}
export function setIsScheduleVisible(isScheduleVisible:boolean) {
  return {
    type: ACTION_SET_IS_SCHEDULE_VISIBLE,
    payload: isScheduleVisible,
  };
}
