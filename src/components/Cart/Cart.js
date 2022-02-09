import React, { useContext, useState } from "react";
import CartContext from "../../context/CartContext/CartContext";
import CartItem from "./CartItem/CartItem";
import Modal from "../UI/Modal/Modal";
import style from "./Cart.module.css";
import Checkout from "./Checkout/Checkout";
import { Fragment } from "react/cjs/react.production.min";

function Cart(props) {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successSubmit, setSuccessSubmit] = useState(false);
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
  async function submitOrderHandler(userData) {
    setIsSubmitting(true);
    await fetch(
      "https://food-order-app-62352-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderItems: cartCtx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setSuccessSubmit(true);
    cartCtx.clearCart();
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

  let cartContent;
  if (successSubmit) {
    cartContent = (
      <Fragment>
        <p>Successfully sent the order!</p>
        <div className={style.actions}>
          <button className={style.button} onClick={props.onClose}>
            Close
          </button>
        </div>
      </Fragment>
    );
  } else {
    cartContent = (
      <Fragment>
        {cartItems}
        <div className={style.total}>
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>
        {isCheckout && (
          <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
        )}
        {!isCheckout && modalButtons}
      </Fragment>
    );
  }

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && cartContent}
      {isSubmitting && <p>Sending order data...</p>}
    </Modal>
  );
}

export default Cart;
