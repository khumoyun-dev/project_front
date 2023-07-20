import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from './useRedux';
import { setSelectedUser } from '../redux/slices/adminSlice';
import { setUser } from '../redux/slices/userSlice';
import { useUpdateUserByIdMutation } from '../redux/api/userApiSlice';

const useUpdateUser = (user, setModalShown, setUpdateErrorShown) => {
    const selectedUser = useAppSelector((state) => state.admin.selectedUser);
    const dispatch = useAppDispatch();
    const updateUserByIdMutation = useUpdateUserByIdMutation();

    const submitUpdate = async (formValues) => {
        if (user) {
            const updatedUserBody = {
                ...user,
                username: formValues.username,
                email: formValues.email,
                avatar: formValues.avatar || user.avatar,
            };
            await updateUserByIdMutation.mutateAsync(updatedUserBody);
        }
    };

    useEffect(() => {
        if (updateUserByIdMutation.isError) {
            setUpdateErrorShown(true);
        }
    }, [updateUserByIdMutation.isError]);

    useEffect(() => {
        if (updateUserByIdMutation.isSuccess && !updateUserByIdMutation.isError) {
            const updatedUser = updateUserByIdMutation.data;
            if (!selectedUser) {
                dispatch(setUser(updatedUser));
            } else {
                dispatch(setSelectedUser(updatedUser));
            }
            setModalShown(false);
        }
    }, [updateUserByIdMutation.isSuccess, updateUserByIdMutation.data]);

    return { submitUpdate, isUpdateUserLoading: updateUserByIdMutation.isLoading };
};

export default useUpdateUser;
