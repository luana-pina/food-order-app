import React, { Fragment } from "react";
import style from "./Header.module.css";
import mealsImage from "../../../assets/meals.jpg";
import HeaderButton from "../../UI/HeaderButton/HeaderButton";

function Header(props) {
  return (
    <Fragment>
      <header className={style.header}>
        <h1>ReactMeals</h1>
        <HeaderButton>Cart</HeaderButton>
      </header>
      <div className={style["main-image"]}>
        <img src={mealsImage} alt="A table full of delicious food!" />
      </div>
    </Fragment>
  );
}

export default Header;
