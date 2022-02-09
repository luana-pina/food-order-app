import React, { useRef, useState } from "react";
import style from "./Checkout.module.css";

function isEmpty(value) {
  return value.trim() === "";
}
function isValidPostal(value) {
  return value.trim().length === 5;
}
function formIsValid(entries) {
  let formIsValid = true;
  for (const key in entries) {
    if (!entries[key].isValid) {
      formIsValid = false;
    }
  }
  return formIsValid;
}
function convertUserData(userData) {
  return {
    name: userData.name.value,
    street: userData.street.value,
    postalCode: userData.postal.value,
    city: userData.city.value,
  };
}

function Checkout(props) {
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();
  const [inputsData, setInputsData] = useState({
    name: {
      value: "",
      isValid: true,
    },
    street: {
      value: "",
      isValid: true,
    },
    postal: {
      value: "",
      isValid: true,
    },
    city: {
      value: "",
      isValid: true,
    },
  });

  function confirmHandler(e) {
    e.preventDefault();
    const updatedInputsData = {
      name: {
        value: nameInputRef.current.value,
        isValid: !isEmpty(nameInputRef.current.value),
      },
      street: {
        value: streetInputRef.current.value,
        isValid: !isEmpty(streetInputRef.current.value),
      },
      postal: {
        value: postalInputRef.current.value,
        isValid: isValidPostal(postalInputRef.current.value),
      },
      city: {
        value: cityInputRef.current.value,
        isValid: !isEmpty(cityInputRef.current.value),
      },
    };
    setInputsData(updatedInputsData);
    if (!formIsValid(updatedInputsData)) {
      return;
    }
    props.onConfirm(convertUserData(updatedInputsData));
  }

  const controlInvalidNameStyle = `${style.control} ${
    inputsData.name.isValid ? "" : style.invalid
  }`;
  const controlInvalidStreetStyle = `${style.control} ${
    inputsData.street.isValid ? "" : style.invalid
  }`;
  const controlInvalidPostalStyle = `${style.control} ${
    inputsData.postal.isValid ? "" : style.invalid
  }`;
  const controlInvalidCityStyle = `${style.control} ${
    inputsData.city.isValid ? "" : style.invalid
  }`;

  return (
    <form className={style.form} onSubmit={confirmHandler}>
      <div className={controlInvalidNameStyle}>
        <label htmlFor="name"> Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!inputsData.name.isValid && <p>Please enter a valid name!</p>}
      </div>
      <div className={controlInvalidStreetStyle}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!inputsData.street.isValid && <p>Please enter a valid street!</p>}
      </div>
      <div className={controlInvalidPostalStyle}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!inputsData.postal.isValid && <p>Please enter a valid postal code!</p>}
      </div>
      <div className={controlInvalidCityStyle}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!inputsData.city.isValid && <p>Please enter a valid city!</p>}
      </div>
      <div className={style.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={style.submit}>Confirm</button>
      </div>
    </form>
  );
}

export default Checkout;
