import "./date-selector.scss";
import React, { FC } from "react";
import classNames from "classnames";
import Header from "../header/header";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { TicketState } from "../../interface/redux";
import { hideDateSelector } from "../../../index/redux/action";
import Month from "./month";

const DateSelector: FC<{ onBack: () => void }> = function ({ onBack }) {
  const { show } = useSelector(
    (state: TicketState) => ({
      show: state.isDateSelectorVisible,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  const now = new Date();
  now.setHours(0);
  now.setMinutes(0);
  now.setSeconds(0);
  now.setMilliseconds(0);
  now.setDate(1);

  const monthSequence = [now.getTime()];

  now.setMonth(now.getMonth() + 1);
  monthSequence.push(now.getTime());

  now.setMonth(now.getMonth() + 1);
  monthSequence.push(now.getTime());
  return (
    <div className={classNames("date-selector", { hidden: !show })}>
      <Header
        title="日期选择"
        onBack={() => {
          dispatch(hideDateSelector());
          onBack();
        }}
      />
      <div className="date-selector-tables">
        {monthSequence.map((month) => {
          return (
            <Month
              key={month}
              startingTimeInMonth={month}
            />
          );
        })}
      </div>
    </div>
  );
};

export default DateSelector;
