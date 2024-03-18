import axios from "axios";

class EmployeeApi {
    static baseUrl = "http://localhost:5000/api";


    async createEmployee(employeeData) {
        try {
            const response = await axios.post(`${EmployeeApi.baseUrl}/employee/create-employee`,
                employeeData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            console.log('Employee created successfully:', response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }



    async updateEmployee(id, updatedData) {
        try {
            const response = await axios.put(`${EmployeeApi.baseUrl}/employee/update-employee`,
                { id, updatedData },
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

            const updatedEmployee = response;
            console.log('Employee updated successfully:', updatedEmployee);
            return updatedEmployee;
        } catch (error) {
            console.log(error);
        }
    }


    async getAllEmployees() {
        try {
            const response = await axios.get(`${EmployeeApi.baseUrl}/employee/get-all-employee`);

            const { data } = response;
            console.log('All employees:', data.data);
            return data.data;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteEmployee(id) {
        try {
            const response = await axios.delete(`${EmployeeApi.baseUrl}/employee/delete-employee`, { id });
            // console.log(response)
            alert('Employee deleted successfully');
        } catch (error) {
            console.log(error);
        }
    }
}

const employeeService = new EmployeeApi();
export default employeeService;