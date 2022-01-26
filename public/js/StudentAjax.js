const StudentAjax = (() => {
  const radiAjax = (podaci, fnCallback) => {
    let ajax = new XMLHttpRequest();

    const { ruta, metoda, objekat } = podaci;

    ajax.onreadystatechange = (err, data) => {
      if (ajax.readyState == 4 && ajax.status == 200)
        fnCallback(undefined, ajax.responseText);
      else if (ajax.status == 400) fnCallback(err, undefined);
    };

    ajax.open(metoda, `http://localhost:3000${ruta}`, true);
    ajax.setRequestHeader("Content-type", "application/json");

    let salji = JSON.stringify(objekat);
    ajax.send(salji);
  };

  const dodajStudenta = (student, fnCallback) => {
    radiAjax(
      {
        ruta: `/student`,
        metoda: `POST`,
        objekat: student,
      },
      fnCallback
    );
  };

  const postaviGrupu = (index, grupa, fnCallback) => {
    radiAjax(
      {
        ruta: `/student/${index}`,
        metoda: `PUT`,
        objekat: { grupa: grupa },
      },
      fnCallback
    );
  };

  const dodajBatch = (csvStudenti, fnCallback) => {
    radiAjax(
      {
        ruta: `/batch/student`,
        metoda: `POST`,
        objekat: csvStudenti,
      },
      fnCallback
    );
  };

  return { dodajStudenta, postaviGrupu, dodajBatch };
})();
