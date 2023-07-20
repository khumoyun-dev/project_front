import { useEffect } from 'react';
import { useLazyGetCollectionsByUserIdQuery } from '../redux/api/collectionApiSlice';
import { setCollectionsByUser } from '../redux/slices/collectionSlice';
import { setDefaultCollectionsByUserFilters } from '../redux/slices/filterSlice';
import { setDefaultCollectionsByUserSorting } from '../redux/slices/sortSlice';

import { useAppDispatch } from './useRedux';

const useCollectionsByUser = (user) => {
    const dispatch = useAppDispatch();

    const [
        getCollectionsByUser,
        { data: collections, isSuccess: isSuccessGetCollections, isLoading: isGetCollectionsLoading },
    ] = useLazyGetCollectionsByUserIdQuery();

    useEffect(() => {
        const fetchCollections = async () => {
            if (user) {
                await getCollectionsByUser(user._id);
            }
        };
        fetchCollections();
    }, [user]);

    useEffect(() => {
        if (collections && isSuccessGetCollections) {
            dispatch(setCollectionsByUser(collections));
        }
    }, [collections]);

    useEffect(() => {
        return () => {
            dispatch(setDefaultCollectionsByUserFilters());
            dispatch(setDefaultCollectionsByUserSorting());
        };
    }, [dispatch]);

    return { collections, isGetCollectionsLoading };
};

export default useCollectionsByUser;
