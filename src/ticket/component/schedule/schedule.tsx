import "./schedule.scss";
import { FC, memo, useEffect, useState } from "react";
import React from "react";
import ScheduleRow from "./schedule-row";
import URI from "urijs";
import dayjs from "dayjs";
import { shallowEqual, useSelector } from "react-redux";
import { TicketState } from "../../../common/interface/redux";

const Schedule: FC = memo(function () {
  const [scheduleList, setScheduleList] = useState([]);
  const { departStation, arriveStation, trainNumber, departDate } = useSelector(
    (state: TicketState) => ({
      departStation: state.departStation,
      arriveStation: state.arriveStation,
      trainNumber: state.trainNumber,
      departDate: state.departDate,
    }),
    shallowEqual
  );
  useEffect(() => {
    const url = new URI("/api/schedule")
      .setSearch("trainNumber", trainNumber)
      .setSearch("departStation", departStation)
      .setSearch("arriveStation", arriveStation)
      .setSearch("date", dayjs(departDate).format("YYYY-MM-DD"))
      .toString();

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let departRow;
        let arriveRow;
          console.log(departStation, arriveStation)
        for (let i = 0; i < data.length; ++i) {
          if (!departRow) {
            if (data[i].station === departStation) {
              departRow = Object.assign(data[i], {
                beforeDepartStation: false,
                isDepartStation: true,
                afterArriveStation: false,
                isArriveStation: false,
              });
            } else {
              Object.assign(data[i], {
                beforeDepartStation: true,
                isDepartStation: false,
                afterArriveStation: false,
                isArriveStation: false,
              });
            }
          } else if (!arriveRow) {
            if (data[i].station === arriveStation) {
              arriveRow = Object.assign(data[i], {
                beforeDepartStation: false,
                isDepartStation: false,
                afterArriveStation: false,
                isArriveStation: true,
              });
            } else {
              Object.assign(data[i], {
                beforeDepartStation: false,
                isDepartStation: false,
                afterArriveStation: false,
                isArriveStation: false,
              });
            }
          } else {
            Object.assign(data[i], {
              beforeDepartStation: false,
              isDepartStation: false,
              afterArriveStation: true,
              isArriveStation: false,
            });
          }

          Object.assign(data[i], {
            isStartStation: i === 0,
            isEndStation: i === data.length - 1,
          });
        }

        setScheduleList(data);
      });
  }, [departDate, trainNumber, departStation, arriveStation]);
  return (
    <div className="schedule">
      <div className="dialog">
        <h1>列车时刻表</h1>
        <div className="head">
          <span className="station">车站</span>
          <span className="deptime">到达</span>
          <span className="arrtime">发车</span>
          <span className="stoptime">停留时间</span>
        </div>
        <ul>
          {scheduleList.map((schedule: any, index) => {
            return (
              <ScheduleRow
                key={schedule.station}
                index={index + 1}
                {...schedule}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
});

export default Schedule;
