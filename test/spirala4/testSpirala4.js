let chai = require("chai");
let chaiHttp = require("chai-http");

const server = require("../../index");

chai.use(chaiHttp);
const assert = chai.assert;

const Grupa = require("../../models/grupa");
const Student = require("../../models/student");

function resetTables(done) {
  Grupa.destroy({
    truncate: true,
  });
  Student.destroy({
    truncate: true,
  });
  done();
}

/*
"scripts": {
        "test": "mocha ./test/spirala4/testSpirala4 || true",
        "start": "node index.js",
        "dev": "nodemon ./index.js"
    },
*/

const testoviDodavanjaStudenta = () => {
  before(resetTables);

  it("Dodaj jednog studenta", function (done) {
    chai
      .request(server)
      .post("/student")
      .set("content-type", "application/json")
      .send({
        ime: "Amar",
        prezime: "Begovac",
        index: "18752",
        grupa: "Grupa2",
      })
      .end((err, res) => {
        assert.isNull(err);
        assert.equal(res.status, 200);
        assert.equal(res.text, '{"status":"Kreiran student!"}');
        done();
      });
  });

  it("Dodaj istog studenta", function (done) {
    chai
      .request(server)
      .post("/student")
      .set("content-type", "application/json")
      .send({
        ime: "Amar",
        prezime: "Begovac",
        index: "18752",
        grupa: "Grupa2",
      })
      .end((err, res) => {
        assert.isNull(err);
        assert.equal(res.status, 200);
        assert.equal(
          res.text,
          '{"status":"Student sa indexom 18752 već postoji!"}'
        );
        done();
      });
  });

  it("Test uslova za jednačenje studenata samo po indexu", function (done) {
    chai
      .request(server)
      .post("/student")
      .set("content-type", "application/json")
      .send({
        ime: "Rama",
        prezime: "Cavogeb",
        index: "18752",
        grupa: "2apurg",
      })
      .end((err, res) => {
        assert.isNull(err);
        assert.equal(res.status, 200);
        assert.equal(
          res.text,
          '{"status":"Student sa indexom 18752 već postoji!"}'
        );
        done();
      });
  });
};

const testoviDodavanjaGrupe = () => {
  after(resetTables);

  it("Promjeni grupu", function (done) {
    chai
      .request(server)
      .put("/student/18752")
      .set("content-type", "application/json")
      .send({
        grupa: "Grupa1",
      })
      .end((err, res) => {
        assert.isNull(err);
        assert.equal(res.status, 200);
        assert.equal(res.text, '{"status":"Promjenjena grupa studentu 18752"}');
        done();
      });
  });

  it("Promjeni grupu nepostojećem studentu", function (done) {
    chai
      .request(server)
      .put("/student/225883")
      .set("content-type", "application/json")
      .send({
        grupa: "Grupa1",
      })
      .end((err, res) => {
        assert.isNull(err);
        assert.equal(res.status, 200);
        assert.equal(
          res.text,
          '{"status":"Student sa indexom 225883 ne postoji"}'
        );
        done();
      });
  });
};

