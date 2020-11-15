import React, { useEffect } from "react";
import "./App.css";
import { connect, shallowEqual, useDispatch, useSelector } from "react-redux";
import Detail from "../common/detail/detail";
import Header from "../common/components/header/header";
import useOnBack from "../common/hooks/useOnBack";
import URI from "urijs";
import {
  fetchInitial,
  setArriveStation,
  setDepartDate,
  setDepartStation,
  setSearchParsed,
  setSeatType,
  setTrainNumber,
} from "./redux/action";
import dayjs from "dayjs";
import { OrderState, TicketState } from "../common/interface/redux";
import Ticket from "./component/ticket/ticket";
import Passengers from "./component/passenger/passengers";
import Menu from "./component/menu/menu";
import Choose from "./component/choose/choose";
import Account from "./component/account/account";

function App() {
  const { onBack } = useOnBack();
  const dispatch = useDispatch();
  const {
    departDate,
    departStation,
    arriveStation,
    searchParsed,
    seatType,
    price,
    isMenuVisible,
  } = useSelector(
    (state: OrderState) => ({
      departStation: state.departStation,
      departDate: state.departDate,
      arriveStation: state.arriveStation,
      searchParsed: state.searchParsed,
      seatType: state.seatType,
      price: state.price,
      isMenuVisible: state.isMenuVisible,
    }),
    shallowEqual
  );
  useEffect(() => {
    const queries = URI.parseQuery(window.location.search);

    const { trainNumber, dStation, aStation, type, date } = queries;

    dispatch(setDepartStation(dStation as string));
    dispatch(setArriveStation(aStation as string));
    dispatch(setTrainNumber(trainNumber as string));
    dispatch(setSeatType(type as string));
    dispatch(setDepartDate(dayjs(date as string).valueOf()));
    dispatch(setSearchParsed(true));
  }, []);
  useEffect(() => {
    if (!searchParsed) {
      return;
    }

    const url = new URI("/api/order")
      .setSearch("dStation", departStation)
      .setSearch("aStation", arriveStation)
      .setSearch("type", seatType)
      .setSearch("date", dayjs(departDate).format("YYYY-MM-DD"))
      .toString();
    dispatch(fetchInitial(url));
  }, [searchParsed, departStation, arriveStation, seatType, departDate]);
  return (
    <div className="app">
      <div className="header-wrapper">
        <Header title="订单填写" onBack={onBack} />
      </div>
      <div className="detail-wrapper">
        <Detail>
          <span style={{ display: "block" }} className="train-icon"></span>
        </Detail>
      </div>
      <Ticket price={price} type={seatType} />
      <Passengers />
      <Choose />
      <Account/>
      <Menu show={isMenuVisible} />
    </div>
  );
}

export default App;
