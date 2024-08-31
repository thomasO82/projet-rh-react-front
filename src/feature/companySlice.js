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
    }
})

export const { setCompanyName, setCompany, setCompanyId, setCompanyEmployees } = companySlice.actions
export default companySlice.reducer