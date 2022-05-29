import "mocha";
import { expect } from "chai";
import request from "supertest";
import Server from "../server";

describe("short urls test cases", () => {
  it("should add a new example url for shortening", () =>
    request(Server)
      .post("/api/v1/")
      .send({ url: "http://exmple.com" })
      .expect(201));

  it("should get a url redirect by short hash", () =>
    request(Server)
      .get("/api/v1/buYVg6")
      .expect("Content-Type", /json/)
      .then((r) => {
        expect(200);
      }));

  it("should get stats of example.com url ", () =>
    request(Server)
      .get("/api/v1/shortLinks")
      .expect("Content-Type", /json/)
      .then((r) => {
          expect(r.body)
              .to.be.an("object")
              .that.has.property("url")
              .equal("http://exmple.com")
              .that.has.property('Total Create Requests:')
              .that.has.property('Total Access Requests:');
      }));
});
