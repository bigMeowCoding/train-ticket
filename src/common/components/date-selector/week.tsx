import React from "react";
import { FC } from "react";
import Day from "./day";

const Week: FC<{
  days: number[];
}> = function ({ days }) {
  return (
    <tr className="date-table-days">
      {days.map((day, idx) => {
        return <Day key={idx} day={day} />;
      })}
    </tr>
  );
};

export default Week;
