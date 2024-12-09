import request from "supertest";
import { app, pool } from "../../index";

describe("The user registration endpoint", () => {
  const baseRoute = "/auth/register";

  const testUser = {
    username: "shish",
    email: "shishwow@test.com",
    password: "passwordKo12345",
  };
  const duplicateUsername = {
    username: "dupe",
    email: "testing@test.com",
    password: "passwordKo123456",
  };
  const duplicateEmail = {
    username: "test2",
    email: "shishwow@test.com",
    password: "passwordKo1234567",
  };

  beforeEach(async () => {
    await pool.query("BEGIN");
    await pool.query("DELETE FROM Users WHERE username IN ($1, $2, $3)", [
      testUser.username,
      duplicateUsername.username,
      duplicateEmail.username,
    ]);
  });

  afterEach(async () => {
    await pool.query("ROLLBACK");
  });

  afterAll(async () => {
    await pool.end(); // close the db connection after testing all
  });

  // ADDING A NEW USER
  it("should register a new user successfully", async () => {
    const response = await request(app).post(baseRoute).send(testUser);

    expect(response.status).toBe(201);
    expect(response.body).toBeDefined();
    expect(typeof response.body).toBe("string");
  });

  // ADDING A NEW USER WITH THE SAME USERNAME
  it("should return an error if the username is already taken", async () => {
    await pool.query(
      "INSERT INTO Users (username, email, password) VALUES ($1, $2, $3)",
      [duplicateUsername.username, testUser.email, testUser.password],
    );
    const response = await request(app).post(baseRoute).send(duplicateUsername);

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      field: "username",
      message: "This username is already taken. Try another one!",
    });
  });

  // ADDING A NEW USER WITH THE SAME EMAIL
  it("should return an error if the email is already in use", async () => {
    await pool.query(
      "INSERT INTO Users (username, email, password) VALUES ($1, $2, $3)",
      [testUser.username, duplicateEmail.email, testUser.password],
    );
    const response = await request(app).post(baseRoute).send(duplicateEmail);

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      field: "email",
      message: "This email is already in use. Please use a different one.",
    });
  });
});
