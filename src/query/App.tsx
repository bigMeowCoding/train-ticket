import React, { FC, useCallback, useEffect } from "react";
import "./App.css";
import URI from "urijs";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  setArriveStations,
  setDepartDate,
  setDepartStations,
  setFrom,
  setHighSpeed,
  setSearchParsed,
  setTicketTypes,
  setTo,
  setTrainTypes,
} from "./redux/action";
import removeDateTimes from "../common/utils/remove-date-times";
import dayjs from "dayjs";
import { QueryState } from "../common/interface/redux";
import Header from "../common/components/header/header";
import Nav from "../common/components/nav/nav";
import { setTrainList } from "../index/redux/action";
import List from "./components/list/list";
import Bottom from "./components/bottom/bottom";
import { StationType, TicketType, TrainType } from "../common/interface/ticket";

const App: FC = function () {
  const onBack = useCallback(() => {
    window.history.back();
  }, []);
  const dispatch = useDispatch();
  const {
    from,
    to,
    departDate,
    searchParsed,
    highSpeed,
    trainList,
    orderType,
    checkedTicketTypes,
    checkedTrainTypes,
    checkedDepartStations,
    checkedArriveStations,
    arriveTimeStart,
    arriveTimeEnd,
    departTimeEnd,
    departTimeStart,
  } = useSelector(
    (state: QueryState) => ({
      from: state.from,
      to: state.to,
      departDate: state.departDate,
      searchParsed: state.searchParsed,
      highSpeed: state.highSpeed,
      trainList: state.trainList,
      orderType: state.orderType,
      checkedTicketTypes: state.checkedTicketTypes,
      checkedTrainTypes: state.checkedTrainTypes,
      checkedDepartStations: state.checkedDepartStations,
      checkedArriveStations: state.checkedArriveStations,
      arriveTimeEnd: state.arriveTimeEnd,
      arriveTimeStart: state.arriveTimeStart,
      departTimeEnd: state.departTimeEnd,
      departTimeStart: state.departTimeStart,
    }),
    shallowEqual
  );

  useEffect(() => {
    const queries = URI.parseQuery(window.location.search);
    const { from = "", to = "", date = 0, highSpeed } = queries;
    dispatch(setFrom(from as string));
    dispatch(setTo(to as string));
    dispatch(setDepartDate(removeDateTimes(dayjs(date as string).valueOf())));
    dispatch(setHighSpeed(highSpeed === "true"));
    dispatch(setSearchParsed(true));
  }, []);

  useEffect(() => {
    if (!searchParsed) {
      return;
    }

    const url = new URI("/api/query")
      .setSearch("from", from)
      .setSearch("to", to)
      .setSearch("date", dayjs(departDate).format("YYYY-MM-DD"))
      .setSearch("highSpeed", "" + highSpeed)
      .setSearch("orderType", "" + orderType)
      .setSearch(
        "checkedTicketTypes",
        checkedTicketTypes.map((item) => item.value).join()
      )
      .setSearch(
        "checkedTrainTypes",
        checkedTrainTypes.map((item) => item.value).join()
      )
      .setSearch(
        "checkedDepartStations",
        checkedDepartStations.map((item) => item.value).join()
      )
      .setSearch(
        "checkedArriveStations",
        checkedArriveStations.map((item) => item.value).join()
      )
      .setSearch("departTimeStart", departTimeStart + "")
      .setSearch("departTimeEnd", departTimeEnd + "")
      .setSearch("arriveTimeStart", arriveTimeStart + "")
      .setSearch("arriveTimeEnd", arriveTimeEnd + "")
      .toString();
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        const result = res.data;
        const {
          dataMap: {
            directTrainInfo: {
              trains,
              filter: { ticketType, trainType, depStation, arrStation },
            },
          },
        } = result;

        dispatch(setTrainList(trains));
        dispatch(setTicketTypes(ticketType));
        dispatch(setTrainTypes(trainType));
        dispatch(setDepartStations(depStation));
        dispatch(setArriveStations(arrStation));
      });
  }, [
    searchParsed,
    from,
    to,
    departDate,
    highSpeed,
    orderType,
    checkedTrainTypes,
    checkedTicketTypes,
    checkedDepartStations,
    checkedArriveStations,
    departTimeEnd,
    departTimeStart,
    arriveTimeEnd,
    arriveTimeStart,
  ]);

  return (
    <div>
      <div className="header-wrapper">
        <Header title={`${from} ⇀ ${to}`} onBack={onBack} />
        <Nav date={departDate} />
        <List list={trainList} />
        <Bottom />
      </div>
    </div>
  );
};

export default App;
