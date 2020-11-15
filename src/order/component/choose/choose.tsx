import React from "react";
import { FC, memo } from "react";
import "./choose.scss";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { OrderState } from "../../../common/interface/redux";
import classNames from "classnames";
import { updatePassenger } from "../../redux/action";
const Choose: FC = memo(function () {
  const dispatch = useDispatch();
  const { passengers } = useSelector(
    (state: OrderState) => ({
      passengers: state.passengers,
    }),
    shallowEqual
  );
  function createSeat(seatType) {
    return (
      <div>
        {passengers.map((passenger) => {
          return (
            <p
              key={passenger.id}
              className={classNames("seat", {
                active: passenger.seat === seatType,
              })}
              data-text={seatType}
              onClick={() => {
                dispatch(
                  updatePassenger(passenger.id, {
                    seat: seatType,
                  })
                );
              }}
            >
              &#xe02d;
            </p>
          );
        })}
      </div>
    );
  }
  if (!passengers || !passengers.length) {
    return null;
  }
  return (
    <div className="choose">
      <p className="tip">在线选座</p>
      <div className="container">
        <div className="seats">
          <div>窗</div>
          {createSeat("A")}
          {createSeat("B")}
          {createSeat("C")}
          <div>过道</div>
          {createSeat("D")}
          {createSeat("F")}
          <div>窗</div>
        </div>
      </div>
    </div>
  );
});
export default Choose;
