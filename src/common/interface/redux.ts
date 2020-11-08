import { City, HttpReturnCityData } from "./city";

export type Action<T = any> = {
  type: string;
  payload: T;
};
export type TicketState = {
  from: string;
  to: string;
  exchangeFromTo: () => void;
  isCitySelectorVisible: boolean;
  cityData: HttpReturnCityData;
  isLoadingCityData: boolean;
};
