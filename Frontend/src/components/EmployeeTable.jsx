import employeeService from "../config/employeeApi";
import EmployeeTableBody from "./EmployeeTableBody";
const EmployeeTable = ({ employees }) => {
  // Handler function for deleting an employee
  const handleDeleteEmployee = (employeeId) => {
    // Add your logic for deleting an employee here
    employeeService
      .deleteEmployee(employeeId)
      .then((response) => {
        alert("employee Deleted  successfully ");
      })
      .catch((err) => alert("Error in delete operation"));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Employee List</h2>
      <table className="w-full border-collapse border border-gray-500">
        <thead>
          <tr>
            <th className="border border-gray-500 p-2">Unique Id</th>
            <th className="border border-gray-500 p-2">Name</th>
            <th className="border border-gray-500 p-2">Email</th>
            <th className="border border-gray-500 p-2">Mobile No</th>
            <th className="border border-gray-500 p-2">Designation</th>
            <th className="border border-gray-500 p-2">Gender</th>
            <th className="border border-gray-500 p-2">Course</th>
            <th className="border border-gray-500 p-2">Create Date</th>
            <th className="border border-gray-500 p-2">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {employees.length !== 0 &&
            employees.map((employee, index) => (
              <EmployeeTableBody
                key={index}
                employee={employee}
                index={index}
                onDelete={() => handleDeleteEmployee(employee._id)}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
