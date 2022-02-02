import React, { useRef, useState } from "react";
import Input from "../../../UI/Input/Input";
import style from "./MealItemForm.module.css";

function MealItemForm(props) {
  const amountInputRef = useRef();
  const [isValidAmount, setIsValidAmount] = useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setIsValidAmount(false);
      return;
    }
    props.onAddToCart(enteredAmountNumber);
  }

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          type: "number",
          id: "amound__" + props.id,
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!isValidAmount && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
}

export default MealItemForm;
