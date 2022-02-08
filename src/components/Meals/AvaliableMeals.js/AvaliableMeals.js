import { useEffect, useState } from "react";
import Card from "../../UI/Card/Card";
import MealItem from "../MealItem/MealItem";
import style from "./AvaliableMeals.module.css";

function AvaliableMeals() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataError, setDataError] = useState(null);

  useEffect(() => {
    async function getMeals() {
      const res = await fetch(
        "https://food-order-app-62352-default-rtdb.firebaseio.com/meals.json"
      );

      if (!res.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await res.json();

      const loadedMeals = [];

      for (const key in resData) {
        loadedMeals.push({
          id: key,
          name: resData[key].name,
          description: resData[key].description,
          price: resData[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    }
    getMeals().catch((error) => {
      setIsLoading(false);
      setDataError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={style.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }
  if (dataError) {
    return (
      <section className={style.MealsError}>
        <p>{dataError}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      price={meal.price}
      description={meal.description}
    />
  ));

  return (
    <section className={style.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
}

export default AvaliableMeals;
