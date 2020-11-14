import React, { useState } from "react";
import { FC } from "react";
import Option from "./option";
import { shallowEqual, useSelector } from "react-redux";
import { QueryState } from "../../../common/interface/redux";
import classNames from "classnames";
import Slider from "../../../common/components/slider/slider";

const BottomModal: FC = function () {
  const {
    ticketTypes,
    trainTypes,
    departStations,
    arriveStations,
    checkedTrainTypes,
    checkedTicketTypes,
    checkedDepartStations,
    checkedArriveStations,
    departTimeStart,
    departTimeEnd,
    arriveTimeStart,
    arriveTimeEnd,
  } = useSelector(
    (state: QueryState) => ({
      ticketTypes: state.ticketTypes,
      trainTypes: state.trainTypes,
      departStations: state.departStations,
      arriveStations: state.arriveStations,
      checkedTrainTypes: state.checkedTrainTypes,
      checkedTicketTypes: state.checkedTicketTypes,
      checkedDepartStations: state.checkedDepartStations,
      checkedArriveStations: state.checkedArriveStations,
      departTimeStart: state.departTimeStart,
      departTimeEnd: state.departTimeEnd,
      arriveTimeStart: state.arriveTimeStart,
      arriveTimeEnd: state.arriveTimeEnd,
    }),
    shallowEqual
  );
  const [localCheckedTicketTypes, setLocalCheckedTicketTypes] = useState([
    ...checkedTicketTypes,
  ]);
  console.log(checkedTrainTypes);
  const [localCheckedTrainTypes, setLocalCheckedTrainTypes] = useState([
    ...checkedTrainTypes,
  ]);
  const [localCheckedDepartStations, setLocalCheckedDepartStations] = useState([
    ...checkedDepartStations,
  ]);
  const [localCheckedArriveStations, setLocalCheckedArriveStations] = useState([
    ...checkedArriveStations,
  ]);
  const optionGroup = [
    {
      title: "坐席类型",
      options: ticketTypes,
      checkedMap: localCheckedTicketTypes,
      update: setLocalCheckedTicketTypes,
    },
    {
      title: "车次类型",
      options: trainTypes,
      checkedMap: localCheckedTrainTypes,
      update: setLocalCheckedTrainTypes,
    },
    {
      title: "出发车站",
      options: departStations,
      checkedMap: localCheckedDepartStations,
      update: setLocalCheckedDepartStations,
    },
    {
      title: "到达车站",
      options: arriveStations,
      checkedMap: localCheckedArriveStations,
      update: setLocalCheckedArriveStations,
    },
  ];
  const [localDepartTimeStart, setLocalDepartTimeStart] = useState(
    departTimeStart
  );
  const [localDepartTimeEnd, setLocalDepartTimeEnd] = useState(departTimeEnd);
  const [localArriveTimeStart, setLocalArriveTimeStart] = useState(
    arriveTimeStart
  );
  const [localArriveTimeEnd, setLocalArriveTimeEnd] = useState(arriveTimeEnd);
  return (
    <div className="bottom-modal">
      <div className="bottom-dialog">
        <div className="bottom-dialog-content">
          <div className="title">
            <span className={classNames("reset")} onClick={() => {}}>
              重置
            </span>
            <span className="ok">确定</span>
          </div>
          <div className="options">
            {optionGroup.map((group) => (
              <Option {...group} key={group.title} />
            ))}
            <Slider
              title="出发时间"
              currentStartHours={localDepartTimeStart}
              currentEndHours={localDepartTimeEnd}
              onStartChanged={setLocalDepartTimeStart}
              onEndChanged={setLocalDepartTimeEnd}
            />
            <Slider
              title="到达时间"
              currentStartHours={localArriveTimeStart}
              currentEndHours={localArriveTimeEnd}
              onStartChanged={setLocalArriveTimeStart}
              onEndChanged={setLocalArriveTimeEnd}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomModal;
