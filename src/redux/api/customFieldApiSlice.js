import { Endpoints, Methods } from '../../js/enums';
import apiSlice from './apiSlice';

const customFieldApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCustomFieldById: builder.query({
            queryFn: (fieldId) => ({
                url: `${Endpoints.customFields}${fieldId}`,
                method: Methods.get,
            }),
            providesTags: ['CustomField'],
        }),

        getCustomFieldsByCollectionId: builder.query({
            queryFn: (collectionId) => ({
                url: `${Endpoints.customFieldsInCollection}${collectionId}`,
                method: Methods.get,
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.map((customField) => ({
                            type: 'CustomField',
                            id: customField._id,
                        })),
                        'CustomField',
                    ]
                    : ['CustomField'],
        }),

        createCustomField: builder.mutation({
            queryFn: (body) => ({
                url: `${Endpoints.customFields}`,
                method: Methods.post,
                headers: {
                    'Content-type': 'application/json',
                    accept: 'application/json',
                },
                body,
            }),
            invalidatesTags: ['CustomField'],
        }),

        deleteCustomFieldById: builder.mutation({
            queryFn: (fieldId) => ({
                url: `${Endpoints.customFields}${fieldId}`,
                method: Methods.delete,
                headers: {
                    'Content-type': 'application/json',
                    accept: 'application/json',
                },
            }),
            invalidatesTags: ['CustomField'],
        }),

        updateCustomFieldById: builder.mutation({
            queryFn: ({ fieldId, body }) => ({
                url: `${Endpoints.customFields}${fieldId}`,
                method: Methods.put,
                headers: {
                    'Content-type': 'application/json',
                    accept: 'application/json',
                },
                body,
            }),
            invalidatesTags: ['CustomField'],
        }),
    }),
});

export const {
    useLazyGetCustomFieldByIdQuery,
    useLazyGetCustomFieldsByCollectionIdQuery,
    useCreateCustomFieldMutation,
    useDeleteCustomFieldByIdMutation,
    useUpdateCustomFieldByIdMutation,
} = customFieldApiSlice;
