import { useNavigate, useParams } from "react-router-dom";
import CreateEmployeeForm from "../components/CreateEmployeeForm";
import employeeService from "../config/employeeApi";
import { useEffect, useState } from "react";

const EditEmployee = () => {
  const [data, setData] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      // console.log(slug)
      employeeService.getEmployee(slug).then((val) => {
        console.log(val.data);
        if (val) {
          setData(val.data);
        }
      });
    } else {
      alert("Error in edit");
      navigate("/");
    }
  }, [slug, navigate]);
  return (
    <div className="flex justify-center">
      <CreateEmployeeForm data={data} />
    </div>
  );
};

export default EditEmployee;
