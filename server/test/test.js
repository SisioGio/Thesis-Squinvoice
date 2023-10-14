const request = require("supertest");
const { expect } = require("expect");

const app = require("../server");

describe("Testing GET / endpoint", () => {
  it("respond with valid HTTP status code and description and message", async () => {
    const response = await request(app).get("/test").send();

    expect(response.status).toBe(200);

    expect(response.body.message).toBe("Welcome");
  });
});

describe("Testing POST / user", () => {
  it("respond with valid HTTP status code and description and message", async () => {
    const response = await request(app).post("/api/user").send({
      name: "Alessio",
      surname: "Giovannini",
      email: "alessiogiovannini@oerlikon.com",
      password: "Test123",
    });

    expect(response.status).toBe(200);

    expect(response.body.message).toBe("User Created");
  });
});
