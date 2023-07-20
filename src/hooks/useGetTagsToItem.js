import { useEffect } from 'react';
import { useLazyGetTagsByItemIdQuery } from '../redux/api/tagApiSlice';
import { setTagsFromInput, setTagsToItem } from '../redux/slices/tagSlice';
import { useAppDispatch, useAppSelector } from './useRedux';

const useGetTagsToItem = () => {
    const selectedItem = useAppSelector((state) => state.item.selectedItem);
    const [getTagsToItem, { data: tags }] = useLazyGetTagsByItemIdQuery();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (selectedItem) {
            (async () => {
                await getTagsToItem(selectedItem._id);
            })();
        }
    }, [selectedItem]);

    useEffect(() => {
        if (tags) {
            dispatch(setTagsToItem(tags));
            const modifiedTags = tags.map((tag) => ({
                value: tag._id,
                label: tag.label,
            }));
            dispatch(setTagsFromInput(modifiedTags));
        }
    }, [tags]);

    return { tags };
};

export default useGetTagsToItem;
