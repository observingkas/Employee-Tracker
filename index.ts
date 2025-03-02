import { mainMenu, addDepartment, addRolePrompt, addEmployeePrompt, updateEmployeeRolePrompt } from "./src/utils/inquirer";
import { departmentQueries } from "./src/queries/department";
import { roleQueries } from "./src/queries/role";
import { employeeQueries } from "./src/queries/employee";

function init() {
  mainMenu()
    .then(({ choice }) => {
      switch (choice) {
        case "View All Departments":
          departmentQueries.viewAll()
              .then((departments) => {
                  console.table(departments);
                  init();    // removed 'return' here
              });
          break;                           

        case "View All Roles":
          roleQueries.viewAll()                
            .then((roles) => {
              console.table(roles);
              return init();                    
            });
          break;                                

          case "View All Employees":
            employeeQueries.viewAll()
                .then((employees) => {
                    console.table(employees);
                    init();    // removed 'return' here
                });
            break;                           

        case "Add a Department":
          addDepartment()
            .then(({ name }) => {
              return departmentQueries.add(name);
            })
            .then(() => {
              console.log("Department added successfully!");
              return init();                   
            });
          break;                               

        case "Add a Role":
          addRolePrompt()
            .then(({ title, salary, department_id }) => {
              return roleQueries.add(title, Number(salary), department_id);
            })
            .then(() => {
              console.log("Role added successfully!");
              return init();                   
            });
          break;                               

        case "Add an Employee":
          addEmployeePrompt()
            .then(({ first_name, last_name, role_id, manager_id }) => {
              return employeeQueries.add(first_name, last_name, role_id, manager_id);
            })
            .then(() => {
              console.log('Employee added successfully!');
              return init();                   
            });
          break;                               

        case "Update Employee Role":
          updateEmployeeRolePrompt()
            .then(({ employee_id, new_role_id }) => {
              return employeeQueries.updateRole(employee_id, new_role_id);
            })
            .then(() => {
              console.log('Employee role updated successfully!');
              return init();                   
            });
          break;                               

        case "Exit":
          process.exit();
      }
    })
    .catch((err) => console.error("Error:", err));
}

init();