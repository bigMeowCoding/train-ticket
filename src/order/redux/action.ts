import {
  ACTION_SET_ARRIVE_DATE,
  ACTION_SET_ARRIVE_STATION,
  ACTION_SET_ARRIVE_TIME_STR,
  ACTION_SET_DEPART_DATE,
  ACTION_SET_DEPART_STATION,
  ACTION_SET_DEPART_TIME_STR,
  ACTION_SET_DURATION_STR,
  ACTION_SET_IS_MENU_VISIBLE,
  ACTION_SET_MENU,
  ACTION_SET_PASSENGERS,
  ACTION_SET_PRICE,
  ACTION_SET_SEARCH_PARSED,
  ACTION_SET_SEAT_TYPE,
  ACTION_SET_TRAIN_NUMBER,
} from "./actionTypes";
import { Dispatch } from "redux";

export function setTrainNumber(trainNumber:string) {
  return {
    type: ACTION_SET_TRAIN_NUMBER,
    payload: trainNumber,
  };
}
export function setDepartStation(departStation:string) {
  return {
    type: ACTION_SET_DEPART_STATION,
    payload: departStation,
  };
}
export function setArriveStation(arriveStation:string) {
  return {
    type: ACTION_SET_ARRIVE_STATION,
    payload: arriveStation,
  };
}
export function setSeatType(seatType:string) {
  return {
    type: ACTION_SET_SEAT_TYPE,
    payload: seatType,
  };
}
export function setDepartDate(departDate:number) {
  return {
    type: ACTION_SET_DEPART_DATE,
    payload: departDate,
  };
}
export function setArriveDate(arriveDate:number) {
  return {
    type: ACTION_SET_ARRIVE_DATE,
    payload: arriveDate,
  };
}
export function setDepartTimeStr(departTimeStr) {
  return {
    type: ACTION_SET_DEPART_TIME_STR,
    payload: departTimeStr,
  };
}
export function setArriveTimeStr(arriveTimeStr) {
  return {
    type: ACTION_SET_ARRIVE_TIME_STR,
    payload: arriveTimeStr,
  };
}
export function setDurationStr(durationStr) {
  return {
    type: ACTION_SET_DURATION_STR,
    payload: durationStr,
  };
}
export function setPrice(price) {
  return {
    type: ACTION_SET_PRICE,
    payload: price,
  };
}
export function setPassengers(passengers) {
  return {
    type: ACTION_SET_PASSENGERS,
    payload: passengers,
  };
}
export function setMenu(menu) {
  return {
    type: ACTION_SET_MENU,
    payload: menu,
  };
}
export function setIsMenuVisible(isMenuVisible) {
  return {
    type: ACTION_SET_IS_MENU_VISIBLE,
    payload: isMenuVisible,
  };
}
export function setSearchParsed(searchParsed) {
  return {
    type: ACTION_SET_SEARCH_PARSED,
    payload: searchParsed,
  };
}

export function fetchInitial(url: string) {
  return (dispatch: Dispatch) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const {
          departTimeStr,
          arriveTimeStr,
          arriveDate,
          durationStr,
          price,
        } = data;

        dispatch(setDepartTimeStr(departTimeStr));
        dispatch(setArriveTimeStr(arriveTimeStr));
        dispatch(setArriveDate(arriveDate));
        dispatch(setDurationStr(durationStr));
        dispatch(setPrice(price));
      });
  };
}

let passengerIdSeed = 0;

export function createAdult() {
  return (dispatch: Dispatch, getState: any) => {
    const { passengers } = getState();

    for (let passenger of passengers) {
      const keys = Object.keys(passenger);
      for (let key of keys) {
        if (!passenger[key]) {
          return;
        }
      }
    }

    dispatch(
      setPassengers([
        ...passengers,
        {
          id: ++passengerIdSeed,
          name: "",
          ticketType: "adult",
          licenceNo: "",
          seat: "Z",
        },
      ])
    );
  };
}

export function createChild() {
  return (dispatch: Dispatch, getState: any) => {
    const { passengers } = getState();

    let adultFound = null;

    for (let passenger of passengers) {
      const keys = Object.keys(passenger);
      for (let key of keys) {
        if (!passenger[key]) {
          return;
        }
      }

      if (passenger.ticketType === "adult") {
        adultFound = passenger.id;
      }
    }

    if (!adultFound) {
      alert("请至少正确添加一个同行成人");
      return;
    }

    dispatch(
      setPassengers([
        ...passengers,
        {
          id: ++passengerIdSeed,
          name: "",
          gender: "none",
          birthday: "",
          followAdult: adultFound,
          ticketType: "child",
          seat: "Z",
        },
      ])
    );
  };
}

export function removePassenger(id) {
  return (dispatch: Dispatch, getState: any) => {
    const { passengers } = getState();

    const newPassengers = passengers.filter((passenger) => {
      return passenger.id !== id && passenger.followAdult !== id;
    });

    dispatch(setPassengers(newPassengers));
  };
}

export function updatePassenger(id, data, keysToBeRemoved = []) {
  return (dispatch, getState) => {
    const { passengers } = getState();

    for (let i = 0; i < passengers.length; ++i) {
      if (passengers[i].id === id) {
        const newPassengers = [...passengers];
        newPassengers[i] = Object.assign({}, passengers[i], data);

        for (let key of keysToBeRemoved) {
          delete newPassengers[i][key];
        }

        dispatch(setPassengers(newPassengers));

        break;
      }
    }
  };
}

export function showMenu(menu) {
  return (dispatch: any) => {
    dispatch(setMenu(menu));
    dispatch(setIsMenuVisible(true));
  };
}

export function hideMenu() {
  return setIsMenuVisible(false);
}
