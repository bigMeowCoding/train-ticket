export type Passenger = AdultPassenger | ChildPassenger;

export type AdultPassenger = {
  licenceNo: number;
} & PassengerBase;

export type ChildPassenger = {
  gender: string;
  birthday: string;
  followAdult: number;
} & PassengerBase;

type PassengerBase = {
  id: number;
  name: string;
  ticketType: string;
  seat: string;
};
