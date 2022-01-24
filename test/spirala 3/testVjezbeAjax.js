chai.should();
const assert = chai.assert;

const testoviSlanjaPodataka = () => {
  it("Tačni podaci", function (done) {
    let sadrzaj = { brojVjezbi: 4, brojZadataka: [1, 2, 3, 4] };
    let sadrzajJson = JSON.stringify(sadrzaj);

    VjezbeAjax.posaljiPodatke(sadrzaj, (err, data) => {
      assert.equal(data, sadrzajJson);
      done();
    });
  });

  it("Pogrešni podaci - nejednak broj vjezbi i zadataka", function (done) {
    let sadrzaj = { brojVjezbi: 4, brojZadataka: [1, 3, 4] };
    let sadrzajJson = JSON.stringify({
      status: "error",
      data: "Pogresan parametar brojZadataka",
    });

    VjezbeAjax.posaljiPodatke(sadrzaj, (err, data) => {
      assert.equal(data, sadrzajJson);
      sadrzaj.brojZadataka = [1, 3, 4, 5];
      sadrzajJson = JSON.stringify(sadrzaj);
      VjezbeAjax.posaljiPodatke(sadrzaj, (err, data) => {
        assert.equal(data, sadrzajJson);
        done();
      });
    });
  });

  it("Pogrešni podaci - negativan broj vjezbi", function (done) {
    let sadrzaj = { brojVjezbi: -4, brojZadataka: [1, 3, 4] };
    let sadrzajJson = JSON.stringify({
      status: "error",
      data: "Pogresan parametar brojVjezbi,brojZadataka",
    });

    VjezbeAjax.posaljiPodatke(sadrzaj, (err, data) => {
      assert.equal(data, sadrzajJson);

      sadrzaj.brojVjezbi = 3;
      sadrzajJson = JSON.stringify(sadrzaj);
      VjezbeAjax.posaljiPodatke(sadrzaj, (err, data) => {
        assert.equal(data, sadrzajJson);
        done();
      });
    });
  });

  it("Pogrešni podaci - prevelik broj vjezbi", function (done) {
    let sadrzaj = {
      brojVjezbi: 20,
      brojZadataka: [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      ],
    };
    let sadrzajJson = JSON.stringify({
      status: "error",
      data: "Pogresan parametar brojVjezbi",
    });

    VjezbeAjax.posaljiPodatke(sadrzaj, (err, data) => {
      assert.equal(data, sadrzajJson);

      sadrzaj.brojVjezbi = 3;
      sadrzaj.brojZadataka = [1, 2, 3];
      sadrzajJson = JSON.stringify(sadrzaj);
      VjezbeAjax.posaljiPodatke(sadrzaj, (err, data) => {
        assert.equal(data, sadrzajJson);
        done();
      });
    });
  });

  it("Pogrešni podaci - negativan broj zadataka", function (done) {
    let sadrzaj = {
      brojVjezbi: 15,
      brojZadataka: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, -4, 5],
    };
    let sadrzajJson = JSON.stringify({
      status: "error",
      data: "Pogresan parametar z13",
    });

    VjezbeAjax.posaljiPodatke(sadrzaj, (err, data) => {
      assert.equal(data, sadrzajJson);

      sadrzaj.brojZadataka[13] = 1;
      sadrzajJson = JSON.stringify(sadrzaj);
      VjezbeAjax.posaljiPodatke(sadrzaj, (err, data) => {
        assert.equal(data, sadrzajJson);
        done();
      });
    });
  });

  it("Pogrešni podaci - prevelik broj zadataka ", function (done) {
    let sadrzaj = {
      brojVjezbi: 9,
      brojZadataka: [1, 2, 3, 4, 12, 6, 7, 8, 9],
    };
    let sadrzajJson = JSON.stringify({
      status: "error",
      data: "Pogresan parametar z4",
    });

    VjezbeAjax.posaljiPodatke(sadrzaj, (err, data) => {
      assert.equal(data, sadrzajJson);

      sadrzaj.brojZadataka[4] = 1;
      sadrzajJson = JSON.stringify(sadrzaj);
      VjezbeAjax.posaljiPodatke(sadrzaj, (err, data) => {
        assert.equal(data, sadrzajJson);
        done();
      });
    });
  });

  it("Pogrešni podaci - više pogrešnih zadataka ", function (done) {
    let sadrzaj = {
      brojVjezbi: 11,
      brojZadataka: [1, 2, -3, 4, 12, 6, 44, 8, 9, 1, 12],
    };
    let sadrzajJson = JSON.stringify({
      status: "error",
      data: "Pogresan parametar z2,z4,z6,z10",
    });

    VjezbeAjax.posaljiPodatke(sadrzaj, (err, data) => {
      assert.equal(data, sadrzajJson);

      sadrzaj.brojZadataka = [1, 2, 3, 4, 1, 6, 4, 8, 9, 1, 1];
      sadrzajJson = JSON.stringify(sadrzaj);
      VjezbeAjax.posaljiPodatke(sadrzaj, (err, data) => {
        assert.equal(data, sadrzajJson);
        done();
      });
    });
  });

  it("Pogrešni podaci - greška i u zadatku i u broju vjezbi ", function (done) {
    let sadrzaj = {
      brojVjezbi: -12,
      brojZadataka: [1, 2, -3, 4, 12, 6, 44, 8, 9, 1, 12],
    };
    let sadrzajJson = JSON.stringify({
      status: "error",
      data: "Pogresan parametar brojVjezbi,z2,z4,z6,z10,brojZadataka",
    });

    VjezbeAjax.posaljiPodatke(sadrzaj, (err, data) => {
      assert.equal(data, sadrzajJson);

      sadrzaj.brojVjezbi = 11;
      sadrzaj.brojZadataka = [1, 2, 3, 4, 1, 6, 4, 8, 9, 1, 1];
      sadrzajJson = JSON.stringify(sadrzaj);
      VjezbeAjax.posaljiPodatke(sadrzaj, (err, data) => {
        assert.equal(data, sadrzajJson);
        done();
      });
    });
  });

  it("Pogrešni podaci - sve pogrešno ", function (done) {
    let sadrzaj = {
      brojVjezbi: -55,
      brojZadataka: [-1, 22, -3, -4, 12, 56, -44, -8, 19, -1, 12],
    };
    let sadrzajJson = JSON.stringify({
      status: "error",
      data: "Pogresan parametar brojVjezbi,z0,z1,z2,z3,z4,z5,z6,z7,z8,z9,z10,brojZadataka",
    });

    VjezbeAjax.posaljiPodatke(sadrzaj, (err, data) => {
      assert.equal(data, sadrzajJson);

      sadrzaj.brojVjezbi = 3;
      sadrzaj.brojZadataka = [1, 2, 3];
      sadrzajJson = JSON.stringify(sadrzaj);
      VjezbeAjax.posaljiPodatke(sadrzaj, (err, data) => {
        assert.equal(data, sadrzajJson);
        done();
      });
    });
  });
};

