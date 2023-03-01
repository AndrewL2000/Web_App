import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
    reducerPath: "adminApi",
    tagTypes: [
        "User",
        "Accounts",
        "Products",
        "Customers",
        "ASXTransactions",
        "Geography",
        "MonthlySpending",
        "Admins",
        "Performance",
        "Dashboard",
    ],
    // API CALLS
    endpoints: (build) => ({
        getUser: build.query({
            query: (id) => `general/user/${id}`,
            providesTags: ["User"],
        }),
        getAccounts: build.query({
            query: ({ sort, search }) => ({
                url: "investment/accounts",
                method: "GET",
                params: { sort, search },
            }),
            providesTags: ["Accounts"],
        }),
        getProducts: build.query({
            query: () => "investment/products",
            providesTags: ["Products"],
        }),
        getCustomers: build.query({
            query: () => "investment/customers",
            providesTags: ["Customers"],
        }),
        getASXTransactions: build.query({
            query: ({ page, pageSize, sort, search }) => ({
                url: "investment/asx",
                method: "GET",
                params: { page, pageSize, sort, search },
            }),
            providesTags: ["ASXTransactions"],
        }),
        getGeography: build.query({
            query: () => "investment/geography",
            providesTags: ["Geography"],
        }),
        getMonthlySpending: build.query({
            query: () => "budget/monthly-spending",
            providesTags: ["MonthlySpending"],
        }),
        getAdmins: build.query({
            query: () => "management/admins",
            providesTags: ["Admins"],
        }),
        getUserPerformance: build.query({
            query: (id) => `management/performance/${id}`,
            providesTags: ["Performance"],
        }),
        getDashboard: build.query({
            query: () => "general/dashboard",
            providesTags: ["Dashboard"],
        }),

        mutateAccounts: build.mutation({
            query: ({ id, data, method }) => ({
                url: `investment/accounts/${id}`,
                method: method,
                body: data,
                params: { id }
            }),
            invalidatesTags: ["Accounts"],
        }),
    }),
});

export const {
    useGetUserQuery,
    useGetAccountsQuery,
    useGetProductsQuery,
    useGetCustomersQuery,
    useGetASXTransactionsQuery,
    useGetGeographyQuery,
    useGetMonthlySpendingQuery,
    useGetAdminsQuery,
    useGetUserPerformanceQuery,
    useGetDashboardQuery,
    useMutateAccountsMutation,
} = api;
