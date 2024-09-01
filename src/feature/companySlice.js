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
            console.log("ID to delete:", idToDelete);
            console.log("Current employees:", state.employees);
            
            state.employees = state.employees.filter(employee => employee._id !== idToDelete);
            
            console.log("Employees after deletion:", state.employees);
        },
        updateEmployee: (state, action) => {
            const updatedEmployee = action.payload;
            console.log("Payload reçu dans updateEmployee:", updatedEmployee);
            
            const index = state.employees.findIndex(emp => emp._id === updatedEmployee._id);
            if (index !== -1) {
                state.employees[index] = { ...state.employees[index], ...updatedEmployee };
            } else {
                console.log("Employé non trouvé dans le state:", updatedEmployee._id);
            }
            console.log("État mis à jour des employés:", state.employees);
        },
        clearCompany: () => null,
    }
})

export const { setCompanyName, setCompany, setCompanyId, setCompanyEmployees, addEmployee, deleteEmployee, updateEmployee, clearCompany } = companySlice.actions
export default companySlice.reducer