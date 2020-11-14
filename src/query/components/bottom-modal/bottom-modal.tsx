import React, { useMemo, useReducer, useState } from "react";
import { FC } from "react";
import Option from "./option";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Action, QueryState } from "../../../common/interface/redux";
import classNames from "classnames";
import Slider from "../../../common/components/slider/slider";
import {
  setArriveTimeEnd,
  setArriveTimeStart,
  setCheckedArriveStations,
  setCheckedDepartStations,
  setCheckedTicketTypes,
  setCheckedTrainTypes,
  setDepartTimeEnd,
  setDepartTimeStart,
  toggleIsFiltersVisible,
} from "../../redux/action";
import {
  StationType,
  TicketType,
  TrainType,
} from "../../../common/interface/ticket";
function checkedReducer(
  state: TicketType[] | TrainType[] | StationType[],
  action: Action
) {
  const { type, payload } = action;
  let newState;

  switch (type) {
    case "toggle":
      const newState = [...state];
      const findIndex = state.findIndex((item) => item.value === payload.value);
      if (findIndex !== -1) {
        newState.splice(findIndex, 1);
      } else {
        newState.push({
          ...payload,
        });
      }
      return newState;
    case "reset":
      return [];
    default:
  }

  return state;
}

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
  const dispatch = useDispatch();
  const [localCheckedTicketTypes, setLocalCheckedTicketTypes] = useReducer(
    checkedReducer,
    checkedTicketTypes,
    (checkedTicketTypes) => {
      return [...checkedTicketTypes];
    }
  );
  const [localCheckedTrainTypes, setLocalCheckedTrainTypes] = useReducer(
    checkedReducer,
    checkedTrainTypes,
    (checkedTrainTypes) => {
      return [...checkedTrainTypes];
    }
  );
  const [
    localCheckedDepartStations,
    setLocalCheckedDepartStations,
  ] = useReducer(checkedReducer, checkedTrainTypes, (checkedDepartStations) => {
    return [...checkedDepartStations];
  });
  const [
    localCheckedArriveStations,
    setLocalCheckedArriveStations,
  ] = useReducer(checkedReducer, checkedArriveStations, () => {
    return [...checkedArriveStations];
  });
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

  function sure() {
    dispatch(setCheckedTicketTypes(localCheckedTicketTypes));
    dispatch(setCheckedTrainTypes(localCheckedTrainTypes));
    dispatch(setCheckedDepartStations(localCheckedDepartStations));
    dispatch(setCheckedArriveStations(localCheckedArriveStations));
    dispatch(setDepartTimeStart(localDepartTimeStart));
    dispatch(setDepartTimeEnd(localDepartTimeEnd));
    dispatch(setArriveTimeStart(localArriveTimeStart));
    dispatch(setArriveTimeEnd(localArriveTimeEnd));
    dispatch(toggleIsFiltersVisible(false));
  }

  const isResetDisabled = useMemo(() => {
    return (
      Object.keys(localCheckedTicketTypes).length === 0 &&
      Object.keys(localCheckedTrainTypes).length === 0 &&
      Object.keys(localCheckedDepartStations).length === 0 &&
      Object.keys(localCheckedArriveStations).length === 0 &&
      localDepartTimeStart === 0 &&
      localDepartTimeEnd === 24 &&
      localArriveTimeStart === 0 &&
      localArriveTimeEnd === 24
    );
  }, [
    localCheckedTicketTypes,
    localCheckedTrainTypes,
    localCheckedDepartStations,
    localCheckedArriveStations,
    localDepartTimeStart,
    localDepartTimeEnd,
    localArriveTimeStart,
    localArriveTimeEnd,
  ]);
  function reset() {
    if (isResetDisabled) {
      return;
    }

    setLocalCheckedTicketTypes({ type: "reset" });
    setLocalCheckedTrainTypes({ type: "reset" });
    setLocalCheckedDepartStations({ type: "reset" });
    setLocalCheckedArriveStations({ type: "reset" });
    setLocalDepartTimeStart(0);
    setLocalDepartTimeEnd(24);
    setLocalArriveTimeStart(0);
    setLocalArriveTimeEnd(24);
  }
  return (
    <div className="bottom-modal">
      <div className="bottom-dialog">
        <div className="bottom-dialog-content">
          <div className="title">
            <span
              className={classNames("reset", {
                disabled: isResetDisabled,
              })}
              onClick={reset}
            >
              重置
            </span>
            <span className="ok" onClick={sure}>
              确定
            </span>
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
