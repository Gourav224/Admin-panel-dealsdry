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
            const response = await axios.put(
                `${EmployeeApi.baseUrl}/employee/update-employee`,
                { id, ...updatedData }, // Spread the updatedData object to include it in the request body
                {
                    headers: {
                        'Content-Type': 'application/json' // Use application/json for JSON data
                    }
                }
            );

            const updatedEmployee = response.data; // Assuming response.data contains the updated employee data
            console.log('Employee updated successfully:', updatedEmployee);
            return updatedEmployee;
        } catch (error) {
            console.log(error);
            throw error; // Optionally rethrow the error for further handling
        }
    }


    async getAllEmployees() {
        try {
            const response = await axios.get(`${EmployeeApi.baseUrl}/employee/get-all-employee`);

            const { data } = response;
            // console.log('All employees:', data.data);
            return data.data;
        } catch (error) {
            // console.log(error);
        }
    }

    async deleteEmployee(id) {
        try {
            const response = await axios.delete(`${EmployeeApi.baseUrl}/employee/delete-employee`, {
                data: { id }
            });
            // console.log(response);
            alert('Employee deleted successfully');
        } catch (error) {
            // console.log(error);
        }
    }

    async  getEmployee(id) {
    try {
        console.log(id); // Log the ID being fetched
        const response = await axios.post(`${EmployeeApi.baseUrl}/employee/get-employee`, { id });
        console.log(response.data); // Log the response data
        return response.data; // Return the response data
    } catch (error) {
        // Handle errors appropriately
        console.log(error); // Log the error
        // throw error; // Optionally rethrow the error for further handling
    }
}
    

}

const employeeService = new EmployeeApi();
export default employeeService;