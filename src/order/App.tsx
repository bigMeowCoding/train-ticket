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
import { ACTION_SET_SEARCH_PARSED } from "./redux/actionTypes";

function App() {
  const { onBack } = useOnBack();
  const dispatch = useDispatch();
  const {
    departDate,
    trainNumber,
    arriveDate,
    departStation,
    departTimeStr,
    durationStr,
    arriveStation,
    arriveTimeStr,
    searchParsed,
    seatType,
  } = useSelector(
    (state: OrderState) => ({
      departStation: state.departStation,
      departDate: state.departDate,
      trainNumber: state.trainNumber,
      arriveDate: state.arriveDate,
      departTimeStr: state.departTimeStr,
      durationStr: state.durationStr,
      arriveStation: state.arriveStation,
      arriveTimeStr: state.arriveTimeStr,
      searchParsed: state.searchParsed,
      seatType: state.seatType,
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
    </div>
  );
}

export default connect(
  function mapStateToProps(state) {},
  function mapDispatchToProps(dispatch) {}
)(App);
