import React, { useContext } from "react";
import CartContext from "../../../context/CartContext/CartContext";
import style from "./MealItem.module.css";
import MealItemForm from "./MealItemForm/MealItemForm";

function MealItem(props) {
  const cartCtx = useContext(CartContext);
  const price = `$${props.price.toFixed(2)}`;

  function addToCart(amount) {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  }

  return (
    <li className={style.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={style.description}>{props.description}</div>
        <div className={style.price}>{price}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCart} />
      </div>
    </li>
  );
}

export default MealItem;
