window.onload = () => {
  const dugme = document.getElementById("posalji");
  dugme.onclick = () => {
    const unosi = document.getElementsByTagName("INPUT");
    let obj = {
      index: unosi[0].value,
      grupa: unosi[1].value,
    };
    StudentAjax.postaviGrupu(obj.index, obj.grupa, (err, data) => {
      if (err) throw err;
      data = JSON.parse(data);
      document.getElementById(
        "ajaxstatus"
      ).innerHTML = `Status: ${data.status}`;
    });
  };
};
