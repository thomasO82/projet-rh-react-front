import { createSlice } from '@reduxjs/toolkit'

const companySlice = createSlice({
    name: 'company',
    initialState: {
        _id: '',
        name: '',
        employees: []
    },
    reducers: {
        setCompanyId: (state, action) => {
            state.id = action.payload
        },
        setCompanyName: (state, action) => {
            state.name = action.payload
        },
        setCompanyEmployees: (state, action) => {
            state.employees = action.payload
        },
        setCompany: (state, action) => {
            return action.payload;
        },
        addEmployee: (state, action) => {
            state.employees.push(action.payload)
        },
        deleteEmployee: (state, action) => {
            const idToDelete = action.payload;
            
            state.employees = state.employees.filter(employee => employee._id !== idToDelete);
            
        },
        updateEmployee: (state, action) => {
            const updatedEmployee = action.payload;
            
            const index = state.employees.findIndex(emp => emp._id === updatedEmployee._id);
            if (index !== -1) {
                state.employees[index] = { ...state.employees[index], ...updatedEmployee };
            } else {
            }
        },
        clearCompany: () => null,
    }
})

export const { setCompanyName, setCompany, setCompanyId, setCompanyEmployees, addEmployee, deleteEmployee, updateEmployee, clearCompany } = companySlice.actions
export default companySlice.reducer