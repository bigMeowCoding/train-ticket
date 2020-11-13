import {
  ACTION_SET_DEPART_DATE,
  ACTION_SET_FROM,
  ACTION_SET_HIGH_SPEED,
  ACTION_SET_IS_FILTERS_VISIBLE,
  ACTION_SET_ONLY_TICKETS,
  ACTION_SET_ORDER_TYPE,
  ACTION_SET_SEARCH_PARSED,
  ACTION_SET_TO,
  ACTION_SET_ARRIVE_STATIONS,
  ACTION_SET_CHECKED_ARRIVE_STATIONS,
  ACTION_SET_CHECKED_TRAIN_TYPES,
  ACTION_SET_DEPART_STATIONS,
  ACTION_SET_TICKET_TYPES,
  ACTION_SET_TRAIN_TYPES,

} from "./actionTypes";
import { ORDER_DEPART, ORDER_DURATION } from "../../common/utils/config";
import { Dispatch } from "redux";
import {
  StationType,
  TicketType,
  TrainType,

} from "../../common/interface/ticket";
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
export function setSearchParsed(searchParsed: boolean) {
  return {
    type: ACTION_SET_SEARCH_PARSED,
    payload: searchParsed,
  };
}
export function toggleOnlyTickets(onlyTickets: boolean) {
  return {
    type: ACTION_SET_ONLY_TICKETS,
    payload: onlyTickets,
  };
}
export function toggleIsFiltersVisible(isFiltersVisible: boolean) {
  return {
    type: ACTION_SET_IS_FILTERS_VISIBLE,
    payload: isFiltersVisible,
  };
}
export function setTicketTypes(ticketTypes: TicketType[]) {
  return {
    type: ACTION_SET_TICKET_TYPES,
    payload: ticketTypes,
  };
}
export function setTrainTypes(trainTypes: TrainType[]) {
  return {
    type: ACTION_SET_TRAIN_TYPES,
    payload: trainTypes,
  };
}
export function setCheckedTrainTypes(checkedTrainTypes: TrainType[]) {
  return {
    type: ACTION_SET_CHECKED_TRAIN_TYPES,
    payload: checkedTrainTypes,
  };
}
export function setDepartStations(departStations: StationType[]) {
  return {
    type: ACTION_SET_DEPART_STATIONS,
    payload: departStations,
  };
}
export function setArriveStations(arriveStations: StationType[]) {
  return {
    type: ACTION_SET_ARRIVE_STATIONS,
    payload: arriveStations,
  };
}
export function setCheckedArriveStations(checkedArriveStations: StationType[]) {
  return {
    type: ACTION_SET_CHECKED_ARRIVE_STATIONS,
    payload: checkedArriveStations,
  };
}
