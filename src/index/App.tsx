import React, { FC, useCallback } from "react";
import "./App.css";
import { connect, shallowEqual, useDispatch, useSelector } from "react-redux";
import Header from "../common/components/header/header";
import Journey from "./components/journey/journey";
import { exchangeFromTo } from "./redux/action";
import { TicketState } from "../common/interface/redux";
import CitySelector from "../common/components/city-selector/city-selector";
import DepartDate from "./components/depart-date/depart-date";
import DateSelector from "../common/components/date-selector/date-selector";
import HighSpeed from "../common/components/high-speed/high-speed";
import Submit from "../common/components/submit/submit";

const App: FC = () => {
  const onBack = useCallback(() => {
    window.history.back();
    console.log("back");
  }, []);

  const { from, to } = useSelector(
    (state: TicketState) => ({
      from: state.from,
      to: state.to,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  const changeFromTo = useCallback(() => {
    dispatch(exchangeFromTo());
  }, []);

  return (
    <div>
      <div className="header-wrapper">
        <Header onBack={onBack} title={"火车站"} />
      </div>
      <form action="./query.html" className="form">
        <Journey from={from} to={to} exchangeFromTo={changeFromTo} />
        <DepartDate />
        <HighSpeed />
        <Submit />
      </form>

      <CitySelector onBack={onBack} />

      <DateSelector onBack={onBack} />
    </div>
  );
};

export default App;
