//Librairies
import React, { useState } from "react";
import classes from "./Ajouter.module.css";
import axios from "../../../config/axios-firebase";
import routes from "../../../config/routes";

// Composants
import Input from "../../../Components/UI/Input/Input";

function Ajouter(props) {
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
    accroche: {
      elementType: "textarea",
      elementConfig: {},
      value: "",
      label: "Accroche de l'article",
      valid: false,
      validation: {
        required: true,
        minLength: 10,
        maxLength: 140,
      },
      touched: false,
      errorMessage:
        "Le contenu ne doit pas être vide et doit être comprise entre 50 et 140 caractères.",
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
      value: true,
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

  const generateSlug = (str) => {
    str = str.replace(/^\s+|\s+$/g, ""); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to = "aaaaeeeeiiiioooouuuunc------";
    for (var i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
    }

    str = str
      .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
      .replace(/\s+/g, "-") // collapse whitespace and replace by -
      .replace(/-+/g, "-"); // collapse dashes

    return str;
  }

  const formHandler = (event) => {
    event.preventDefault();

    const slug = generateSlug(inputs.titre.value);
    
    const article = {
      titre: inputs.titre.value,
      contenu: inputs.contenu.value,
      auteur: inputs.auteur.value,
      brouillon: inputs.brouillon.value,
      accroche: inputs.accroche.value,
      date: Date.now(),
      slug: slug,
    };
    axios
      .post("/article.json", article)
      .then((response) => {
        console.log(response);
        props.history.replace(routes.ARTICLES);
      })
      .catch((error) => {
        console.log(error);
      });
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
          errorMessage={formElement.config.errorMessage}
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
