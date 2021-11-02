const nameInput = document.getElementById("name");
const surnameInput = document.getElementById("surname");
const emailInput = document.getElementById("email");
const ciInput = document.getElementById("ci");

const deptSelect = document.getElementById("departamento");
const locSelect = document.getElementById("localidad");

const form = document.getElementById("form");

const dptosLocs = {
  Artigas: ["Artigas", "Bella Unión"],
  Canelones: ["Canelones", "Santa Lucía"],
  Montevideo: ["Montevideo"],
  Salto: ["Salto", "Daymán", "Arapey"],
};

function validarCedula(ci) {
  //Inicializo los coefcientes en el orden correcto
  var arrCoefs = new Array(2, 9, 8, 7, 6, 3, 4, 1);
  var suma = 0;
  //Para el caso en el que la CI tiene menos de 8 digitos
  //calculo cuantos coeficientes no voy a usar
  var difCoef = parseInt(arrCoefs.length - ci.length);
  //recorro cada digito empezando por el de más a la derecha
  //o sea, el digito verificador, el que tiene indice mayor en el array
  for (var i = ci.length - 1; i > -1; i--) {
    //Obtengo el digito correspondiente de la ci recibida
    var dig = ci.substring(i, i + 1);
    //Lo tenía como caracter, lo transformo a int para poder operar
    var digInt = parseInt(dig);
    //Obtengo el coeficiente correspondiente al ésta posición del digito
    var coef = arrCoefs[i + difCoef];
    //Multiplico dígito por coeficiente y lo acumulo a la suma total
    suma = suma + digInt * coef;
  }
  var result = false;
  // si la suma es múltiplo de 10 es una ci válida
  if (suma % 10 === 0) {
    result = true;
  }
  return result;
}

function handleDeptChange(e) {
  // get value
  const optionVal = e.target.value;

  // empty out locSelect
  locSelect.innerHTML = '<option value="0">Localidad</option>';

  // return if option is falsy
  if (!optionVal) return;

  // insert new options
  dptosLocs[optionVal].forEach((loc) => {
    const option = document.createElement("option");
    option.innerHTML = loc;
    option.value = loc;

    locSelect.insertAdjacentElement("beforeend", option);
  });
}

function applyErrror(elem) {
  // highlight name border
  const boxParent = elem.closest(".form__box");
  boxParent.classList.add("invalid");

  // display error message
  const errorEl = boxParent.querySelector(".form__error");
  errorEl.classList.add("invalid");
}

function handleFormSubmit(e) {
  e.preventDefault();

  let valid = true;

  // check if values are valid
  if (nameInput.value.length < 2) {
    applyErrror(nameInput);

    valid = false;
  }

  if (surnameInput.value.length < 2) {
    applyErrror(surnameInput);

    valid = false;
  }

  if (deptSelect.value === "0") {
    applyErrror(deptSelect);

    valid = false;
  }

  if (locSelect.value === "0") {
    applyErrror(locSelect);

    valid = false;
  }

  if (!validarCedula(ciInput.value)) {
    applyErrror(ciInput);

    valid = false;
  }

  if (valid) {
    // Reset inputs
    nameInput.value = "";
    surnameInput.value = "";
    emailInput.value = "";
    ciInput.value = "";

    deptSelect.value = "0";

    // submit
    e.target.submit();
  }

  return;
}

function handleInputLabels(e) {
  const boxParent = e.target.closest(".form__box");
  const label = boxParent.querySelector(".form__label");

  if (e.target.value) {
    // Change padding on input and display it's label
    e.target.classList.add("filled");

    label.classList.add("filled");
  } else {
    e.target.classList.remove("filled");
    label.classList.remove("filled");
  }
}

function handleInputErrorFocus(e) {
  const boxParent = e.target.closest(".form__box");
  boxParent.classList.remove("invalid");

  const errorEl = boxParent.querySelector(".form__error");
  errorEl.classList.remove("invalid");
}

function handleMoveArticles() {
  const innerWidth = window.innerWidth;
  const articles = Array.from(
    document.querySelector(".articles__list").children
  );

  if (innerWidth > 700) {
    articles.forEach((elem, i) => {
      if ((i + 1) % 2 === 0) {
        elem.style.transform = "translateY(2rem)";
      }
    });
  } else {
    articles.forEach((elem, i) => {
      if ((i + 1) % 2 === 0) {
        elem.style.transform = "";
      }
    });
  }
}

// Fill deptSelect
const dptos = Object.keys(dptosLocs);

dptos.forEach((dpto) => {
  const option = document.createElement("option");
  option.innerHTML = dpto;
  option.value = dpto;

  deptSelect.insertAdjacentElement("beforeend", option);
});

// Depending on the selected departamento, fill locSelect accordingly
deptSelect.onchange = handleDeptChange;

// Form validation
form.onsubmit = handleFormSubmit;

// Swap between placeholder and label in inputs
nameInput.onchange = handleInputLabels;
surnameInput.onchange = handleInputLabels;
emailInput.onchange = handleInputLabels;
ciInput.onchange = handleInputLabels;

// Show error message when input is invalid
nameInput.onfocus = handleInputErrorFocus;
surnameInput.onfocus = handleInputErrorFocus;
emailInput.onfocus = handleInputErrorFocus;
ciInput.onfocus = handleInputErrorFocus;
deptSelect.onfocus = handleInputErrorFocus;
locSelect.onfocus = handleInputErrorFocus;

// If there are 4 columns of articles, add 'step' feature
window.addEventListener("resize", handleMoveArticles);

// Apply 'step' feature when document is ready
document.addEventListener("DOMContentLoaded", handleMoveArticles);