const testoviDohvatanjaPodataka = () => {
  it("Test dohvatanja - stress test", function (done) {
    let sadrzaj = { brojVjezbi: 4, brojZadataka: [1, 2, 3, 4] };
    let sadrzajJson = JSON.stringify(sadrzaj);
    VjezbeAjax.posaljiPodatke(sadrzaj, (err, data) => {
      VjezbeAjax.dohvatiPodatke((err, data) => {
        assert.equal(data, sadrzajJson);
        VjezbeAjax.dohvatiPodatke((err, data) => {
          assert.equal(data, sadrzajJson);
          VjezbeAjax.dohvatiPodatke((err, data) => {
            assert.equal(data, sadrzajJson);
            VjezbeAjax.dohvatiPodatke((err, data) => {
              assert.equal(data, sadrzajJson);
              VjezbeAjax.dohvatiPodatke((err, data) => {
                assert.equal(data, sadrzajJson);
                done();
              });
            });
          });
        });
      });
    });
  });
};

const testoviDodavanjeInputPolja = () => {
  it("Dodaj Input Polja - 8", function () {
    let testDiv = document.createElement("div");
    VjezbeAjax.dodajInputPolja(testDiv, 8);
    let inputs = testDiv.getElementsByTagName("INPUT");
    assert.equal(inputs.length, 8);
    Array.from(inputs).forEach((x) => assert.equal(x.value, 4));
  });

  it("Pozitivan broj unosa - max 15", function () {
    let testDiv = document.createElement("div");
    VjezbeAjax.dodajInputPolja(testDiv, 16);
    let inputs = testDiv.getElementsByTagName("INPUT");
    assert.equal(inputs.length, 15);
    Array.from(inputs).forEach((x) => assert.equal(x.value, 4));
  });

  it("Negativan broj unosa - min 1", function () {
    let testDiv = document.createElement("div");
    VjezbeAjax.dodajInputPolja(testDiv, 0);
    let inputs = testDiv.getElementsByTagName("INPUT");
    assert.equal(inputs.length, 1);
    Array.from(inputs).forEach((x) => assert.equal(x.value, 4));
  });
};

