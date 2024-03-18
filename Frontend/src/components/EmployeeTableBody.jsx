import { Link } from "react-router-dom";

const EmployeeTableBody = ({ employee, index, onEdit, onDelete }) => {
  return (
    <tr key={employee.id}>
      <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
      <td className="px-6 py-4 whitespace-nowrap">{employee.name}</td>
      <td className="px-6 py-4 whitespace-nowrap">{employee.email}</td>
      <td className="px-6 py-4 whitespace-nowrap">{employee.mobileNo}</td>
      <td className="px-6 py-4 whitespace-nowrap">{employee.designation}</td>
      <td className="px-6 py-4 whitespace-nowrap">{employee.gender}</td>
      <td className="px-6 py-4 whitespace-nowrap">{employee.course}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        {employee.createdAt.substring(0, 10)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <Link to={`/edit-employee/${employee._id}`}>
          <button className="text-blue-600 hover:text-blue-900 mr-2">
            Edit
          </button>
        </Link>
        <button className="text-red-600 hover:text-red-900" onClick={onDelete}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default EmployeeTableBody;
