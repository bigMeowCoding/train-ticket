import dayjs from "dayjs";
import "./depart-date.scss";
import { FC, useMemo } from "react";
import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { IndexPageState } from "../../../common/interface/redux";
import removeDateTimes from "../../../common/utils/remove-date-times";
import { showDateSelector } from "../../redux/action";
const DepartDate: FC = function () {
  const { time } = useSelector(
    (state: IndexPageState) => ({
      time: state.departDate,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
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
    <div
      className="depart-date"
      onClick={() => {
        dispatch(showDateSelector());
      }}
    >
      <input type="hidden" name="date" value={departDateString} />
      {departDateString} <span className="depart-week">{weekString}</span>
    </div>
  );
};

export default DepartDate;
