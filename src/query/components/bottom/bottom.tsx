import "./bottom.scss";
import { FC, memo } from "react";
import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ORDER_DEPART, ORDER_DURATION } from "../../../common/utils/config";
import { QueryState } from "../../../common/interface/redux";
import { ACTION_SET_ORDER_TYPE } from "../../redux/actionTypes";
import classNames from "classnames";
import {
  setHighSpeed,
  toggleIsFiltersVisible,
  toggleOnlyTickets,
} from "../../redux/action";
const Bottom: FC = memo(function () {
  const dispatch = useDispatch();
  const { orderType, highSpeed, onlyTickets, isFiltersVisible } = useSelector(
    (state: QueryState) => ({
      orderType: state.orderType,
      highSpeed: state.highSpeed,
      onlyTickets: state.onlyTickets,
      isFiltersVisible: state.isFiltersVisible,
    }),
    shallowEqual
  );
  return (
    <div className="bottom">
      <div className="bottom-filters">
        <span
          className="item"
          onClick={() => {
            if (orderType === ORDER_DEPART) {
              dispatch({
                type: ACTION_SET_ORDER_TYPE,
                payload: ORDER_DURATION,
              });
            } else {
              dispatch({
                type: ACTION_SET_ORDER_TYPE,
                payload: ORDER_DEPART,
              });
            }
          }}
        >
          <i className="icon">&#xf065;</i>
          {orderType === ORDER_DEPART ? "出发 早→晚" : "耗时 短→长"}
        </span>
        <span
          className={classNames("item", { "item-on": highSpeed })}
          onClick={() => {
            dispatch(setHighSpeed(!highSpeed));
          }}
        >
          <i className="icon">{highSpeed ? "\uf43f" : "\uf43e"}</i>
          只看高铁动车
        </span>
        <span
          className={classNames("item", { "item-on": onlyTickets })}
          onClick={() => {
            dispatch(toggleOnlyTickets(!onlyTickets));
          }}
        >
          <i className="icon">{onlyTickets ? "\uf43d" : "\uf43c"}</i>
          只看有票
        </span>
        <span
          className={classNames("item", {
            "item-on": isFiltersVisible,
          })}
          onClick={() => {
            dispatch(toggleIsFiltersVisible(!isFiltersVisible));
          }}
        >
          <i className="icon">{isFiltersVisible ? "\uf0f7" : "\uf446"}</i>
          综合筛选
        </span>
      </div>
    </div>
  );
});

export default Bottom;
