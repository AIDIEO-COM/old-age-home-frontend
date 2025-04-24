
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Mock data generator for our demo application
const generateMockData = () => {
  const categories = [
    'Rooms', 'Shower', 'Bath Hoist', 'Temperature', 
    'Wheelchair', 'Pest Control', 'First Aid', 'Ladder'
  ];
  
  const statuses = ['Completed', 'Pending', 'Requires Attention'];
  const currentDate = new Date();
  
  // Generate daily data for the past 30 days
  const dailyData = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(currentDate.getDate() - (29 - i));
    
    return {
      date: date.toISOString().split('T')[0],
      completedChecks: Math.floor(Math.random() * 8) + 1,
      pendingChecks: Math.floor(Math.random() * 4),
    };
  });
  
  // Generate category-specific data
  const categoryData = categories.map(category => ({
    category,
    completed: Math.floor(Math.random() * 100),
    pending: Math.floor(Math.random() * 50),
    attention: Math.floor(Math.random() * 20),
  }));
  
  // Generate recent checks
  const recentChecks = Array.from({ length: 10 }, (_, i) => ({
    id: `check-${i + 1}`,
    category: categories[Math.floor(Math.random() * categories.length)],
    performedBy: `Staff ${Math.floor(Math.random() * 5) + 1}`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    date: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    notes: Math.random() > 0.5 ? 'All checks completed successfully' : 'Requires follow-up',
  }));
  
  return {
    dailyData,
    categoryData,
    recentChecks,
    summary: {
      total: 875,
      completed: 712,
      pending: 103,
      attention: 60,
    }
  };
};

// Create our API service
export const checksApi = createApi({
  reducerPath: 'checksApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    getDashboardData: builder.query({
      queryFn: async () => {
        // Simulate API request delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        return { data: generateMockData() };
      },
    }),
    getCheckDetails: builder.query({
      queryFn: async (checkType) => {
        // Simulate API request delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const mockChecks = Array.from({ length: 20 }, (_, i) => ({
          id: `${checkType.toLowerCase()}-${i + 1}`,
          location: `Room ${Math.floor(Math.random() * 100) + 1}`,
          lastChecked: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
          status: Math.random() > 0.8 ? 'Requires Attention' : Math.random() > 0.4 ? 'Completed' : 'Pending',
          checkedBy: `Staff ${Math.floor(Math.random() * 5) + 1}`,
          notes: Math.random() > 0.7 ? 'Issue detected, follow-up required' : 'No issues detected',
        }));
        
        return { data: mockChecks };
      },
    }),
    submitCheck: builder.mutation({
      queryFn: async (checkData) => {
        // Simulate API request delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        return { 
          data: { 
            ...checkData, 
            id: `check-${Date.now()}`,
            timestamp: new Date().toISOString(),
            success: true 
          } 
        };
      },
    }),
  }),
});

export const { 
  useGetDashboardDataQuery, 
  useGetCheckDetailsQuery,
  useSubmitCheckMutation 
} = checksApi;
