import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { useCreateItemMutation } from '../redux/api/itemApiSlice';
import { setItemCreated } from '../redux/slices/successNotificationSlice';

import { createImage } from '../utils/functions';

import useCreateTag from './useCreateTag';
import { useAppDispatch, useAppSelector } from './useRedux';
import useUpdateTagWithNewItem from './useUpdateTagWithNewItem';

const useCreateItem = (setErrorShown) => {
    const selectedCollection = useAppSelector((state) => state.collection.selectedCollection);
    const { customFieldsInItem, customFieldsValues } = useAppSelector((state) => state.item);
    const dispatch = useAppDispatch();

    const [
        createItem,
        {
            data: newItem,
            isLoading: isLoadingItemCreation,
            isSuccess: isSuccessItemCreation,
            isError: isErrorItemCreation,
        },
    ] = useCreateItemMutation();

    const { isLoadingTagCreation } = useCreateTag(newItem);
    const { isLoadingTagUpdate } = useUpdateTagWithNewItem(newItem);

    useEffect(() => {
        if (isSuccessItemCreation) {
            dispatch(setItemCreated(true));
        }
    }, [isSuccessItemCreation]);

    useEffect(() => {
        if (isErrorItemCreation) {
            setErrorShown(true);
        }
    }, [isErrorItemCreation]);

    const getItemCustomFields = () => {
        if (customFieldsInItem && customFieldsInItem.length > 0) {
            const itemCustomFields = customFieldsInItem.map((field, index) => ({
                customFieldId: field._id,
                label: field.label,
                type: field.type,
                value: customFieldsValues[index],
            }));
            return itemCustomFields;
        }
        return [];
    };

    const submitCreation = async ({ ...formValues }) => {
        if (selectedCollection) {
            const newItemParams = {
                collectionId: selectedCollection._id,
                collectionName: selectedCollection.title,
                collectionTheme: selectedCollection.theme,
                ownerId: selectedCollection.ownerId,
                ownerName: selectedCollection.ownerName,
                itemName: formValues.itemName,
                itemImage: formValues.itemImage || createImage('marble', uuidv4(), uuidv4()),
                customFields: getItemCustomFields(),
            };
            await createItem(newItemParams);
        }
    };

    const isLoadingNewItem =
        isLoadingItemCreation || isLoadingTagCreation || isLoadingTagUpdate;

    return { submitCreation, isLoadingNewItem };
};

export default useCreateItem;
