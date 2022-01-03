/* 1. zadatak */

function dodajInputPolja(DOMelementDIVauFormi, brojVjezbi) {
  DOMelementDIVauFormi.innerHTML = "";
  let num_of_elements = brojVjezbi > 15 ? 15 : brojVjezbi < 0 ? 0 : brojVjezbi;
  for (let i = 0; i < num_of_elements; ++i) {
    DOMelementDIVauFormi.innerHTML +=
      `<label for="z${i}">${`z${i}`}</label>\n` +
      `<input type="number" id="z${i}" name="z${i}" /><br>\n`;
  }
}

function posaljiPodatke(vjezbeObjekat, callBackFja) {
  let ajax = new XMLHttpRequest();

  ajax.onreadystatechange = (err, data) => {
    if (ajax.readyState == 4 && ajax.status == 200)
      callBackFja(undefined, ajax.responseText);
  };
  ajax.open("POST", "http://localhost:3000/vjezbe", true);
  ajax.setRequestHeader("Content-type", "application/json");
  let jsonStr = JSON.stringify(vjezbeObjekat);
  ajax.send(jsonStr);
}

/* 2. zadatak */

function dohvatiPodatke(callBackFja) {
  let ajax = new XMLHttpRequest();
  ajax.onreadystatechange = (err, data) => {
    if (ajax.readyState == 4 && ajax.status == 200)
      callBackFja(undefined, ajax.responseText);
  };
  ajax.open("GET", "http://localhost:3000/vjezbe", true);
  ajax.send();
}

function iscrtajVjezbe(divDOMelement, objekat) {
  divDOMelement.innerHTML = "";
  for (let i = 0; i < objekat.brojVjezbi; ++i) {
    let input = `<div>
    <input id="${`v${i}`}" onclick="iscrtajZadatke(document.getElementById('zadaci${i}'), ${
      objekat.brojZadataka[i]
    })" groupname="izbori" type="checkbox" class="otvaranje">
    <label for="${`v${i}`}">
        ${`Vjezba${i + 1}`}
    </label>
    <div class="zadaci" id="zadaci${i}"></div>`;
    divDOMelement.innerHTML += input;
  }
}

function iscrtajZadatke(vjezbaDOMelement, brojZadataka) {
  let { children } = vjezbaDOMelement;
  if (children.length == 0) {
    for (let j = 0; j < brojZadataka; j++)
      vjezbaDOMelement.innerHTML += `<div>${`Zadatak${j}`}</div>`;
  }
}
