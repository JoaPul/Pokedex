// const axios = require("axios"); No se necesita

let config = {
  method: "get",
  url: "https://pokeapi.co/api/v2/pokemon?limit=1126",
  headers: {},
};

let current = 0;

async function buscar_personaje(Bus, dat) {
  config.url = "https://pokeapi.co/api/v2/pokemon?limit=1126";
  axios(config)
    .then((response) => {
      let b = 0;
      for (let i = 0; i < response.data.results.length; i++) {
        if (dat == "name") {
          if (response.data.results[i].name == Bus) {
            console.log(response.data.results[i].name);
            despliegue([response.data.results[i].url, i]);
            break;
          } else {
            b = 1;
          }
        } else if (dat == "ID") {
          if (i + 1 == Bus) {
            console.log("i" + i);
            despliegue([response.data.results[i].url, i]);
            break;
          }
        }
      }
      if (b === 1) {
        document.getElementById("Datos").innerHTML = "<h1>¿Quién es ese Pokemon?</h1>";
        document.getElementById("pantalla").setAttribute("src", "./assets/whos.png");
        document.getElementById("Datos").setAttribute("style", "color: white;");
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
  console.log(res[0]);
  config.url = res[0];
  if (res[0] != null) {
    let types = [];
    axios(config)
      .then((rasponse) => {
        current = res[1];
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

        current = res[1] + 1;
        console.log(current);
      })
      .catch((error) => {
        console.log("despliegue");
      });
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
  setTimeout(() => {
    if (current > 0) {
      buscar_personaje(current, "ID");
    }
    document.getElementById("Datos").setAttribute("style", "color: white;");
  }, 500);
  document.getElementById("az").play();
};

// Despues de "calyrex", ya no sigue la secuncia de ID la URL
// "lurantis-totem" y mas despues de este no tiene foto
//QUE SOLO ACEPTE ENTEROS
function buscarID() {
  // document.getElementById("Datos").innerHTML = `<p>CARGANDO...</p>`;
  let a = document.getElementById("in").value;
  console.log(a);
  if (a > 1126 || a < 1 || a % 1 != 0) {
    document.getElementById("Datos").innerHTML = "<h1>¿Quién es ese Pokemon?</h1>";
    document.getElementById("pantalla").setAttribute("src", "./assets/whos.png");
    document.getElementById("Datos").setAttribute("style", "color: white;");
  } else {
    let res = buscar_personaje(a, "ID");
    buscar_personaje(res, "ID");
  }
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
        // console.log(current);
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
  config.url = "https://pokeapi.co/api/v2/pokemon?limit=1126";
  axios(config)
    .then((response) => {
      if (current < response.data.results.length) {
        current += 1;
        // console.log(current);
        buscar_personaje(current, "ID");
      } else {
        buscar_personaje(current, "ID");
      }
      document.getElementById("Datos").setAttribute("style", "color: white;");
    })
    .catch((error) => console.log(error));
}

function anterior() {
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
