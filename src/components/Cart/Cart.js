import React, { useContext } from "react";
import CartContext from "../../context/CartContext/CartContext";
import CartItem from "./CartItem/CartItem";
import Modal from "../UI/Modal/Modal";
import style from "./Cart.module.css";

function Cart(props) {
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  function removeCartItem(id) {
    cartCtx.removeItem(id);
  }
  function addCartItem(item) {
    cartCtx.addItem({ ...item, amount: 1 });
  }

  const cartItems = (
    <ul className={style["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={removeCartItem.bind(null, item.id)}
          onAdd={addCartItem.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={style.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={style.actions}>
        <button className={style["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={style.button}>Order</button>}
      </div>
    </Modal>
  );
}

export default Cart;
