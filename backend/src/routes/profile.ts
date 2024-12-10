import express, { Request, Response, NextFunction } from "express";
import { pool } from "..";
import bcrypt from "bcrypt";
import authorization from "../middleware/authorization";

const router = express.Router();
// update name
// get
router.get(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { id } = request.query;
      const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [
        id,
      ]);
      response.status(200).json(result.rows);
    } catch (error) {
      next(error);
    }
  },
);

// update
router.put(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { id } = request.query;
      const { username } = request.body;
      const usernameCheck = await pool.query(
        `
        SELECT id
        FROM users
        where username = $1
        `,
        [username],
      );
      let canProceed: boolean = true;
      if (usernameCheck.rows.length > 0 && usernameCheck.rows[0].id !== id) {
        response.status(400).json({ message: "Username already exists." });
        canProceed = false;
      }
      if (canProceed) {
        const result = await pool.query(
          `
        UPDATE users
        SET username = $1
        WHERE id = $2
        RETURNING *
         `,
          [username, id],
        );
        response.status(200).json(result.rows);
      }
    } catch (error) {
      next(error);
    }
  },
);

// update email

// Update password
router.put(
  "/password",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { id } = request.query;
      const { currentPassword, newPassword, confirmNewPassword } = request.body;

      if (!id) {
        response
          .status(400)
          .json({ message: "User ID is required in query parameters." });
      }

      if (!currentPassword || !newPassword || !confirmNewPassword) {
        response
          .status(400)
          .json({ message: "All password fields are required." });
      }

      if (newPassword !== confirmNewPassword) {
        response
          .status(400)
          .json({ message: "New password and confirmation do not match." });
      }

      const userQuery = await pool.query(
        `SELECT password FROM users WHERE id = $1`,
        [id],
      );

      if (userQuery.rows.length === 0) {
        response.status(404).json({ message: "User not found." });
      }

      const storedPasswordHash = userQuery.rows[0].password;

      // Verify the current password
      const isPasswordValid = await bcrypt.compare(
        currentPassword,
        storedPasswordHash,
      );

      if (!isPasswordValid) {
        response
          .status(401)
          .json({ message: "Current password is incorrect." });
      }

      const saltRounds = 10;
      const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);

      const updateQuery = await pool.query(
        `
        UPDATE users
        SET password = $1
        WHERE id = $2
        RETURNING id, username
        `,
        [newPasswordHash, id],
      );

      if (updateQuery.rows.length === 0) {
        response
          .status(400)
          .json({ message: "Failed to update the password." });
      }

      response.status(200).json({
        message: "Password updated successfully.",
        user: updateQuery.rows[0],
      });
    } catch (error) {
      next(error);
    }
  },
);

// delete acoount

export default router;
