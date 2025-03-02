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
        "View all Roles",
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

export const addEmployeePrompt = () => {
  return Promise.all([roleQueries.viewAll(), employeeQueries.viewAll()]).then(
    ([roles, managers]) => {
      return inquirer.prompt([
        {
          type: "input",
          name: "first_name",
          message: "What is the employee's first name?",
        },
        {
          type: "input",
          name: "last_name",
          message: "What is the employee's last name?",
        },
        {
          type: "list",
          name: "role_id",
          message: "What is the employee's role?",
          choices: roles.map((role) => ({
            name: role.title,
            value: role.id,
          })),
        },
        {
          type: "list",
          name: "manager_id",
          message: "Who is the employee's manager?",
          choices: [
            { name: "None", value: null },
            ...managers.map((manager) => ({
              name: `${manager.first_name} ${manager.last_name}`,
              value: manager.id,
            })),
          ],
        },
      ]);
    }
  );
};

export const updateEmployeeRolePrompt = () => {
  return Promise.all([employeeQueries.viewAll(), roleQueries.viewAll()])
      .then(([employees, roles]) => {
          return inquirer.prompt([
              {
                  type: 'list',
                  name: 'employee_id',
                  message: 'Which employee\'s role do you want to update?',
                  choices: employees.map(emp => ({
                      name: `${emp.first_name} ${emp.last_name}`,
                      value: emp.id
                  }))
              },
              {
                  type: 'list',
                  name: 'role_id',
                  message: 'Which role do you want to assign to the employee?',
                  choices: roles.map(role => ({
                      name: role.title,
                      value: role.id
                    }))
                  }
              ]);
          });
  };