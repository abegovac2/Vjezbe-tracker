function dodajInputPolja(divElement, brojVjezbi) {
  let input = `<input type="number" id="z${1}" name="z${1}" />`;
  let label = `<label for="z${1}">${"nakav content"}</label>`;
  brojVjezbi.innerHtml = "";
  for (let i = 0; i < brojVjezbi; ++i)
    brojVjezbi.innerHtml +=
      `<label for="z${i}">${`z${i}`}</label>\n` +
      `<input type="number" id="z${i}" name="z${i}" />\n`;
}

function posaljiPodatke(vjezbeObjekat, callbackFja) {
  let ajax = new XMLHttpRequest();

  ajax.onreadystatechange = callbackFja;
  ajax.open("POST", "http://localhost:3000/vjezbe", true);
  ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  ajax.send(vjezbeObjekat);
}
