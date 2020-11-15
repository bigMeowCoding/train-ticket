import "./account.scss";
import { FC, memo, useState } from "react";
import React from "react";
import classNames from "classnames";
import { shallowEqual, useSelector } from "react-redux";
import { OrderState } from "../../../common/interface/redux";
const Account: FC = memo(function () {
  const { passengers, price } = useSelector(
    (state: OrderState) => ({
      passengers: state.passengers,

      price: state.price,
    }),
    shallowEqual
  );
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="account">
      <div
        className={classNames("price", { expanded })}
        onClick={() => setExpanded(!expanded)}
      >
        <div className="money">{(passengers && passengers.length) * price}</div>
        <div className="amount">支付金额</div>
      </div>
      <div className="button">提交按钮</div>
      <div
        className={classNames("layer", { hidden: !expanded })}
        onClick={() => setExpanded(false)}
      ></div>
      <div className={classNames("detail", { hidden: !expanded })}>
        <div className="title">金额详情</div>
        <ul>
          <li>
            <span>火车票</span>
            <span>￥{price}</span>
            <span>&#xD7;{passengers && passengers.length}</span>
          </li>
        </ul>
      </div>
    </div>
  );
});

export default Account;
