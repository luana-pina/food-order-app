import React from "react";
import CartIcon from "../../Cart/CartIcon";
import style from "./HeaderButton.module.css";

function HeaderButton(props) {
  return (
    <button className={style.button}>
      <span className={style.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={style.badge}>3</span>
    </button>
  );
}

export default HeaderButton;
