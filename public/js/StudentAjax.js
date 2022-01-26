const StudentAjax = (() => {
    
  const radiAjax = (podaci, fnCallback) => {
    let ajax = new XMLHttpRequest();

    const { ruta, metoda, stringify, objekat } = podaci;

    ajax.onreadystatechange = (err, data) => {
      if (ajax.readyState == 4 && ajax.status == 200)
        fnCallback(undefined, ajax.responseText);
      else if (ajax.status == 400) fnCallback(err, undefined);
    };

    ajax.open(metoda, `http://localhost:3000${ruta}`, true);
    ajax.setRequestHeader("Content-type", "application/json");

    let salji = objekat;
    if (stringify) salji = JSON.stringify(salji);
    ajax.send(salji);
  };

  const dodajStudenta = (student, fnCallback) => {
    /*
    let ajax = new XMLHttpRequest();

    ajax.onreadystatechange = (err, data) => {
      if (ajax.readyState == 4 && ajax.status == 200)
        fnCallback(ajax.responseText);
    };

    ajax.open("POST", "http://localhost:3000/student", true);
    ajax.setRequestHeader("Content-type", "application/json");
    let jsonStr = JSON.stringify(student);
    ajax.send(jsonStr);
    */
    radiAjax(
      {
        ruta: `/student`,
        metoda: `POST`,
        stringify: true,
        objekat: student,
      },
      fnCallback
    );
  };

  const postaviGrupu = (index, grupa, fnCallback) => {
    /*
    let ajax = new XMLHttpRequest();

    ajax.onreadystatechange = (err, data) => {
      if (ajax.readyState == 4 && ajax.status == 200)
        fnCallback(ajax.responseText);
    };

    ajax.open("PUT", `http://localhost:3000/student/${index}`, true);
    ajax.setRequestHeader("Content-type", "application/json");
    let jsonStr = JSON.stringify(grupa);
    ajax.send(jsonStr);
    */
    radiAjax(
      {
        ruta: `/student/${index}`,
        metoda: `PUT`,
        stringify: true,
        objekat: grupa,
      },
      fnCallback
    );
  };

  const dodajBatch = (csvStudenti, fnCallback) => {
    /*
    let ajax = new XMLHttpRequest();

    ajax.onreadystatechange = (err, data) => {
      if (ajax.readyState == 4 && ajax.status == 200)
        fnCallback(ajax.responseText);
    };

    ajax.open("POST", "http://localhost:3000/batch/student", true);
    ajax.setRequestHeader("Content-type", "application/json");
    ajax.send(csvStudenti);
    */
    radiAjax(
      {
        ruta: `/batch/student`,
        metoda: `POST`,
        stringify: false,
        objekat: csvStudenti,
      },
      fnCallback
    );
  };

  return { dodajStudenta, postaviGrupu, dodajBatch };
})();

module.exports = StudentAjax;
