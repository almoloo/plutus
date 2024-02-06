"use server";
import { sql } from "@vercel/postgres";
import { User } from "@/lib/definitions";

/**
 * Retrieves a user from the database based on the provided UUID.
 * If no UUID is provided, returns null.
 *
 * @param uuid - The UUID of the user to retrieve.
 * @returns The user object if found, otherwise null.
 */
export const getUser = async (uuid?: string) => {
  if (!uuid) {
    return null;
  }
  try {
    // check if database has users table and create it with User type if not
    await sql`
		CREATE TABLE IF NOT EXISTS users (
		  uuid UUID PRIMARY KEY NOT NULL,
		  email TEXT NOT NULL,
		  name TEXT NOT NULL,
		  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
		  address TEXT NOT NULL
		)
	  `;
    // check for the user in the database
    const result = await sql<User[]>`SELECT * FROM users WHERE uuid = ${uuid}`;
    return result.rows[0] ? result.rows[0] : null;
  } catch (error) {
    console.error("Error retrieving user:", error);
    return null;
  }
};

/**
 * Creates a new user in the database.
 * @param user The user object containing the user's details.
 * @returns The created user object.
 */
export const createUser = async (user: User) => {
  try {
    await sql`
		  INSERT INTO users (uuid, email, name, address) VALUES (${user.uuid}, ${user.email}, ${user.name}, ${user.address})
		`;
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    return null;
  }
};
