import "./date-selector.scss";
import React, { FC } from "react";
import classNames from "classnames";
import Header from "../header/header";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { TicketState } from "../../interface/redux";
import { hideDateSelector } from "../../../index/redux/action";

const DateSelector: FC<{ onBack: () => void }> = function ({ onBack }) {
  const { show } = useSelector(
    (state: TicketState) => ({
      show: state.isDateSelectorVisible,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  return (
    <div className={classNames("date-selector", { hidden: !show })}>
      <Header
        title="日期选择"
        onBack={() => {
          dispatch(hideDateSelector());
          onBack();
        }}
      />
      <div className="date-selector-tables"></div>
    </div>
  );
};

export default DateSelector;
