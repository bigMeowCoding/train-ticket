import React, { lazy, Suspense, useCallback, useEffect } from "react";
import "./App.css";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Header from "../common/components/header/header";
import Nav from "../common/components/nav/nav";
import URI from "urijs";
import {
  setArriveDate,
  setArriveStation,
  setArriveTimeStr,
  setDepartDate,
  setDepartStation,
  setDepartTimeStr,
  setDurationStr,
  setIsScheduleVisible,
  setSearchParsed,
  setTickets,
  setTrainNumber,
} from "./redux/action";
import dayjs from "dayjs";
import removeDateTimes from "../common/utils/remove-date-times";
import { TicketState } from "../common/interface/redux";
import Detail from "../common/detail/detail";
const Schedule = lazy(() => import("./component/schedule"));

function App() {
  const {
    searchParsed,
    departDate,
    trainNumber,
    isScheduleVisible,
  } = useSelector(
    (state: TicketState) => ({
      searchParsed: state.searchParsed,
      departDate: state.departDate,
      trainNumber: state.trainNumber,
      isScheduleVisible: state.isScheduleVisible,
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

    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        const { detail, candidates } = result;
        console.log(detail);
        const {
          departTimeStr,
          arriveTimeStr,
          arriveDate,
          durationStr,
        } = detail;

        dispatch(setDepartTimeStr(departTimeStr));
        dispatch(setArriveTimeStr(arriveTimeStr));
        dispatch(setArriveDate(arriveDate));
        dispatch(setDurationStr(durationStr));
        dispatch(setTickets(candidates));
      });
  }, [searchParsed, departDate, trainNumber]);
  return (
    <div className="app">
      <div className="header-wrapper">
        <Header title={trainNumber} onBack={onBack} />
      </div>
      <div className="nav-wrapper">
        <Nav date={departDate} />
      </div>
      <div className="detail-wrapper">
        <Detail>
          <span className="left"></span>
          <span
            className="schedule"
            onClick={() => {
              dispatch(setIsScheduleVisible(!isScheduleVisible));
            }}
          >
            时刻表
          </span>{" "}
          <span className="right"></span>
        </Detail>
      </div>
      {isScheduleVisible && (
        <div
          className="mask"
          onClick={() => {
            dispatch(setIsScheduleVisible(!isScheduleVisible));
          }}
        >
          <Suspense fallback={<div>loading</div>}>
            <Schedule />
          </Suspense>
        </div>
      )}
    </div>
  );
}

export default App;
