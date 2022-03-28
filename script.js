// const axios = require("axios"); No se necesita

let config = {
  method: "get",
  url: "https://pokeapi.co/api/v2/pokemon?limit=1126",
  headers: {},
};

let current = 0;
let son = 0;
let de = 0;
let ce = false;

async function buscar_personaje(Bus, dat, son = 0) {
  speechSynthesis.cancel();
  config.url = "https://pokeapi.co/api/v2/pokemon?limit=1126";
  axios(config)
    .then((response) => {
      for (let i = 0; i < response.data.results.length; i++) {
        if (dat == "name") {
          if (response.data.results[i].name == Bus) {
            console.log(response.data.results[i].name);
            despliegue([response.data.results[i].url, i], son);
            break;
          }
        } else if (dat == "ID") {
          if (i + 1 == Bus) {
            console.log("i" + i);
            despliegue([response.data.results[i].url, i], son);
            break;
          }
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function buscarNom() {
  speechSynthesis.cancel();
  config.url = "https://pokeapi.co/api/v2/pokemon?limit=1126";
  let arr = [];
  let palabra = document.getElementById("in").value.toLowerCase();
  axios(config)
    .then((response) => {
      for (let i = 0; i < response.data.results.length; i++) {
        arr.push(response.data.results[i].name);
      }
      if (arr.includes(palabra)) {
        de = 1;
        son = 1;
        buscar_personaje(palabra, "name", son);
      } else {
        de = 0;
        document.getElementById("WTP").play();
        document.getElementById("Datos").innerHTML = "<h1>Who's that Pokemon?</h1>";
        document.getElementById("pantalla").setAttribute("src", "./assets/whos.png");
        document.getElementById("Datos").setAttribute("style", "color: white;");
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function despliegue(res, son = 0) {
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
        let mo = "";
        if (rasponse.data.moves.length > 0) {
          mo = `
          <li id = "dat">Moves: </li>
              <br>
              <ul>
                <li id = "dat" >${rasponse.data.moves[0].move.name}</li> 
                <li id = "dat" >${rasponse.data.moves[1].move.name}</li>
              </ul>
          `;
        } else {
          mo = `
          <li id = "dat">Stats: </li>
          <br>
          <ul>
            <li id = "dat" >${rasponse.data.stats[1].stat.name}: ${rasponse.data.stats[1].base_stat}</li> 
            <li id = "dat" >${rasponse.data.stats[2].stat.name}: ${rasponse.data.stats[2].base_stat}</li>
          </ul>
          `;
        }

        document.getElementById("Datos").innerHTML = `
          <ul>  
            <li id = "dat">Name: ${name}</li>
            <li id = "dat">Type: ${types}</li>
            ${mo}
          </ul>
          `;
        document.getElementById("pantalla").setAttribute("src", rasponse.data.sprites.front_default);
        current = res[1] + 1;
        console.log(current);
        Pokeditails(rasponse.data.species.url, name, types[0], son);
      })
      .catch((error) => {
        console.log("despliegue " + res);
      });
  }
}

// Toda su infomracion se desplegara en ingles
const Pokeditails = (url, name, types, son) => {
  if (son == 1) {
    config.url = url;
    axios(config.url)
      .then((res) => {
        let detalles = res.data.flavor_text_entries.filter((detail) => detail.language.name === "en");
        let detail1 = detalles[0].flavor_text.replace(/\n/g, " ").replace(/\f/g, " ");
        let detail2 = " ";
        let detail3 = " ";
        if (3 < detalles.length) {
          detail2 = detalles[2].flavor_text.replace(/\n/g, " ").replace(/\f/g, " ");
          if (5 < detalles.length) {
            detail3 = detalles[5].flavor_text.replace(/\n/g, " ").replace(/\f/g, " ");
          }
        }

        let a = new SpeechSynthesisUtterance();
        a.lang = "en-US";
        a.text = `${name}. Pokemon type ${types}. ${detail1}, ${detail2}, ${detail3}`;
        speechSynthesis.speak(a);
      })
      .catch((error) => {
        console.log("Pokeditails");
      });
  }
};

const naranja = () => {
  document.getElementById("Datos").setAttribute("style", "color: black;");
  siguientee();
  Clean();
  de = 1;
};

const verde = () => {
  document.getElementById("Datos").setAttribute("style", "color: black;");
  anteriorr();
  Clean();
  de = 1;
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

const Details = () => {
  if (de === 1) buscar_personaje(current, "ID", 1);
};

// Despues de "calyrex", ya no sigue la secuncia de ID la URL
// "lurantis-totem" y mas despues de este no tiene foto
// QUE SOLO ACEPTE ENTEROS
function buscarID() {
  // document.getElementById("Datos").innerHTML = `<p>CARGANDO...</p>`;
  speechSynthesis.cancel();
  let a = document.getElementById("in").value;
  console.log(a);
  if (a > 1126 || a < 1 || a % 1 != 0) {
    de = 0;
    document.getElementById("WTP").play();
    document.getElementById("Datos").innerHTML = "<h1>Who's that Pokemon?</h1>";
    document.getElementById("pantalla").setAttribute("src", "./assets/whos.png");
    document.getElementById("Datos").setAttribute("style", "color: white;");
  } else {
    de = 1;
    son = 1;
    buscar_personaje(a, "ID", son);
  }
}

function Clean() {
  document.getElementById("Datos").innerHTML = ` `;
  document.getElementById("in").value = "";
}

function Inicio() {
  speechSynthesis.cancel();
  document.getElementById("Datos").innerHTML = ` `;
  current = 0;
  document.getElementById("in").value = "";
  document.getElementById("pantalla").setAttribute("src", "./assets/Nin.png");
  document.getElementById("ini").play();
  de = 0;
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
  de = 1;
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
  de = 1;
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

const ayuda = () => {
  Clean();
  de = 0;
  current = 0;
  speechSynthesis.cancel();
  ce = !ce;
  if (ce) {
    //BLOQUEO LOS OTROS BOTONES
    document.getElementById("reset").setAttribute("onclick", "");
    document.getElementById("B1").setAttribute("onclick", "");
    document.getElementById("BP1").setAttribute("onclick", "");
    document.getElementById("BP2").setAttribute("onclick", "");
    document.getElementById("BL").setAttribute("onclick", "");
    document.getElementById("up").setAttribute("onclick", "");
    document.getElementById("right").setAttribute("onclick", "");
    document.getElementById("down").setAttribute("onclick", "");
    document.getElementById("left").setAttribute("onclick", "");
    document.getElementById("BOT1").setAttribute("onclick", "");
    document.getElementById("BOT2").setAttribute("onclick", "");
    document.getElementById("clean").setAttribute("onclick", "");
    document.getElementById("ot1").setAttribute("onclick", "");
    //MUESTRO LA INFORMACION EN LAS PANTALLAS
    document.getElementById("pan").innerHTML = `
    <section class="simbologia1" id="simbologia1">
          <div class="reset" id="reset"></div>
          <p class="bot-res">Reset Button</p>
          <div class="B1" id="B1" ></div>
          <p class="bot-sele">Display Pokemons information</p>
          <div class="BP1" id="BP1" ></div>
          <p class="bot-pre-ni">Previous Pokemon without information</p>
          <div class="BP2" id="BP2" ></div>
          <p class="bot-next-ni">Next Pokemon without information</p>
          <div class="BL" id="BL" ></div>
          <p class="bg-mu">Backgound music</p>
          <div class="fle" id="fle">
            <div class="up" id="up" ></div>
            <div class="right" id="right" ></div>
            <div class="down" id="down" ></div>
            <div class="left" id="left" ></div>
            <div class="cen" id="cen"></div>
          </div>
          <p class="fle-des">Move through Pokemon</p>
    </section>
    `;
    document.getElementById("Datos").innerHTML = `
    <section class="simbologia2" id="simbologia2">
      <div class="BOT1" id="BOT1" ><h1>Name</h1></div>
      <p class="se-na">Serch by name</p>
      <div class="BOT2" id="BOT2" ><h1>ID</h1></div>
      <p class="se-id">Serch by id</p>
      <div class="clean" id="clean" ></div>
      <p class="cle">Clean the inputbar and Display information</p>
      <div class="ot1" id="ot1" ><h1>Details</h1></div>
      <p class="Det">Play the Pokemon details</p>
    </section>
    `;
    document.getElementById("simbologia1").setAttribute(
      "style",
      `
      display:grid;
      grid-template-columns: 2fr 5fr;
      grid-template-rows:repeat(6,1fr);
      justify-content: center;
      align-items: center;
      align-content: center;
      justify-items: center;
      background-color: white;
      font-family: Fredoka;
      border-radius:10px;
    `
    );
    document.getElementById("simbologia2").setAttribute(
      "style",
      `
      height: 100%;
      display:grid;
      grid-template-columns: 2fr 5fr;
      grid-template-rows:repeat(4,1fr);
      justify-content: center;
      align-items: center;
      align-content: center;
      justify-items: center;
      background-color: black;
      color: white;
      font-family: Fredoka;
      border-radius:20px;
    `
    );
    document.getElementById("style").innerHTML = ` 
      /*SIMBOLOGÍA DE PANTALLA "SCREEN"*/
      .simbologia1 .reset {
        margin-top: 0px;
        width: 18px;
      }
      .simbologia1 .B1 {
        width: 25px;
        height: 25px;
        position: relative;
        top: 0%;
        left: 0%;
      }
      .simbologia1 .BL {
        grid-row: 5;
        grid-column: 1;
        width: 90%;
      }
      .simbologia1 .fle {
        height: 100%;
        width: 70%;
        grid-column: 1;
        grid-row: 6;
      }
      .simbologia1 p {
        height: auto;
        width: 100%;
      }

      /*SIMBOLOGIA DE PANTALLA "DATOS"*/

      .simbologia2 .BOT1 {
        grid-column: 1;
        grid-row: 1;
        height: 50%;
        width: 70%;
        top: 0%;
        left: 0px;
      }
      .simbologia2 .BOT2 {
        grid-column: 1;
        grid-row: 2;
        height: 50%;
        width: 50%;
        top: 0%;
        left: 0px;
      }
      .simbologia2 .clean {
        grid-column: 1;
        grid-row: 3;
        top: 0%;
        left: 0%;
        height: 60%;
      }
      .simbologia2 .ot1 {
        width: 90%;
      }
      .simbologia2 .ot1 h1 {
        /* width: 90%; */
        font-size: 20px;
      }
      .simbologia2 p {
        width: 100%;
      }

    `;
  } else {
    document.getElementById("pan").innerHTML = `
    <img id="pantalla" src="./assets/Nin.png" alt="Logo Nintendo" />
    `;
    document.getElementById("Datos").innerHTML = ``;
    //AGREGO LOS ONCLICK
    document.getElementById("reset").setAttribute("onclick", "Inicio()");
    document.getElementById("B1").setAttribute("onclick", "azul()");
    document.getElementById("BP1").setAttribute("onclick", "verde()");
    document.getElementById("BP2").setAttribute("onclick", "naranja()");
    document.getElementById("BL").setAttribute("onclick", "playy()");
    document.getElementById("up").setAttribute("onclick", "siguiente()");
    document.getElementById("right").setAttribute("onclick", "siguiente()");
    document.getElementById("down").setAttribute("onclick", "anterior()");
    document.getElementById("left").setAttribute("onclick", "anterior()");
    document.getElementById("BOT1").setAttribute("onclick", "buscarNom()");
    document.getElementById("BOT2").setAttribute("onclick", "buscarID()");
    document.getElementById("clean").setAttribute("onclick", "Clean()");
    document.getElementById("ot1").setAttribute("onclick", "Details()");
  }
};
