import React, { FC } from "react";
import { memo } from "react";
import Channel from "./channel";

const Seat: FC<{
  expanded: boolean;
  onToggle: Function;
  type: string;
  priceMsg: string;
  ticketsLeft: string;
  channels: any[];
  idx: string;
}> = memo(function ({
  expanded,
  channels,
  onToggle,
  type,
  priceMsg,
  ticketsLeft,
  idx,
}) {
  return (
    <li>
      <div className="bar" onClick={() => onToggle(idx)}>
        <span className="seat">{type}</span>
        <span className="price">
          <i>￥</i>
          {priceMsg}
        </span>
        <span className="btn">{expanded ? "预订" : "收起"}</span>
        <span className="num">{ticketsLeft}</span>
      </div>
      <div
        className="channels"
        style={{ height: expanded ? channels.length * 55 + "px" : 0 }}
      >
        {channels.map((channel) => {
          return <Channel key={channel.name} {...channel} type={type} />;
        })}
      </div>
    </li>
  );
});

export default Seat;
