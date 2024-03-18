import axios from 'axios';
class ApiService {
    static baseUrl = "http://localhost:5000/api";

    async login({ email, password }) {
        try {
            const response = await axios.post(`${ApiService.baseUrl}/users/login`, { email, password });
            localStorage.setItem('accessToken', response.data.data.accessToken);
            // console.log(response.data.data.accessToken);
            return response;
        } catch (error) {
            // console.log(error);
        }
    }

    async logout() {
        try {
            await axios(`${ApiService.baseUrl}/users/logout`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            // Clear the access token from localStorage
            localStorage.removeItem('accessToken');
            return true;
        } catch (error) {
            // console.log(error);
            return false
        }
    }

    async getCurrentUser() {
        try {
            const response = await axios(`${ApiService.baseUrl}/users/get-current-user`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            });

            return response;
        } catch (error) {
            // console.log(error);
        }
    }

}

const api = new ApiService();
export default api;
