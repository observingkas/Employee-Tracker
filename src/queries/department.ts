import pool from "../config/connection";
import { Department } from "../types/database.types";

export const departmentQueries = {
  //View all departments
  viewAll: () => {
    return pool
        .query("SELECT * FROM department ORDER BY id")
        .then((result) => {
            console.log('Query result:', result.rows); // Debug log
            return result.rows;
        })
        .catch(error => {
            console.error('Database error:', error);
            throw error;
        });
},

  //Add a department
  add: (name: string) => {
    return pool
      .query("INSERT INTO department (name) VALUES ($1) RETURNING *", [name])
      .then((result) => result.rows[0]);
  },
};
