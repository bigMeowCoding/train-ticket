import React, { FC, useCallback } from "react";
import "./App.css";
import { connect, shallowEqual, useDispatch, useSelector } from "react-redux";
import Header from "../common/components/header/header";
import Journey from "./components/journey/journey";
import { exchangeFromTo } from "./redux/action";
import { TicketState } from "../common/interface/redux";
import CitySelector from "../common/components/city-selector/city-selector";
import DepartDate from "./components/depart-date/depart-date";

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
      <Header onBack={onBack} title={"火车站"} />
      <Journey from={from} to={to} exchangeFromTo={changeFromTo} />
      <CitySelector onBack={onBack} />
      <DepartDate />
    </div>
  );
};

export default App;
