import request from "supertest";
import { app, pool } from "../..";
import {
  testUser,
  duplicateUsername,
  duplicateEmail,
} from "../../utils/testData";

const route = "/auth/register";

describe("The user registration endpoint", () => {
  beforeEach(async () => {
    await pool.query("BEGIN");
  }, 60000);

  afterEach(async () => {
    await pool.query("ROLLBACK");
  }, 60000);

  afterAll(async () => {
    await pool.end(); // close the db connection after testing all
  }, 60000);

  // ADDING A NEW USER
  it("should register a new user successfully", async () => {
    const response = await request(app).post(route).send(testUser);

    expect(response.status).toBe(201);
    expect(response.body).toBeDefined();
    expect(typeof response.body).toBe("string");
  }, 60000);

  // ADDING A NEW USER WITH THE SAME USERNAME
  it("should return an error if the username is already taken", async () => {
    await pool.query(
      "INSERT INTO Users (username, email, password) VALUES ($1, $2, $3)",
      [duplicateUsername.username, testUser.email, testUser.password],
    );

    const response = await request(app).post(route).send(duplicateUsername);

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      field: "username",
      message: "This username is already taken. Try another one!",
    });
  }, 60000);

  // ADDING A NEW USER WITH THE SAME EMAIL
  it("should return an error if the email is already in use", async () => {
    await pool.query(
      "INSERT INTO Users (username, email, password) VALUES ($1, $2, $3)",
      [testUser.username, duplicateEmail.email, testUser.password],
    );

    const response = await request(app).post(route).send(duplicateEmail);

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      field: "email",
      message: "This email is already in use. Please use a different one.",
    });
  }, 60000);
});
