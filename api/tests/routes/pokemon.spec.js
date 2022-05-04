/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemon, conn } = require('../../src/db.js');

const agent = session(app);
const pokemon = {
  name: "Fran",
  urlImg:
   undefined,
  id: 1,
  height: 70,
  weight: 90,
  hp: 50,
  attack: 50,
  defense: 52,
  speed: 50,
};




describe("Pokemons routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error(`Can't connect with database`, err);
    })
  );

  describe("/pokemons", function () {
    it("GET respons with status 200", function () {
      return agent.get("/pokemons").expect(function (res) {
        expect(res.status).equal(200);
      });
    }).timeout(10000);
    it("Elements received is a Object", function () {
      return agent.get("/pokemons").expect(function (res) {
        expect(typeof res.body[0]).equal("object");
      });
    }).timeout(10000);
  });

  describe("/pokemons?name=", function () {
    it("GET receives a body length larger if there is query coincidences", function () {
      return agent.get("/pokemons?name=bulbasaur").expect(function (res) {
        console.log(res.body)
        expect(Object.keys(res.body).length).equal(9);
      });
    }).timeout(3000);
  });

  describe("/pokemon/:id", function () {
    it("GET responses with status 200 if a pokemon is found", function () {
      return agent.get("/pokemon/1").expect(function (res) {
        expect(res.status).equal(200);
      });
    }).timeout(10000);
  });
});