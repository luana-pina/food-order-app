import React, { useContext, useState } from "react";
import CartContext from "../../context/CartContext/CartContext";
import CartItem from "./CartItem/CartItem";
import Modal from "../UI/Modal/Modal";
import style from "./Cart.module.css";
import Checkout from "./Checkout/Checkout";

function Cart(props) {
  const [isCheckout, setIsCheckout] = useState(false);
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  function removeCartItem(id) {
    cartCtx.removeItem(id);
  }
  function addCartItem(item) {
    cartCtx.addItem({ ...item, amount: 1 });
  }
  function orderHandler() {
    setIsCheckout(true);
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

  const modalButtons = (
    <div className={style.actions}>
      <button className={style["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && !isCheckout && (
        <button className={style.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={style.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout onCancel={props.onClose} />}
      {!isCheckout && modalButtons}
    </Modal>
  );
}

export default Cart;
