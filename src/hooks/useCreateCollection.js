import { useEffect } from 'react';
import { v4 } from 'uuid';
import { useCreateCollectionMutation } from '../redux/api/collectionApiSlice';
import { useCreateCustomFieldMutation } from '../redux/api/customFieldApiSlice';
import { setCollectionCreated } from '../redux/slices/successNotificationSlice';
import { createImage } from '../utils/functions';
import { useAppDispatch } from './useRedux';

const useCreateCollection = (
    currentUser,
    setCreationErrorShown,
    customFields
) => {
    const dispatch = useAppDispatch();

    const [
        createCollection,
        {
            data: newCollection,
            isLoading: isLoadingCollectionCreation,
            isSuccess: isSuccessCollectionCreation,
            isError: isErrorCollectionCreation,
        },
    ] = useCreateCollectionMutation();

    const [
        createCustomField,
        {
            isLoading: isLoadingFieldCreation,
            isSuccess: isSuccessFieldCreation,
            isError: isErrorFieldCreation,
        },
    ] = useCreateCustomFieldMutation();

    const isLoadingCreation =
        isLoadingCollectionCreation || isLoadingFieldCreation;

    const validateCustomFields = () =>
        customFields.filter((field) => field.label && field.type);

    const submitCreation = async ({ ...formValues }) => {
        const newCollectionParams = {
            title: formValues.title,
            description: formValues.description || '*(No description provided)*',
            theme: formValues.theme || 'other',
            image: formValues.image || createImage('marble', v4(), currentUser?._id),
            ownerId: currentUser?._id,
            ownerName: currentUser?.username,
        };
        await createCollection(newCollectionParams);
    };

    useEffect(() => {
        if (newCollection && isSuccessCollectionCreation) {
            const validatedCustomFields = validateCustomFields();
            const newFields = validatedCustomFields.map((newField) => ({
                type: newField.type,
                label: newField.label,
                collectionId: newCollection._id,
            }));
            if (newFields.length > 0) {
                newFields.map(async (newField) => {
                    await createCustomField(newField);
                });
            } else {
                dispatch(setCollectionCreated(true));
            }
        }
    }, [isSuccessCollectionCreation]);

    useEffect(() => {
        if (isSuccessFieldCreation) {
            dispatch(setCollectionCreated(true));
        }
    }, [isSuccessFieldCreation]);

    useEffect(() => {
        if (isErrorCollectionCreation || isErrorFieldCreation) {
            setCreationErrorShown(true);
        }
    }, [isErrorCollectionCreation, isErrorFieldCreation]);

    return {
        customFields,
        submitCreation,
        isLoadingCreation,
    };
};

export default useCreateCollection;
