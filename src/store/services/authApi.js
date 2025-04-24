
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// In a real app, you would use an actual API backend
// For this demo, we're simulating API calls
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    login: builder.mutation({
      queryFn: async ({ email, password }) => {
        // Simulate API request delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock authentication logic - in a real app this would call an actual API
        if (email === 'admin@seniorcare.com' && password === 'password') {
          const user = {
            id: 1,
            name: 'Admin User',
            email: 'admin@seniorcare.com',
            role: 'admin',
          };
          return { data: { user } };
        }
        
        return { error: { data: { message: 'Invalid credentials' }, status: 401 } };
      },
    }),
    signup: builder.mutation({
      queryFn: async (userData) => {
        // Simulate API request delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const user = {
          id: Date.now(),
          name: userData.name,
          email: userData.email,
          role: 'staff',
        };
        
        return { data: { user } };
      },
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = authApi;
