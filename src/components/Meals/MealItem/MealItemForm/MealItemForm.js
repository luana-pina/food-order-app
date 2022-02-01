import React from "react";
import Input from "../../../UI/Input/Input";
import style from "./MealItemForm.module.css";

function MealItemForm(props) {
  return (
    <form className={style.form}>
      <Input
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
    </form>
  );
}

export default MealItemForm;
