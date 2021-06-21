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
        minLength: 5,
        maxLength: 85,
      },
      touched: false,
      errorMessage: "Le titre doit faire entre 5 et 85 caractères.",
    },
    contenu: {
      elementType: "textarea",
      elementConfig: {},
      value: "",
      label: "Contenu de l'article",
      valid: false,
      validation: {
        required: true,
      },
      touched: false,
      errorMessage: "Le contenu ne doit pas être vide.",
    },
    auteur: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Auteur de l'article",
      },
      value: "",
      label: "Auteur",
      valid: false,
      validation: {
        required: true,
      },
      touched: false,
      errorMessage: "Il doit y avoir un auteur pour cet article.",
    },
    brouillon: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: true, displayValue: "Brouillon" },
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
    // Change la valeur
    const nouveauxInputs = { ...inputs };
    nouveauxInputs[id].value = event.target.value;
    nouveauxInputs[id].touched = true;

    // Vérification de la valeur
    nouveauxInputs[id].valid = checkValidity(
      event.target.value,
      nouveauxInputs[id].validation
    );

    setInputs(nouveauxInputs);

    // Vérification du formulaire
    let formIsValid = true;
    for (let input in nouveauxInputs) {
      formIsValid = nouveauxInputs[input].valid && formIsValid;
    }
    setValid(formIsValid);
  };

  const formHandler = (event) => {
    event.preventDefault();

    console.log("test");
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
          valid={formElement.config.valid}
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
