import React, { useMemo } from "react";
import { FC, memo } from "react";
import {
  AdultPassenger,
  ChildPassenger,
  Passenger,
} from "../../../common/interface/passenger";
import {
  setPassengers,
  showFollowAdultMenu,
  showGenderMenu,
  showTicketTypeMenu,
} from "../../redux/action";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { OrderState } from "../../../common/interface/redux";
import "./passegers.scss";

const PassengerInfo: FC<Passenger> = memo(function (passenger) {
  const { id, name, ticketType } = passenger;
  const isAdult = ticketType === "adult";
  const dispatch = useDispatch();
  const { passengers } = useSelector(
    (state: OrderState) => ({
      passengers: state.passengers,
    }),
    shallowEqual
  );
  function onRemove(id) {
    const newPassengers = passengers.filter((passenger) => {
      return (
        passenger.id !== id && (passenger as ChildPassenger).followAdult !== id
      );
    });

    dispatch(setPassengers(newPassengers));
  }
  function onUpdate(id, data, keysToBeRemoved = []) {
    for (let i = 0; i < passengers.length; ++i) {
      if (passengers[i].id === id) {
        const newPassengers = [...passengers];
        newPassengers[i] = Object.assign({}, passengers[i], data);

        for (let key of keysToBeRemoved) {
          delete newPassengers[i][key];
        }

        dispatch(setPassengers(newPassengers));

        break;
      }
    }
  }
  const nameMap = useMemo(() => {
    const ret = {};

    for (const passenger of passengers) {
      ret[passenger.id] = passenger.name;
    }

    return ret;
  }, [passengers]);
  return (
    <li className="passenger">
      <i className="delete" onClick={() => onRemove(id)}>
        —
      </i>
      <ol className="items">
        <li className="item">
          <label className="label name">姓名</label>
          <input
            type="text"
            className="input name"
            placeholder="乘客姓名"
            value={name}
            onChange={(e) => onUpdate(id, { name: e.target.value })}
          />
          <label
            onClick={() => {
              dispatch(showTicketTypeMenu(id));
            }}
            className="ticket-type"
          >
            {isAdult ? "成人票" : "儿童票"}
          </label>
        </li>
        {isAdult && (
          <li className="item">
            <label className="label licenceNo">身份证</label>
            <input
              type="text"
              className="input licenceNo"
              placeholder="证件号码"
              value={(passenger as AdultPassenger).licenceNo}
              onChange={(e) => onUpdate(id, { licenceNo: e.target.value })}
            />
          </li>
        )}
        {!isAdult && (
          <li className="item arrow">
            <label className="label gender">性别</label>
            <input
              type="text"
              className="input gender"
              placeholder="请选择"
              onClick={() => {
                dispatch(showGenderMenu(id));
              }}
              value={
                (passenger as ChildPassenger).gender === "male"
                  ? "男"
                  : (passenger as ChildPassenger).gender === "female"
                  ? "女"
                  : ""
              }
              readOnly
            />
          </li>
        )}
        {!isAdult && (
          <li className="item">
            <label className="label birthday">出生日期</label>
            <input
              type="text"
              className="input birthday"
              placeholder="如 19951015"
              value={(passenger as ChildPassenger).birthday}
              onChange={(e) => onUpdate(id, { birthday: e.target.value })}
            />
          </li>
        )}
        {!isAdult && (
          <li className="item arrow">
            <label className="label followAdult">同行成人</label>
            <input
              type="text"
              onClick={() => {
                dispatch(showFollowAdultMenu(id));
              }}
              className="input followAdult"
              placeholder="请选择"
              value={nameMap[(passenger as ChildPassenger).followAdult]}
              readOnly
            />
          </li>
        )}
      </ol>
    </li>
  );
});

export default PassengerInfo;
