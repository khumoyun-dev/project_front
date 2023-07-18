import { Endpoints, Methods } from '../../js/enums';
import apiSlice from './apiSlice';

const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            queryFn: () => ({
                url: `${Endpoints.users}`,
                method: Methods.get,
            }),
            providesTags: (result) =>
                result
                    ? [...result.map((user) => ({ type: 'User', id: user._id })), 'User']
                    : ['User'],
        }),

        getUserById: builder.query({
            queryFn: (id) => ({
                url: `${Endpoints.users}${id}`,
                method: Methods.get,
            }),
        }),

        deleteUserById: builder.mutation({
            queryFn: (id) => ({
                url: `${Endpoints.users}${id}`,
                method: Methods.delete,
                headers: {
                    'Content-type': 'application/json',
                    accept: 'application/json',
                },
            }),
            invalidatesTags: ['User'],
        }),

        updateUserById: builder.mutation({
            queryFn: ({ id, body }) => ({
                url: `${Endpoints.users}${id}`,
                method: Methods.put,
                headers: {
                    'Content-type': 'application/json',
                    accept: 'application/json',
                },
                body,
            }),
            invalidatesTags: ['User'],
        }),
    }),
});

export const {
    useLazyGetUserByIdQuery,
    useGetAllUsersQuery,
    useDeleteUserByIdMutation,
    useUpdateUserByIdMutation,
} = userApiSlice;
