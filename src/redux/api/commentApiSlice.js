import { Endpoints, Methods } from '../../js/enums';
import apiSlice from './apiSlice';

const commentApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllComments: builder.query({
            queryFn: () => ({
                url: `${Endpoints.commentsAll}`,
                method: Methods.get,
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.map((comments) => ({
                            type: 'Comment',
                            id: comments._id,
                        })),
                        'Comment',
                    ]
                    : ['Comment'],
        }),

        getCommentById: builder.query({
            queryFn: (commentId) => ({
                url: `${Endpoints.comments}${commentId}`,
                method: Methods.get,
            }),
            providesTags: ['Comment'],
        }),

        getCommentsByItemId: builder.query({
            queryFn: (itemId) => ({
                url: `${Endpoints.commentsToItem}${itemId}`,
                method: Methods.get,
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.map((comment) => ({
                            type: 'Comment',
                            id: comment._id,
                        })),
                        'Comment',
                    ]
                    : ['Comment'],
        }),

        createComment: builder.mutation({
            queryFn: (body) => ({
                url: `${Endpoints.comments}`,
                method: Methods.post,
                headers: {
                    'Content-type': 'application/json',
                    accept: 'application/json',
                },
                body,
            }),
            invalidatesTags: ['Comment'],
        }),

        deleteCommentById: builder.mutation({
            queryFn: (commentId) => ({
                url: `${Endpoints.comments}${commentId}`,
                method: Methods.delete,
                headers: {
                    'Content-type': 'application/json',
                    accept: 'application/json',
                },
            }),
            invalidatesTags: ['Comment'],
        }),

        updateCommentById: builder.mutation({
            queryFn: ({ commentId, body }) => ({
                url: `${Endpoints.comments}${commentId}`,
                method: Methods.put,
                headers: {
                    'Content-type': 'application/json',
                    accept: 'application/json',
                },
                body,
            }),
            invalidatesTags: ['Comment'],
        }),

        getChangedComment: builder.query({
            queryFn: () => ({
                url: `${Endpoints.comments}`,
                method: Methods.get,
            }),
            providesTags: ['Comment'],
        }),
    }),
});

export const {
    useLazyGetCommentByIdQuery,
    useLazyGetCommentsByItemIdQuery,
    useLazyGetChangedCommentQuery,
    useLazyGetAllCommentsQuery,
    useCreateCommentMutation,
    useDeleteCommentByIdMutation,
    useUpdateCommentByIdMutation,
} = commentApiSlice;
