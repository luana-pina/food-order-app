import React from "react";
import { Fragment } from "react/cjs/react.production.min";
import AvaliableMeals from "./AvaliableMeals.js/AvaliableMeals";
import MealsSummary from "./MealsSumarry.js/MealsSummary";

function Meals() {
  return (
    <Fragment>
      <MealsSummary />
      <AvaliableMeals />
    </Fragment>
  );
}

export default Meals;
