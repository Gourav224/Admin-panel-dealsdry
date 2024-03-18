import { useEffect, useState } from "react";
import EmployeeTable from "../components/EmployeeTable.jsx";
import employeeService from "../config/employeeApi.js";

const EmployeeList = () => {
  const [employeeList, setEmployeeList] = useState([]);
  useEffect(() => {
    employeeService
      .getAllEmployees()
      .then((response) => setEmployeeList(response));
  }, []);
  return (
    <div>
      <EmployeeTable employees={employeeList} />
    </div>
  );
};

export default EmployeeList;
