import CreateEmployeeForm from "../components/CreateEmployeeForm";

const EditEmployee = () => {
  const data = {};
  return (
    <div className="flex justify-center">
      <CreateEmployeeForm data={data} />
    </div>
  );
};

export default EditEmployee;
