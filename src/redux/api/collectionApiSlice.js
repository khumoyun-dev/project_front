import { Endpoints, Methods } from '../../js/enums';
import apiSlice from './apiSlice';

const collectionApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllCollections: builder.query({
            queryFn: () => ({
                url: `${Endpoints.collections}`,
                method: Methods.get,
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.map((collection) => ({
                            type: 'Collection',
                            id: collection._id,
                        })),
                        'Collection',
                    ]
                    : ['Collection'],
        }),

        getCollectionById: builder.query({
            queryFn: (collectionId) => ({
                url: `${Endpoints.collections}${collectionId}`,
                method: Methods.get,
            }),
            providesTags: ['Collection'],
        }),

        getCollectionsByUserId: builder.query({
            queryFn: (userId) => ({
                url: `${Endpoints.collectionsByUser}${userId}`,
                method: Methods.get,
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.map((collection) => ({
                            type: 'Collection',
                            id: collection._id,
                        })),
                        'Collection',
                    ]
                    : ['Collection'],
        }),

        createCollection: builder.mutation({
            queryFn: (body) => ({
                url: `${Endpoints.collections}`,
                method: Methods.post,
                headers: {
                    'Content-type': 'application/json',
                    accept: 'application/json',
                },
                body,
            }),
            invalidatesTags: ['Collection'],
        }),

        deleteCollectionById: builder.mutation({
            queryFn: (collectionId) => ({
                url: `${Endpoints.collections}${collectionId}`,
                method: Methods.delete,
                headers: {
                    'Content-type': 'application/json',
                    accept: 'application/json',
                },
            }),
            invalidatesTags: ['Collection'],
        }),

        updateCollectionById: builder.mutation({
            queryFn: ({ collectionId, body }) => ({
                url: `${Endpoints.collections}${collectionId}`,
                method: Methods.put,
                headers: {
                    'Content-type': 'application/json',
                    accept: 'application/json',
                },
                body,
            }),
            invalidatesTags: ['Collection'],
        }),
    }),
});


export const {
    useLazyGetAllCollectionsQuery,
    useLazyGetCollectionByIdQuery,
    useLazyGetCollectionsByUserIdQuery,
    useCreateCollectionMutation,
    useDeleteCollectionByIdMutation,
    useUpdateCollectionByIdMutation,
} = collectionApiSlice;
