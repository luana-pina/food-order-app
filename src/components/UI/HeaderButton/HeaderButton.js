import React, { useContext, useEffect, useState } from "react";
import CartContext from "../../../context/CartContext/CartContext";
import CartIcon from "../../Cart/CartIcon";
import style from "./HeaderButton.module.css";

function HeaderButton(props) {
  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;
  const numbCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);
  const [btnAnimation, setBtnAnimation] = useState(false);
  const btnStyle = `${style.button} ${btnAnimation ? style.bump : ""}`;

  useEffect(() => {
    if (items.length === 0) return;
    setBtnAnimation(true);

    const timer = setTimeout(() => {
      setBtnAnimation(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnStyle} onClick={props.onClick}>
      <span className={style.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={style.badge}>{numbCartItems}</span>
    </button>
  );
}

export default HeaderButton;
