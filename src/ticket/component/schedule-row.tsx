import React, { FC, memo } from "react";
import classNames from "classnames";
import leftPad from "left-pad";
const ScheduleRow: FC<{
  index: number;
  station: string;
  arriveTime: string;
  departTime: string;
  stay: number;
  beforeDepartStation: boolean;
  isDepartStation: boolean;
  afterArriveStation: boolean;
  isArriveStation: boolean;
  isEndStation: boolean;
  isStartStation: boolean;
}> = memo(function ({
  index,
  station,
  arriveTime,
  departTime,
  stay,
  beforeDepartStation,
  isDepartStation,
  afterArriveStation,
  isArriveStation,
  isStartStation,
  isEndStation,
}) {
  return (
    <li>
      <div
        className={classNames("icon", {
          "icon-red": isDepartStation || isArriveStation,
        })}
      >
        {isDepartStation ? "出" : isArriveStation ? "到" : leftPad(index, 2, 0)}
      </div>
      <div
        className={classNames("row", {
          grey: beforeDepartStation || afterArriveStation,
        })}
      >
        <span
          className={classNames("station", {
            red: isArriveStation || isDepartStation,
          })}
        >
          {station}
        </span>
        <span
          className={classNames("arrtime", {
            red: isArriveStation,
          })}
        >
          {isStartStation ? "始发站" : arriveTime}
        </span>
        <span
          className={classNames("deptime", {
            red: isDepartStation,
          })}
        >
          {isEndStation ? "终到站" : departTime}
        </span>
        <span className="stoptime">
          {isStartStation || isEndStation ? "-" : stay + "分"}
        </span>
      </div>
    </li>
  );
});

export default ScheduleRow;
