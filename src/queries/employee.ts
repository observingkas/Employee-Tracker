import pool from "../config/connection";
import { Employee } from "../types/database.types";

export const employeeQueries = {
  // View all employees with their role, department, and manager information
  viewAll: () => {
    return pool
      .query(
        `
            SELECT
            e.id,
            e.first_name,
            e.last_name,
            r.title,
            d.name as department,
            r.salary,
            CONCAT(m.first_name, ' ', m.last_name) as manager
            FROM employee e
            LEFT JOIN role r ON e.role_id = r.id
            LEFT JOIN employee m ON e.manager_id = m.id
            ORDER BY e.id
            `
      )
      .then((result) => result.rows);
  },

  // Add an employee
  add: (
    first_name: string,
    last_name: string,
    role_id: number,
    manager_id: number | null
  ) => {
    return pool
      .query(
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *",
        [first_name, last_name, role_id, manager_id]
      )
      .then((result) => result.rows[0]);
  },

  // Update an employee's role
  updateRole: (employee_id: number, new_role_id: number) => {
    return pool
      .query("UPDATE employee SET role_id = $2 WHERE id = $1 RETURNING *", [
        employee_id,
        new_role_id,
      ])
      .then((result) => result.rows[0]);
  },
};
