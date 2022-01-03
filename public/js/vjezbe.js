window.onload = () => {
  let odabirVjezbe = document.getElementById("odabirVjezbe");
  dohvatiPodatke((err, value) => {
    let content = "";
    try {
      value = JSON.parse(value);
      const { brojVjezbi, brojZadataka, status, data } = value;
      if (status == "error")
        content = `<h1>Greška u slanju zahtjeva</h1>\n<h3>${data}</h3>`;
    } catch (e) {
      content = `<h1> Greška u slanju zahtjeva</h1>`;
    }
    if (content.length == 0) iscrtajVjezbe(odabirVjezbe, value);
    else odabirVjezbe.innerHTML = content;
  });
};
