import { useEffect, useState } from 'react';
import { useGetAllTagsQuery } from '../redux/api/tagApiSlice';
import { setAllTags, setPopularTags } from '../redux/slices/tagSlice';
import { useAppDispatch } from './useRedux';

const useGetAllTags = () => {
    const [tagsOptions, setTagOptions] = useState([]);
    const dispatch = useAppDispatch();

    const {
        data: tags,
        isSuccess: isSuccessGetAllTags,
        isLoading: isGetAllTagsLoading,
        refetch,
    } = useGetAllTagsQuery();

    useEffect(() => {
        if (tags && isSuccessGetAllTags) {
            dispatch(setAllTags(tags));
            const modifiedTags = tags.map((tag) => ({
                value: tag._id,
                label: tag.label,
            }));
            setTagOptions(modifiedTags);
            const popularTags = [...tags]
                .sort((a, b) => b.items.length - a.items.length)
                .slice(0, 12);
            dispatch(setPopularTags(popularTags));
        }
    }, [tags]);

    useEffect(() => {
        refetch();
    }, []);

    return { tagsOptions, isGetAllTagsLoading };
};

export default useGetAllTags;
