//Librairies
import React, { useState } from "react";
import classes from "./Ajouter.module.css";

// Composants
import Input from "../../../Components/UI/Input/Input";

function Ajouter() {
  //States
  const [inputs, setInputs] = useState({
    titre: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Titre de l'article",
      },
      value: "",
      label: "Titre",
      valid: false,
      validation: {
        required: true,
        minLenght: 5,
        maxLenght: 85,
      },
      touched: false,
    },

    contenu: {
      elementType: "textarea",
      elementConfig: {},
      value: "",
      label: "Contenu de l'article",
      valid: false,
      validation: {
        required: true,
        minLenght: 5,
        maxLenght: 85,
      },
      touched: false,
    },
    auteur: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "L'auteur de l'article",
      },
      value: "",
      label: "auteur",
      valid: false,
      validation: {
        required: true,
        minLenght: 5,
        maxLenght: 85,
      },
      touched: false,
    },
    brouillon: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: true, displayValue: "Bouillon" },
          { value: false, displayValue: "Publié" },
        ],
      },
      value: "",
      label: "Etat",
      valid: true,
      validation: {},
    },
  });

  const [valid, setValid] = useState(false);

  // Fonctions

  const checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLenght) {
      isValid = value.lenght >= value.minLenght && isValid;
    }

    if (rules.maxLenght) {
      isValid = value.lenght <= value.maxLenght && isValid;
    }

    return isValid;
  };

  const inputChangedHandler = (event, id) => {
    //Change la valeur
    const nouveauxInputs = { ...inputs };
    nouveauxInputs[id].value = event.target.value;
    nouveauxInputs[id].touched = true;

    // Vérification du formulaire
    nouveauxInputs[id].value = checkValidity(
      event.target.value,
      nouveauxInputs[id].validation
    );
    setInputs(nouveauxInputs);

    //Vérifiaction de la valeur
    let formIsValid = true;

    for (let input in nouveauxInputs) {
      formIsValid = nouveauxInputs[input].valid && formIsValid;
    }
    setValid(formIsValid);
  };

  const formHandler = (event) => {
    event.preventDefault();
  };

  // Variable

  const formElementsArray = [];
  for (let key in inputs) {
    formElementsArray.push({ id: key, config: inputs[key] });
  }

  let form = (
    <form className={classes.Ajouter} onSubmit={(e) => formHandler(e)}>
      {formElementsArray.map((formElement) => (
        <Input
          key={formElement.id}
          id={formElement.id}
          value={formElement.config.value}
          label={formElement.config.label}
          type={formElement.config.elementType}
          config={formElement.config.elementConfig}
          invalid={formElement.config.valid}
          touched={formElement.config.touched}
          changed={(e) => inputChangedHandler(e, formElement.id)}
        />
      ))}
      <div className={classes.submit}>
        <input type="submit" value="Ajouter un article" disabled={!valid} />
      </div>
    </form>
  );

  return (
    <div className="container">
      <h1>Ajouter</h1>
      {form}
    </div>
  );
}

export default Ajouter;
