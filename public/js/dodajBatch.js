window.onload = () => {
  const dugme = document.getElementById("posalji");
  dugme.onclick = () => {
    const text = document.getElementById("unos");
    let obj = { csv: text.value };
    StudentAjax.dodajBatch(obj, (err, data) => {
      if (err) throw err;
      data = JSON.parse(data);
      document.getElementById(
        "ajaxstatus"
      ).innerHTML = `Status: ${data.status}`;
    });
  };
};
