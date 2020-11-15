import React, { memo } from "react";
import { FC } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { OrderState } from "../../../common/interface/redux";
import PassengerInfo from "./passengerInfo";
import { setPassengers } from "../../redux/action";

let passengerIdSeed = 0;

const Passengers: FC = memo(function () {
  const { passengers } = useSelector(
    (state: OrderState) => ({
      passengers: state.passengers,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  function createAdult() {
    for (let passenger of passengers) {
      const keys = Object.keys(passenger);
      for (let key of keys) {
        if (!passenger[key]) {
          return;
        }
      }
    }

    dispatch(
      setPassengers([
        ...passengers,
        {
          id: ++passengerIdSeed,
          name: "",
          ticketType: "adult",
          licenceNo: "",
          seat: "Z",
        },
      ])
    );
  }

  function createChild() {
    let adultFound = null;

    for (let passenger of passengers) {
      const keys = Object.keys(passenger);
      for (let key of keys) {
        if (!passenger[key]) {
          return;
        }
      }

      if (passenger.ticketType === "adult") {
        adultFound = passenger.id;
      }
    }

    if (!adultFound) {
      alert("请至少正确添加一个同行成人");
      return;
    }

    dispatch(
      setPassengers([
        ...passengers,
        {
          id: ++passengerIdSeed,
          name: "",
          gender: "none",
          birthday: "",
          followAdult: adultFound,
          ticketType: "child",
          seat: "Z",
        },
      ])
    );
  }

  return (
    <div className="passengers">
      <ul>
        {passengers.map((passenger) => {
          return <PassengerInfo {...passenger} key={passenger.id} />;
        })}
      </ul>
      <section className="add">
        <div className="adult" onClick={() => createAdult()}>
          添加成人
        </div>
        <div className="child" onClick={() => createChild()}>
          添加儿童
        </div>
      </section>
    </div>
  );
});

export default Passengers;
