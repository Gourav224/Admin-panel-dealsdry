import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list: []
}

const EmployeeListSlice = createSlice({
    name: "List",
    initialState,
    reducers: {
        updateList: (state, action) => {
            state.userData = action.payload;
        },
    }
})

export const { updateList } = EmployeeListSlice.actions;

export default EmployeeListSlice.reducer;