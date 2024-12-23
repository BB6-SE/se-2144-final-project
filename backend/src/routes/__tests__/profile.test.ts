import request from "supertest";
import { app, pool } from "../..";
import { testUser, testNewUsername } from "../../utils/testData";
import bcrypt from "bcrypt";

const route = "/profile";

describe("The profile endpoint", () => {
  beforeEach(async () => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(testUser.password, salt);
    await pool.query("BEGIN");
    await pool.query(
      "INSERT INTO Users (username, email, password) VALUES ($1, $2, $3)",
      [testUser.username, testUser.email, hashedPassword],
    );
  }, 60000);

  afterEach(async () => {
    await pool.query("ROLLBACK");
  }, 60000);

  afterAll(async () => {
    await pool.end(); // close the db connection after testing all
  }, 60000);

  // CHANGE USERNAME
  it("should rename the user", async () => {
    const { rows: userRows } = await pool.query(
      "SELECT id FROM Users WHERE username = $1",
      [testUser.username],
    );

    const userId = userRows[0].id;

    const response = await request(app)
      .put(route + `/?id=${userId}`)
      .send({
        id: userId,
        username: testNewUsername.username,
      });

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body[0]["username"]).toBe(testNewUsername.username);
  }, 60000);

  // CHANGE USERNAME WITH AN EXISTING USERNAME
  it("should give an error that the username already exists", async () => {
    const { rows: userRows } = await pool.query(
      "SELECT id FROM Users WHERE username = $1",
      [testUser.username],
    );

    const userId = userRows[0].id;

    const response = await request(app)
      .put(route + `/?id=${"52584e60-3480-4523-ab59-f4ad2bbf99aa"}`)
      .send({
        id: "52584e60-3480-4523-ab59-f4ad2bbf99aa",
        username: testUser.username,
      });
    console.log(userId);
    expect(response.status).toBe(400);
    expect(response.body).toBeDefined();
    expect(response.body.message).toBe("Username already exists.");
  });

  // DELETE USER
  it("should delete the user", async () => {
    const { rows: userRows } = await pool.query(
      "SELECT id FROM Users WHERE username = $1",
      [testUser.username],
    );
    const userId = userRows[0].id;
    const response = await request(app).delete(route).send({ id: userId });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("User deleted successfully.");
  }, 60000);
});
