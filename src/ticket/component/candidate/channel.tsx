import React, { useMemo } from "react";
import { FC, memo } from "react";
import URI from "urijs";
import dayjs from "dayjs";
import { shallowEqual, useSelector } from "react-redux";
import { TicketState } from "../../../common/interface/redux";

const Channel: FC<{ type: string; name: string; desc: string }> = memo(
  function ({ type, name, desc }) {
    const {
      departStation,
      departDate,
      trainNumber,
      arriveStation,
    } = useSelector(
      (state: TicketState) => ({
        departStation: state.departStation,
        arriveStation: state.arriveStation,
        trainNumber: state.trainNumber,
        departDate: state.departDate,
      }),
      shallowEqual
    );

    const src = useMemo(() => {
      return new URI("order.html")
        .setSearch("trainNumber", trainNumber)
        .setSearch("dStation", departStation)
        .setSearch("aStation", arriveStation)
        .setSearch("type", type)
        .setSearch("date", dayjs(departDate).format("YYYY-MM-DD"))
        .toString();
    }, [type, trainNumber, departStation, arriveStation, departDate]);
    return (
      <div className="channel">
        <div className="middle">
          <div className="name">{name}</div>
          <div className="desc">{desc}</div>
        </div>
        <a href={src} className="buy-wrapper">
          <div className="buy">买票</div>
        </a>
      </div>
    );
  }
);
export default Channel;
