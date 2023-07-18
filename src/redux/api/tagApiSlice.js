import { Endpoints, Methods } from '../../js/enums';
import apiSlice from './apiSlice';

const tagApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllTags: builder.query({
            queryFn: () => ({
                url: `${Endpoints.tags}`,
                method: Methods.get,
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.map((tag) => ({
                            type: 'Tag',
                            id: tag._id,
                        })),
                        'Tag',
                    ]
                    : ['Tag'],
        }),

        getTagById: builder.query({
            queryFn: (tagId) => ({
                url: `${Endpoints.tags}${tagId}`,
                method: Methods.get,
            }),
            providesTags: ['Tag'],
        }),

        getTagsByItemId: builder.query({
            queryFn: (itemId) => ({
                url: `${Endpoints.tagsToItem}${itemId}`,
                method: Methods.get,
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.map((tag) => ({
                            type: 'Tag',
                            id: tag._id,
                        })),
                        'Tag',
                    ]
                    : ['Tag'],
        }),

        createTag: builder.mutation({
            queryFn: (body) => ({
                url: `${Endpoints.tags}`,
                method: Methods.post,
                headers: {
                    'Content-type': 'application/json',
                    accept: 'application/json',
                },
                body,
            }),
            invalidatesTags: ['Tag'],
        }),

        updateTagById: builder.mutation({
            queryFn: ({ tagId, body }) => ({
                url: `${Endpoints.tags}${tagId}`,
                method: Methods.put,
                headers: {
                    'Content-type': 'application/json',
                    accept: 'application/json',
                },
                body,
            }),
            invalidatesTags: ['Tag'],
        }),
    }),
});

export const {
    useLazyGetTagByIdQuery,
    useLazyGetAllTagsQuery,
    useLazyGetTagsByItemIdQuery,
    useGetAllTagsQuery,
    useCreateTagMutation,
    useUpdateTagByIdMutation,
} = tagApiSlice;
