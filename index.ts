import { mainMenu, addDepartment, addRolePrompt } from "./src/utils/inquirer";
import { departmentQueries } from "./src/queries/department";
import { roleQueries } from "./src/queries/role";
import { employeeQueries } from "./src/queries/employee";

function init() {
  mainMenu()
    .then(({ choice }) => {
      switch (choice) {
        case "View All Departments":
          return departmentQueries.viewAll().then((departments) => {
            console.table(departments);
            init();
          });

        case "View All Roles":
          return roleQueries.viewAll().then((roles) => {
            console.table(roles);
            init();
          });

        case "View All Employees":
          return employeeQueries.viewAll().then((employees) => {
            console.table(employees);
            init();
          });

        case "Add a Department":
          return addDepartment()
            .then(({ name }) => {
              return departmentQueries.add(name);
            })
            .then(() => {
              console.log("Department added successfully!");
              init();
            });

        case "Add a Role":
          return addRolePrompt()
            .then(({ title, salary, department_id }) => {
              return roleQueries.add(title, Number(salary), department_id);
            })
            .then(() => {
              console.log("Role added successfully!");
              init();
            });

        case "Exit":
          process.exit();
      }
    })
    .catch((err) => console.error("Error:", err));
}

init();
