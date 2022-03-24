// const axios = require("axios"); No se necesita

let config = {
  method: "get",
  url: "https://pokeapi.co/api/v2/pokemon?limit=1126",
  headers: {},
};

let current = 0;
async function buscar_personaje(Bus, dat) {
  let ac = false;
  config.url = "https://pokeapi.co/api/v2/pokemon?limit=1126";
  axios(config)
    .then((response) => {
      for (let i = 0; i < response.data.results.length; i++) {
        if (dat == "name") {
          if (response.data.results[i].name == Bus) {
            ac = true;
            console.log(response.data.results[i].name);
            despliegue([ac, response.data.results[i].url, i]);
          }
        } else if (dat == "ID") {
          if (i + 1 == Bus) {
            ac = true;
            console.log(i);
            despliegue([ac, response.data.results[i].url, i]);
          }
        }
      }
      if (ac == false) {
        despliegue([ac, null, 0]);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function buscarNom() {
  let palabra = document.getElementById("in").value.toLowerCase();
  buscar_personaje(palabra, "name");
}

function despliegue(res) {
  if (res[0]) {
    console.log(res[1]);
    config.url = res[1];
    let types = [];
    axios(config)
      .then((rasponse) => {
        current = res[2];
        let name = rasponse.data.name.split("");
        name[0] = name[0].toUpperCase();
        name = name.join("");
        rasponse.data.types.forEach((ele) => types.push(" " + ele.type.name));
        document.getElementById("Datos").innerHTML = `
      <li id = "dat">Name: ${name}</li>
      <li id = "dat">Type: ${types}</li>
      <li id = "dat">Height: ${rasponse.data.height}</li>
      <li id = "dat">Weight: ${rasponse.data.weight}</li> `;
        document.getElementById("pantalla").setAttribute("src", rasponse.data.sprites.front_default);

        current = res[2] + 1;
        console.log(current);
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    document.getElementById("Datos").innerHTML = "<h1>¿Quién es ese Pokemon?</h1>";
    document.getElementById("pantalla").setAttribute("src", "./assets/whos.png");
    document.getElementById("Datos").setAttribute("style", "color: white;");
  }
}

const naranja = () => {
  document.getElementById("Datos").setAttribute("style", "color: black;");
  siguientee();
  Clean();
};

const verde = () => {
  document.getElementById("Datos").setAttribute("style", "color: black;");
  anteriorr();
  Clean();
};

const azul = () => {
  if (current > 0) {
    buscar_personaje(current, "ID");
  }
  document.getElementById("Datos").setAttribute("style", "color: white;");
  document.getElementById("az").play();
};

function buscarID() {
  let res = buscar_personaje(document.getElementById("in").value, "ID");
  buscar_personaje(res, "ID");
}

function Clean() {
  document.getElementById("Datos").innerHTML = ` `;
  document.getElementById("in").value = "";
}

function Inicio() {
  document.getElementById("Datos").innerHTML = ` `;
  current = 0;
  document.getElementById("in").value = "";
  document.getElementById("pantalla").setAttribute("src", "./assets/Nin.png");
  document.getElementById("ini").play();
}

function siguientee() {
  config.url = "https://pokeapi.co/api/v2/pokemon?limit=1126";
  axios(config)
    .then((response) => {
      if (current < response.data.results.length) {
        current += 1;
        buscar_personaje(current, "ID");
      } else {
        buscar_personaje(current, "ID");
      }
    })
    .catch((error) => console.log(error));
}

function anteriorr() {
  config.url = "https://pokeapi.co/api/v2/pokemon?limit=1126";
  axios(config)
    .then((response) => {
      if (current <= response.data.results.length && current > 0) {
        current -= 1;
        if (current > 0) {
          buscar_personaje(current, "ID");
        } else {
          Inicio();
        }
      } else {
        Inicio();
      }
    })
    .catch((error) => console.log(error));
}

function siguiente() {
  document.getElementById("ne").play();
  config.url = "https://pokeapi.co/api/v2/pokemon?limit=1126";
  axios(config)
    .then((response) => {
      if (current < response.data.results.length) {
        current += 1;
        buscar_personaje(current, "ID");
      } else {
        buscar_personaje(current, "ID");
      }
      document.getElementById("Datos").setAttribute("style", "color: white;");
    })
    .catch((error) => console.log(error));
}

function anterior() {
  document.getElementById("pr").play();
  config.url = "https://pokeapi.co/api/v2/pokemon?limit=1126";
  axios(config)
    .then((response) => {
      if (current <= response.data.results.length && current > 0) {
        current -= 1;
        if (current > 0) {
          buscar_personaje(current, "ID");
        } else {
          Inicio();
        }
      } else {
        Inicio();
      }
      document.getElementById("Datos").setAttribute("style", "color: white;");
    })
    .catch((error) => console.log(error));
}

function imput() {
  if (isNaN(document.getElementById("in").value)) {
    buscarNom();
  } else {
    buscarID();
  }
}

const nom = document.querySelector(".in");

nom.addEventListener("keydown", (e) => {
  /*Aqui evaluamos las teclas para usar 'enter' para que funcione*/
  if (e.keyCode === 13) {
    return imput();
  }
});

let val = true;

const playy = () => {
  if (val) {
    val = false;
    document.getElementById("audio").play();
  } else {
    val = true;
    document.getElementById("audio").pause();
  }
};

// window.addEventListener("keydown", (k) => {
//   if (k.key === 37) {
//     return anterior();
//   } else if (k.key === 38) {
//     return siguiente();
//   } else if (k.key === 39) {
//     return siguiente();
//   } else if (k.key === 40) {
//     return anterior();
//   }
// });
