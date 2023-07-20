import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { setUsers } from '../../redux/slices/adminSlice';
import { setCollections } from '../../redux/slices/collectionSlice';
import { setItems } from '../../redux/slices/itemSlice';
import {
    setCollectionsSortingType,
    setItemsSortingType,
    setUsersSortingType,
} from '../../redux/slices/sortSlice';

import { sortData } from '../../utils/functions';

import { useAppDispatch } from '../../hooks/useRedux';

function SortToolbar({
    sortingUserList,
    sortingCollectionsList,
    sortingItemsList,
    sortingType,
    sortButtons,
    setCollectionsList,
    setCollectionsSorting,
}) {
    const { t } = useTranslation('translation', { keyPrefix: 'sort' });
    const dispatch = useAppDispatch();

    const changeSortingType = (type) => {
        const sortedData = sortData(
            type,
            sortingUserList,
            sortingCollectionsList,
            sortingItemsList
        );
        if (sortingUserList) {
            dispatch(setUsersSortingType(type));
            dispatch(setUsers(sortedData || null));
        }
        if (sortingCollectionsList) {
            dispatch((setCollectionsSorting || setCollectionsSortingType)(type));
            dispatch((setCollectionsList || setCollections)(sortedData || null));
        }
        if (sortingItemsList) {
            dispatch(setItemsSortingType(type));
            dispatch(setItems(sortedData || null));
        }
    };

    return (
        <div className="flex justify-end gap-3">
            {sortButtons.map((action) => (
                <OverlayTrigger
                    key={action.id}
                    placement="bottom"
                    overlay={<Tooltip>{t(action.tooltip)}</Tooltip>}
                >
                    <button
                        type="button"
                        className={`bg-transparent border-none text-base px-5 text-textColor transition hover:text-primary-light active:opacity-activeOpacity ${sortingType === action.id ? 'text-primary' : ''}`}
                        onClick={() => changeSortingType(action.id)}
                    >
                        {action.icon}
                    </button>
                </OverlayTrigger>
            ))}
        </div>
    );
}

SortToolbar.defaultProps = {
    sortingUserList: null,
    sortingCollectionsList: null,
    sortingItemsList: null,
    setCollectionsList: setCollections,
    setCollectionsSorting: setCollectionsSortingType,
};

export default SortToolbar;