const testoviCrtanjaVjezbi = () => {
  it("Tačni podaci", function () {
    let testDiv = document.createElement("div");
    let testniObjekat = { brojVjezbi: 5, brojZadataka: [1, 2, 3, 4, 5] };
    VjezbeAjax.iscrtajVjezbe(testDiv, testniObjekat);
    let elems = testDiv.getElementsByClassName("content");
    assert.equal(elems.length, testniObjekat.brojVjezbi);
    let i = 0;
    Array.from(elems).forEach((x) => {
      assert.equal(
        x.onclick.toString(),
        `function onclick(event) {\niscrtajZadatke(document.getElementById(\'zadaci${i}\'), ${
          i + 1
        })\n}`
      );
      iscrtajZadatke(x.lastChild, i + 1);
      assert.equal(x.lastChild.children.length, i + 1);
      ++i;
    });
  });

  it("Pogrešni podaci - negativne vjezbe", function () {
    let testDiv = document.createElement("div");
    let testniObjekat = { brojVjezbi: 5, brojZadataka: [1, 2, -3, 4, 5] };
    VjezbeAjax.iscrtajVjezbe(testDiv, testniObjekat);
    let elems = testDiv.getElementsByClassName("content");
    assert.equal(elems.length, testniObjekat.brojVjezbi);
    let i = 0;
    Array.from(elems).forEach((x) => {
      iscrtajZadatke(x.lastChild, testniObjekat.brojZadataka[i]);
      let { children } = x.lastChild;
      if (i == 2) {
        assert.equal(children.length, 1);
        assert.equal(children[0].innerHTML, "Greška pri dohvatanju zadataka");
      } else {
        assert.equal(children.length, testniObjekat.brojZadataka[i]);
        let j = 0;
        Array.from(children).forEach((x) => {
          assert.equal(x.innerHTML, `Zadatak${j}`);
          ++j;
        });
      }
      ++i;
    });
  });

  it("Pogrešni podaci - prevelik broj vjezbi", function () {
    let testDiv = document.createElement("div");
    let testniObjekat = { brojVjezbi: 5, brojZadataka: [1, 22, 3, 17, 5] };
    VjezbeAjax.iscrtajVjezbe(testDiv, testniObjekat);
    let elems = testDiv.getElementsByClassName("content");
    assert.equal(elems.length, testniObjekat.brojVjezbi);
    let i = 0;
    Array.from(elems).forEach((x) => {
      iscrtajZadatke(x.lastChild, testniObjekat.brojZadataka[i]);
      let { children } = x.lastChild;
      if (i == 1 || i == 3) {
        assert.equal(children.length, 1);
        assert.equal(children[0].innerHTML, "Greška pri dohvatanju zadataka");
      } else {
        assert.equal(children.length, testniObjekat.brojZadataka[i]);
        let j = 0;
        Array.from(children).forEach((x) => {
          assert.equal(x.innerHTML, `Zadatak${j}`);
          ++j;
        });
      }
      ++i;
    });
  });

  it("Pogrešni podaci - nullovi", function () {
    let testDiv = document.createElement("div");
    let testniObjekat = {
      brojVjezbi: 5,
      brojZadataka: [null, 2, null, 7, null],
    };
    VjezbeAjax.iscrtajVjezbe(testDiv, testniObjekat);
    let elems = testDiv.getElementsByClassName("content");
    assert.equal(elems.length, testniObjekat.brojVjezbi);
    let i = 0;
    Array.from(elems).forEach((x) => {
      iscrtajZadatke(x.lastChild, testniObjekat.brojZadataka[i]);
      let { children } = x.lastChild;
      if (i % 2 == 0) {
        assert.equal(children.length, 1);
        assert.equal(children[0].innerHTML, "Greška pri dohvatanju zadataka");
      } else {
        assert.equal(children.length, testniObjekat.brojZadataka[i]);
        let j = 0;
        Array.from(children).forEach((x) => {
          assert.equal(x.innerHTML, `Zadatak${j}`);
          ++j;
        });
      }
      ++i;
    });
  });

  it("Pogrešni podaci - nista nije tacno", function () {
    let testDiv = document.createElement("div");
    let testniObjekat = {
      brojVjezbi: 7,
      brojZadataka: [null, -2, null, 27, null, 55, -1],
    };
    VjezbeAjax.iscrtajVjezbe(testDiv, testniObjekat);
    let elems = testDiv.getElementsByClassName("content");
    assert.equal(elems.length, testniObjekat.brojVjezbi);
    let i = 0;
    Array.from(elems).forEach((x) => {
      iscrtajZadatke(x.lastChild, testniObjekat.brojZadataka[i]);
      let { children } = x.lastChild;
      assert.equal(children.length, 1);
      assert.equal(children[0].innerHTML, "Greška pri dohvatanju zadataka");
      ++i;
    });
  });
};

describe("Spirala 3", function () {
  describe("Testovi slanja podataka", testoviSlanjaPodataka);
  describe("Testovi dohvatanja podataka", testoviDohvatanjaPodataka);
  describe("Testovi dodavanja input polja", testoviDodavanjeInputPolja);
  describe("Testovi crtanja vjezbi", testoviCrtanjaVjezbi);
});
