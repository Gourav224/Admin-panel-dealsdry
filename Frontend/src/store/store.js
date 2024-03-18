import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import EmployeeListSlice from './EmployeeListSlice';

const store = configureStore({
    reducer: {
        auth: authSlice,
        list: EmployeeListSlice,
    }
});


export default store;