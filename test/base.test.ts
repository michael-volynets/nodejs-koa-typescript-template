import request from "supertest";
import server from "../src/server";

describe("GET /", () => {
  it("should return 200", () => {
    return request(server).get("/")
      .expect(200);
  });
});