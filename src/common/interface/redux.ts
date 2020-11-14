import { City, HttpReturnCityData } from "./city";
import { StationType, TicketType, TrainType } from "./ticket";

export type Action<T = any> = {
  type: string;
  payload?: T;
};
export type IndexPageState = {
  from: string;
  to: string;
  exchangeFromTo: () => void;
  isCitySelectorVisible: boolean;
  cityData: HttpReturnCityData;
  isLoadingCityData: boolean;
  departDate: number;
  isDateSelectorVisible: boolean;
  highSpeed: boolean;
};
export type QueryState = {
  arriveTimeEnd: number;
  arriveTimeStart: number;
  departTimeEnd: number;
  departTimeStart: number;
  from: string;
  to: string;
  exchangeFromTo: () => void;
  isCitySelectorVisible: boolean;
  cityData: HttpReturnCityData;
  isLoadingCityData: boolean;
  departDate: number;
  isDateSelectorVisible: boolean;
  highSpeed: boolean;
  trainList: any[];
  searchParsed: boolean;
  orderType: number;
  onlyTickets: boolean;
  isFiltersVisible: boolean;
  ticketTypes: TicketType[];
  trainTypes: TrainType[];
  departStations: StationType[];
  arriveStations: StationType[];
  checkedTrainTypes: TrainType[];
  checkedTicketTypes: TicketType[];
  checkedDepartStations: StationType[];
  checkedArriveStations: StationType[];
};

export type TicketState = {
  departStation: string;
  arriveStation: string;
  trainNumber: string;
  departDate: number;
  searchParsed: boolean;
};
