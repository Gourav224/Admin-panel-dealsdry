import { useEffect, useState } from "react";
import EmployeeTable from "../components/EmployeeTable.jsx";
import employeeService from "../config/employeeApi.js";

const EmployeeList = () => {
  // Initialize state for employee list
  const [employeeList, setEmployeeList] = useState([]);

  useEffect(() => {
    // Fetch employee data from API
    employeeService
      .getAllEmployees()
      .then((response) => setEmployeeList(response));
  }, []);
  // console.log(employeeList)
  return (
    <div>
      <EmployeeTable employees={employeeList} />
    </div>
  );
};

export default EmployeeList;
