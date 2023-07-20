import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUpdateItemByIdMutation } from '../redux/api/itemApiSlice';
import { setSelectedItem } from '../redux/slices/itemSlice';

import useCreateTag from './useCreateTag';
import { useAppDispatch, useAppSelector } from './useRedux';
import useUpdateTag from './useUpdateTag';

const useUpdateItem = (setErrorShown) => {
    const selectedItem = useAppSelector((state) => state.item.selectedItem);
    const customFieldsValues = useAppSelector((state) => state.item.customFieldsValues);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [
        updateItem,
        {
            data: updatedItem,
            isLoading: isLoadingUpdateItem,
            isSuccess: isSuccessItemUpdate,
            isError: isErrorItemUpdate,
        },
    ] = useUpdateItemByIdMutation();

    useEffect(() => {
        if (updatedItem && isSuccessItemUpdate) {
            dispatch(setSelectedItem(updatedItem));
            navigate(-1);
        }
    }, [updatedItem]);

    const { isLoadingTagCreation } = useCreateTag(updatedItem);
    const { isLoadingTagUpdate } = useUpdateTag(updatedItem);

    useEffect(() => {
        if (isErrorItemUpdate) {
            setErrorShown(true);
        }
    }, [isErrorItemUpdate]);

    const getUpdatedCustomFields = () => {
        if (selectedItem && customFieldsValues.length > 0) {
            const itemCustomFields = selectedItem.customFields.map((field, index) => ({
                ...field,
                value: customFieldsValues[index],
            }));
            return itemCustomFields;
        }
        return [];
    };

    const submitUpdate = async ({ ...formValues }) => {
        if (selectedItem) {
            const updatedItemParams = {
                ...selectedItem,
                itemName: formValues.itemName,
                itemImage: formValues.itemImage || selectedItem.itemImage,
                customFields: getUpdatedCustomFields(),
            };
            await updateItem({ itemId: selectedItem._id, body: updatedItemParams });
        }
    };

    const isLoadingItemUpdate =
        isLoadingUpdateItem || isLoadingTagCreation || isLoadingTagUpdate;

    return { submitUpdate, isLoadingItemUpdate };
};

export default useUpdateItem;
