const json_file = JSON.parse(poke_file);
let current = 0;
console.log(json_file.results);

function buscar_personaje(Bus, dat) {
  let ac = false;
  let datt = false;
  for (let i = 0; i < json_file.results.length; i++) {
    if (dat == "name") {
      datt = json_file.results[i].name;
    } else if (dat == "ID") {
      datt = json_file.results[i].id;
    } else {
      datt = json_file.results[i].slug;
    }
    if (datt == Bus) {
      ac = true;
      return [ac, json_file.results[i], i];
    }
  }
  return [ac, json_file.results[0], 0];
}

function buscarNom() {
  let palabra = document.getElementById("in").value.toLowerCase().split("");
  palabra[0] = palabra[0].toUpperCase();
  palabra = palabra.join("");
  let res = buscar_personaje(palabra, "name");
  despliegue(res);
}

function despliegue(res) {
  if (res[0]) {
    document.getElementById("Datos").innerHTML = `
        <li>Name: ${res[1].name}</li>
        <li>ID: ${res[1].id}</li>
        <li>Type: ${res[1].type}</li>
        <li>Abilities: ${res[1].abilities}</li>
        <li>Weakness: ${res[1].weakness}</li>
         `;
    document.getElementById("pantalla").setAttribute("src", res[1].ThumbnailImage);
    current = res[2];
    console.log(current);
  } else {
    document.getElementById("Datos").innerHTML = "<h1>¿Quién es ese Pokemon?</h1>";
    document.getElementById("pantalla").setAttribute("src", "./assets/whos.png");
  }
}

const naranja = () => {
  siguiente();
  document.getElementById("Datos").innerHTML = "<h1></h1>";
};

const verde = () => {
  anterior();
  document.getElementById("Datos").innerHTML = "<h1></h1>";
};

const azul = () => {
  if (current > 0) {
    despliegue([true, json_file.results[current - 1], current]);
  }
};

function buscarID() {
  let res = buscar_personaje(document.getElementById("in").value, "ID");
  despliegue(res);
}

function buscarSlug() {
  let res = buscar_personaje(document.getElementById("in").value, "Slug");
  despliegue(res);
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
}

function siguiente() {
  if (current < json_file.results.length) {
    current = current + 1;
    despliegue([true, json_file.results[current - 1], current]);
  } else {
    current = json_file.results.length;
  }
}

function anterior() {
  if (current <= json_file.results.length && current > 0) {
    current = current - 1;
    if (current > 0) {
      despliegue([true, json_file.results[current - 1], current]);
    } else {
      Inicio();
    }
  } else {
    if (current == 0) {
      Inicio();
    }
  }
}
