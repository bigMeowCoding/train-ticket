import React, { useMemo } from "react";
import { FC } from "react";
import "./detail.scss";
import { shallowEqual, useSelector } from "react-redux";
import { TicketState } from "../interface/redux";
import dayjs from "dayjs";
function format(d: number) {
  const date = dayjs(d);

  return date.format("MM-DD") + " " + date.locale("zh-cn").format("ddd");
}
const Detail: FC = function (props) {
  const {
    departDate,
    trainNumber,
    arriveDate,
    departStation,
    departTimeStr,
    durationStr,
    arriveStation,
    arriveTimeStr,
  } = useSelector(
    (state: TicketState) => ({
      departStation: state.departStation,
      departDate: state.departDate,
      trainNumber: state.trainNumber,
      arriveDate: state.arriveDate,
      departTimeStr: state.departTimeStr,
      durationStr: state.durationStr,
      arriveStation: state.arriveStation,
      arriveTimeStr: state.arriveTimeStr,
    }),
    shallowEqual
  );
  const departDateStr = useMemo(() => format(departDate), [departDate]);
  const arriveDateStr = useMemo(() => format(arriveDate), [arriveDate]);
  return (
    <div className="detail">
      <div className="content">
        <div className="left">
          <p className="city">{departStation}</p>
          <p className="time">{departTimeStr}</p>
          <p className="date">{departDateStr}</p>
        </div>
        <div className="middle">
          <p className="train-name">{trainNumber}</p>
          <p className="train-mid">{props.children}</p>
          <p className="train-time">耗时{durationStr}</p>
        </div>
        <div className="right">
          <p className="city">{arriveStation}</p>
          <p className="time">{arriveTimeStr}</p>
          <p className="date">{arriveDateStr}</p>
        </div>
      </div>
    </div>
  );
};

export default Detail;
