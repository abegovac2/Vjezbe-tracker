//import { posaljiPodatke, dodajInputPolja } from "./VjezbeAjax.js";
var brojVjezbi, brojZadataka, saljiBtn;

function ajaxOnCallback(err, value) {
  let result = document.getElementById("result");
  let content = "";
  try {
    value = JSON.parse(value);
    const { brojVjezbi, brojZadataka, status, data } = value;
    if (status == "error")
      content = `<h1>Greška u slanju zahtjeva</h1>\n<h3>${data}</h3>`;
    else {
      content = `<h1>Trenutno je zapisano ${brojVjezbi} vjezbi</h1>\n<h3>A po vjezbi imaju po:</h3>\n<ul>`;
      for (let i = 0; i < brojVjezbi; ++i)
        content += `<li>z${i} = ${brojZadataka[i]}</li>`;
      content += "</ul>";
    }
  } catch (e) {
    content = `<h1> Greška u slanju zahtjeva</h1>`;
  }

  result.innerHTML = content;
}

window.onload = () => {
  brojVjezbi = document.getElementById("brojVjezbi");
  brojZadataka = document.getElementById("brojZadataka");
  saljiBtn = document.getElementById("salji");
  dodajInputPolja(brojZadataka, 4);
  brojVjezbi.addEventListener("input", () =>
    dodajInputPolja(brojZadataka, brojVjezbi.value)
  );
  saljiBtn.addEventListener("click", () => {
    let obj = {};
    obj["brojVjezbi"] = brojVjezbi.value.length == 0 ? 0 : parseInt(brojVjezbi.value) ;
    let children = brojZadataka.children;
    obj["brojZadataka"] = [];
    for (let i = 1; i < children.length; i++)
      children[i].nodeName == "INPUT" &&
        obj.brojZadataka.push(children[i].value);
    obj.brojZadataka = obj.brojZadataka.map(x => x.length == 0 ? 0 : parseInt(x))
    posaljiPodatke(obj, ajaxOnCallback);
  });
};
