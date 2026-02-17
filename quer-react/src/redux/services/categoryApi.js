import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryApi = {
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://northwind.vercel.app/api/" }),
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => "categories",
    }),
    getCategoriesById: builder.query({
      query: (id) => `categories/${id}`,
    }),
    
  }),
};

export const { useGetAllcategoriesQuery} = categoryApi;
