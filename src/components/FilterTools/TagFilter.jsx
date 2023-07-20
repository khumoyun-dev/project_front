import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { GrFormClose } from 'react-icons/gr';
import ReactSelect from 'react-select';
import clsx from 'clsx';

import { setFilterTag, setItemsFilteredByTag } from '../../redux/slices/filterSlice';

import { selectStyles } from '../../utils/constants';

import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';

function TagFilter() {
    const { t } = useTranslation('translation', { keyPrefix: 'filter' });
    const dispatch = useAppDispatch();
    const allTags = useAppSelector((state) => state.tag.allTags);
    const filterTag = useAppSelector((state) => state.filter.filterTag);
    const allItems = useAppSelector((state) => state.search.allItems);
    const tagOptions =
        allTags?.map((tag) => ({
            value: tag._id,
            label: tag.label,
        })) || [];

    const getValueFromOption = (value) =>
        value ? tagOptions.find((option) => option.value === value.value) : null;

    useEffect(() => {
        if (filterTag && allItems && allTags) {
            const tag = allTags.find((elem) => elem._id === filterTag);
            if (tag) {
                const filteredItems = allItems.filter((item) => tag.items.includes(item._id));
                dispatch(setItemsFilteredByTag(filteredItems));
            }
        }
    }, [filterTag]);

    const resetFilterTag = () => {
        dispatch(setFilterTag(''));
        dispatch(setItemsFilteredByTag([]));
    };

    return (
        <div className={clsx('tagFilterWrapper flex ml-[-16px]')}>
            <button
                type="button"
                onClick={resetFilterTag}
                className={clsx('resetCollectionsFilter bg-transparent border-none text-sm p-1')}
            >
                <GrFormClose />
            </button>
            <ReactSelect
                options={tagOptions}
                placeholder={t('tagPlaceholder')}
                value={getValueFromOption(tagOptions.find((option) => option.value === filterTag))}
                onChange={(value) => dispatch(setFilterTag(value?.value || ''))}
                styles={selectStyles}
                className={clsx('react-select-container tagFilter w-[270px] mt-3 mb-4')}
                classNamePrefix="react-select"
                noOptionsMessage={() => `${t('noOptions')}`}
            />
        </div>
    );
}

export default TagFilter;
