import React from "react";
import { FC, memo } from "react";
import MenuItem from "./menu-item";
import './menu.scss'
import classNames from "classnames";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { hideMenu } from "../../redux/action";
import { MenuI } from "../../../common/interface/menu";
import { OrderState } from "../../../common/interface/redux";
const Menu: FC<{ show: boolean }> = memo(function ({
  show,
}) {
  const dispatch = useDispatch();
  const { menu } = useSelector(
    (state: OrderState) => ({
      menu: state.menu,
    }),
    shallowEqual
  );
  return (
    <div>
      {show && (
        <div
          className="menu-mask"
          onClick={() => {
            dispatch(hideMenu());
          }}
        ></div>
      )}
      <div className={classNames("menu", { show })}>
        <div className="menu-title"></div>
        <ul>
          {menu && menu.options &&
            menu.options.map((option) => {
              return (
                <MenuItem
                  key={option.value}
                  {...option}
                  onPress={menu.onPress}
                ></MenuItem>
              );
            })}
        </ul>
      </div>
    </div>
  );
});

export default Menu;
