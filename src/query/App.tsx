import React, { FC, useCallback, useEffect } from "react";
import "./App.css";
import URI from "urijs";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  setDepartDate,
  setFrom,
  setHighSpeed,
  setSearchParsed,
  setTo,
} from "./redux/action";
import removeDateTimes from "../common/utils/remove-date-times";
import dayjs from "dayjs";
import { QueryState } from "../common/interface/redux";
import Header from "../common/components/header/header";
import Nav from "../common/components/nav/nav";
import { setTrainList } from "../index/redux/action";
import List from "./components/list/list";

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
  } = useSelector(
    (state: QueryState) => ({
      from: state.from,
      to: state.to,
      departDate: state.departDate,
      searchParsed: state.searchParsed,
      highSpeed: state.highSpeed,
      trainList: state.trainList,
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
        console.log(trains);
        dispatch(setTrainList(trains));
      });
  }, [searchParsed, from, to, departDate, highSpeed]);

  return (
    <div>
      <div className="header-wrapper">
        <Header title={`${from} ⇀ ${to}`} onBack={onBack} />
        <Nav date={departDate} />
        <List list={trainList} />
      </div>
    </div>
  );
};

export default App;
