import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { addEmployee,deleteEmployee,updateEmployee } from '../feature/companySlice';

const employeeApi = createApi({
  reducerPath: 'employeeApi',
  baseQuery: fetchBaseQuery(
    { 
        baseUrl: import.meta.env.VITE_API_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = localStorage.getItem('token');
            if (token) {
              headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
          },
    }),
  endpoints: (builder) => ({

    addEmployee: builder.mutation({
      query: (formData) => (
        console.log(formData),{
        url: 'employee',
        method: 'POST',
        body: formData,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(addEmployee(data));
        } catch (error) {
          console.error("Erreur lors de l'ajout de l'employé:", error);
        }
      },
    }),
    removeEmployee: builder.mutation({
        query: (id) => ({
          url: 'employee/'+id,
          method: 'DELETE',
        }),
        async onQueryStarted(id, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;
            dispatch(deleteEmployee(id));
          } catch (error) {
            console.error("Erreur lors de l'ajout de l'employé:", error);
          }
        },
      }),
      updateEmployee: builder.mutation({
        query: ({ id, employe }) => {
          console.log("Données reçues dans la mutation:", employe);
          return {
            url: `employee/${id}`,
            method: 'PUT',
            body: employe
          };
        },
        async onQueryStarted({ id, employe }, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;
            console.log("Réponse du serveur:", data);
            dispatch(updateEmployee(data));
          } catch (error) {
            console.error("Erreur lors de la mise à jour de l'employé:", error);
          }
        },
      }),
  }),
});

export const { useAddEmployeeMutation, useRemoveEmployeeMutation, useUpdateEmployeeMutation } = employeeApi;

export default employeeApi;