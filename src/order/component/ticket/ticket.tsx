import React from "react";
import { FC, memo } from "react";
import "./ticket.scss";
const Ticket: FC<{
  price: number;
  type: string;
}> = memo(function ({ price, type }) {
  return (
    <div className="ticket">
      <p>
        <span className="ticket-type">{type}</span>
        <span className="ticket-price">{price}</span>
      </p>
      <div className="label">坐席</div>
    </div>
  );
});

export default Ticket;
