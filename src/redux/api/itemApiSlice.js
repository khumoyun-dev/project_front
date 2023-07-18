import { Endpoints, Methods } from '../../js/enums';
import apiSlice from './apiSlice';

const itemApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllItems: builder.query({
            queryFn: () => ({
                url: `${Endpoints.items}`,
                method: Methods.get,
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.map((item) => ({
                            type: 'Item',
                            id: item._id,
                        })),
                        'Item',
                    ]
                    : ['Item'],
        }),

        getItemById: builder.query({
            queryFn: (itemId) => ({
                url: `${Endpoints.items}${itemId}`,
                method: Methods.get,
            }),
            providesTags: ['Item'],
        }),

        getItemsByCollectionId: builder.query({
            queryFn: (collectionId) => ({
                url: `${Endpoints.itemsInCollection}${collectionId}`,
                method: Methods.get,
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.map((item) => ({
                            type: 'Item',
                            id: item._id,
                        })),
                        'Item',
                    ]
                    : ['Item'],
        }),

        createItem: builder.mutation({
            queryFn: (body) => ({
                url: `${Endpoints.items}`,
                method: Methods.post,
                headers: {
                    'Content-type': 'application/json',
                    accept: 'application/json',
                },
                body,
            }),
            invalidatesTags: ['Item'],
        }),

        deleteItemById: builder.mutation({
            queryFn: (itemId) => ({
                url: `${Endpoints.items}${itemId}`,
                method: Methods.delete,
                headers: {
                    'Content-type': 'application/json',
                    accept: 'application/json',
                },
            }),
            invalidatesTags: ['Item'],
        }),

        updateItemById: builder.mutation({
            queryFn: ({ itemId, body }) => ({
                url: `${Endpoints.items}${itemId}`,
                method: Methods.put,
                headers: {
                    'Content-type': 'application/json',
                    accept: 'application/json',
                },
                body,
            }),
            invalidatesTags: ['Item'],
        }),
    }),
});

export const {
    useLazyGetItemByIdQuery,
    useLazyGetAllItemsQuery,
    useLazyGetItemsByCollectionIdQuery,
    useGetAllItemsQuery,
    useCreateItemMutation,
    useDeleteItemByIdMutation,
    useUpdateItemByIdMutation,
} = itemApiSlice;
