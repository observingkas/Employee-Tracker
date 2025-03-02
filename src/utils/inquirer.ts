import inquirer from "inquirer";
import { departmentQueries } from "../queries/department";
import { roleQueries } from "../queries/role";
import { employeeQueries } from "../queries/employee";

export const mainMenu = () => {
  return inquirer.prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        "View all Departments",
        "View all roles",
        "View all Employees",
        "Add a Department",
        "Add a Role",
        "Add an Employee",
        "Update Employee Role",
        "Exit",
      ],
    },
  ]);
};

export const addDepartment = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is the name of the department?",
      validate: (input) => (input ? true : "Department name cannot be empty."),
    },
  ]);
};

export const addRolePrompt = () => {
  return departmentQueries.viewAll().then((departments) => {
    return inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: "What is the title of the role?",
      },
      {
        type: "number",
        name: "salary",
        message: "What is the salary of the role?",
      },
      {
        type: "list",
        name: "department_id",
        message: "Which department does the role belong to?",
        choices: departments.map((dept) => ({
          name: dept.name,
          value: dept.id,
        })),
      },
    ]);
  });
};
