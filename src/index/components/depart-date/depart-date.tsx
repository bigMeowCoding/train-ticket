import dayjs from "dayjs";
import "./depart-date.scss";
import { FC, useMemo } from "react";
import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { TicketState } from "../../../common/interface/redux";
import removeDateTimes from "../../../common/utils/remove-date-times";
const DepartDate: FC = function () {
  const { time } = useSelector(
    (state: TicketState) => ({
      time: state.departDate,
    }),
    shallowEqual
  );

  const departDateRemoveTimes = removeDateTimes(time);
  const departDateString = useMemo(() => {
    return dayjs(departDateRemoveTimes).format("YYYY-MM-DD");
  }, [departDateRemoveTimes]);
  const isToday = departDateRemoveTimes === removeDateTimes();

  const departDate = new Date(departDateRemoveTimes);
  const weekString =
    "周" +
    ["日", "一", "二", "三", "四", "五", "六"][departDate.getDay()] +
    (isToday ? "(今天)" : "");

  return (
    <div className="depart-date" onClick={() => {}}>
      <input type="hidden" name="date" value={departDateString} />
      {departDateString} <span className="depart-week">{weekString}</span>
    </div>
  );
};

export default DepartDate;
