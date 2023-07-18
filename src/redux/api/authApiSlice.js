import { Endpoints, Methods } from '../../js/enums';
import apiSlice from './apiSlice';

const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        signUp: builder.mutation({
            query: (body) => ({
                url: `${Endpoints.signUp}`,
                method: Methods.post,
                headers: {
                    'Content-type': 'application/json',
                    accept: 'application/json',
                },
                body,
            }),
            transformErrorResponse: ({ status }) => {
                switch (status) {
                    case 403:
                        return 'signUpError403';
                    default:
                        return 'signUpError';
                }
            },
        }),

        signIn: builder.mutation({
            query: (body) => ({
                url: `${Endpoints.signIn}`,
                method: Methods.post,
                headers: {
                    'Content-type': 'application/json',
                    accept: 'application/json',
                },
                body,
            }),
            transformErrorResponse: ({ status }) => {
                switch (status) {
                    case 404:
                        return 'signInError404';
                    case 401:
                        return 'signInError401';
                    case 403:
                        return 'signInError403';
                    default:
                        return 'signInError';
                }
            },
        }),
    }),
});

// const useSignInMutation = authApiSlice.useSignInMutation;
// const useSignUpMutation = authApiSlice.useSignUpMutation;

export const { useSignInMutation, useSignUpMutation } = authApiSlice;
