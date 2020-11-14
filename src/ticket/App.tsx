import React, { useCallback, useEffect } from "react";
import "./App.css";
import { connect, shallowEqual, useDispatch, useSelector } from "react-redux";
import Header from "../common/components/header/header";
import Nav from "../common/components/nav/nav";
import URI from "urijs";
import {
  setArriveStation,
  setDepartDate,
  setDepartStation,
  setSearchParsed,
  setTrainNumber,
} from "./redux/action";
import dayjs from "dayjs";
import removeDateTimes from "../common/utils/remove-date-times";
import { IndexPageState, TicketState } from "../common/interface/redux";

function App() {
  const { searchParsed, departDate, trainNumber } = useSelector(
    (state: TicketState) => ({
      searchParsed: state.searchParsed,
      departDate: state.departDate,
      trainNumber: state.trainNumber,
    }),
    shallowEqual
  );
  const onBack = useCallback(() => {
    window.history.back();
  }, []);
  const dispatch = useDispatch();
  useEffect(() => {
    const queries = URI.parseQuery(window.location.search);
    const { aStation, dStation, date, trainNumber } = queries;
    dispatch(setDepartStation(dStation as string));
    dispatch(setArriveStation(aStation as string));
    dispatch(setTrainNumber(trainNumber as string));
    dispatch(setDepartDate(removeDateTimes(dayjs(date as string).valueOf())));
    dispatch(setSearchParsed(true));
  }, []);

  useEffect(() => {
    document.title = trainNumber;
  }, [trainNumber]);
  useEffect(() => {
    if (!searchParsed) {
      return;
    }

    const url = new URI("/api/ticket")
      .setSearch("date", dayjs(departDate).format("YYYY-MM-DD"))
      .setSearch("trainNumber", trainNumber)
      .toString();
    //
    // fetch(url)
    //     .then(response => response.json())
    //     .then(result => {
    //       const { detail, candidates } = result;
    //
    //       const {
    //         departTimeStr,
    //         arriveTimeStr,
    //         arriveDate,
    //         durationStr,
    //       } = detail;
    //
    //       dispatch(setDepartTimeStr(departTimeStr));
    //       dispatch(setArriveTimeStr(arriveTimeStr));
    //       dispatch(setArriveDate(arriveDate));
    //       dispatch(setDurationStr(durationStr));
    //       dispatch(setTickets(candidates));
    //     });
  }, [searchParsed, departDate, trainNumber]);
  return (
    <div className="app">
      <div className="header-wrapper">
        <Header title={trainNumber} onBack={onBack} />
      </div>
      <div className="nav-wrapper">
        <Nav date={departDate} />
      </div>
      <div className="detail-wrapper"></div>
    </div>
  );
}

export default connect(
  function mapStateToProps(state) {},
  function mapDispatchToProps(dispatch) {}
)(App);