const testoviDodavanjaViseStudenta = () => {
  after(resetTables);

  it("Dodaj studenata", function (done) {
    chai
      .request(server)
      .post("/batch/student")
      .set("content-type", "application/json")
      .send({
        csv: `Meho,Mehic,11111,Grupa1\nSuljo,Suljic,22222,Grupa2\nFata,Fatic,33333,Grupa3\nSemo,Semic,44444,Grupa4\nAmar,Begovac,18752,Grupa1`,
      })
      .end((err, res) => {
        assert.isNull(err);
        assert.equal(res.status, 200);
        assert.equal(res.text, '{"status":"Dodano 5 studenata!"}');
        done();
      });
  });

  it("Dodaj duple studente", function (done) {
    chai
      .request(server)
      .post("/batch/student")
      .set("content-type", "application/json")
      .send({
        csv: `Meho,Mehic,11111,Grupa1\nSuljo,Suljic,22222,Grupa2\nFata,Fatic,33333,Grupa3\nSemo,Semic,44444,Grupa4\nAmar,Begovac,18752,Grupa1`,
      })
      .end((err, res) => {
        assert.isNull(err);
        assert.equal(res.status, 200);
        assert.equal(
          res.text,
          '{"status":"Dodano 0 studenata, a studenti 11111,22222,33333,44444,18752 već postoje!"}'
        );
        done();
      });
  });

  it("Pola duplih pola nije", function (done) {
    chai
      .request(server)
      .post("/batch/student")
      .set("content-type", "application/json")
      .send({
        csv: `Meho,Mehic,11111,Grupa1\nSuljo,Suljic,77777,Grupa2\nFata,Fatic,33333,Grupa3\nSemo,Semic,88888,Grupa4\nAmar,Begovac,18752,Grupa1\nMusa,Kesedjija,99999,GrupaKojuOnHoce`,
      })
      .end((err, res) => {
        assert.isNull(err);
        assert.equal(res.status, 200);
        assert.equal(
          res.text,
          '{"status":"Dodano 3 studenata, a studenti 11111,33333,18752 već postoje!"}'
        );
        done();
      });
  });

  it("Dupli unutar jednog zahtjeva", function (done) {
    chai
      .request(server)
      .post("/batch/student")
      .set("content-type", "application/json")
      .send({
        csv: `Meho,Mehic,12345,Grupa1\nSuljo,Suljic,12345,Grupa2\nFata,Fatic,98765,Grupa3\nSemo,Semic,12111,Grupa4\nAmar,Begovac,98765,Grupa1`,
      })
      .end((err, res) => {
        assert.isNull(err);
        assert.equal(res.status, 200);
        assert.equal(
          res.text,
          '{"status":"Dodano 3 studenata, a studenti 12345,98765 već postoje!"}'
        );
        done();
      });
  });

  it("Svi isti", function (done) {
    chai
      .request(server)
      .post("/batch/student")
      .set("content-type", "application/json")
      .send({
        csv: `Meho,Mehic,225883,Grupa1\nMeho,Mehic,225883,Grupa1\nMeho,Mehic,225883,Grupa1\nMeho,Mehic,225883,Grupa1\nMeho,Mehic,225883,Grupa1`,
      })
      .end((err, res) => {
        assert.isNull(err);
        assert.equal(res.status, 200);
        assert.equal(
          res.text,
          '{"status":"Dodano 1 studenata, a studenti 225883,225883,225883,225883 već postoje!"}'
        );
        done();
      });
  });

  it("Svi vec postoje u bazi", function (done) {
    chai
      .request(server)
      .post("/batch/student")
      .set("content-type", "application/json")
      .send({
        csv: `Meho,Mehic,225883,Grupa1\nMeho,Mehic,225883,Grupa1\nMeho,Mehic,225883,Grupa1\nMeho,Mehic,225883,Grupa1\nMeho,Mehic,225883,Grupa1`,
      })
      .end((err, res) => {
        assert.isNull(err);
        assert.equal(res.status, 200);
        assert.equal(
          res.text,
          '{"status":"Dodano 0 studenata, a studenti 225883,225883,225883,225883,225883 već postoje!"}'
        );
        done();
      });
  });

  it("Veliki broj dodavanja sa jednim duplim", function (done) {
    let broj = 100;
    let ulaz = "";
    for (let i = 0; i < broj; ++i) {
      ulaz += `Meho,Mehic,${i},Grupa1\n`;
    }
    ulaz += "Meho,Mehic,1,Grupa1";
    chai
      .request(server)
      .post("/batch/student")
      .set("content-type", "application/json")
      .send({
        csv: ulaz,
      })
      .end((err, res) => {
        assert.isNull(err);
        assert.equal(res.status, 200);
        assert.equal(
          res.text,
          `{"status":"Dodano ${broj} studenata, a studenti 1 već postoje!"}`
        );
        done();
      });
  });
};

describe("Spirala 4", function () {
  describe("Testovi rute /student", testoviDodavanjaStudenta);
  describe("Testovi rute /student/:index", testoviDodavanjaGrupe);
  describe("Testovi rute /batch/student", testoviDodavanjaViseStudenta);
});
