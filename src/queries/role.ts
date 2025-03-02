import pool from "../config/connection";
import { Role } from "../types/database.types";

export const roleQueries = {
  // View all roles with department names
  viewAll: () => {
    return pool
      .query(
        `
            SELECT r.id, r.title, r.salary, d.name as department
            FROM role r
            JOIN department d ON r.department_id = d.id
            ORDER BY r.id
            `
      )
      .then((result) => result.rows);
  },

  // Add a role
  add: (title: string, salary: number, department_id: number) => {
    return pool
      .query(
        "INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *",
        [title, salary, department_id]
      )
      .then((result) => result.rows[0]);
  },
};
