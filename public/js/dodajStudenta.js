window.onload = () => {
  const dugme = document.getElementById("posalji");
  dugme.onclick = () => {
    const unosi = document.getElementsByTagName("INPUT");
    let obj = {
      ime: unosi[0].value,
      prezime: unosi[1].value,
      index: unosi[2].value,
      grupa: unosi[3].value,
    };
    StudentAjax.dodajStudenta(obj, (err, data) => {
      if (err) throw err;
      data = JSON.parse(data);
      document.getElementById(
        "ajaxstatus"
      ).innerHTML = `Status: ${data.status}`;
    });
  };
};
