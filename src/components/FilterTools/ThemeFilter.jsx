import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { GrFormClose } from 'react-icons/gr';
import ReactSelect from 'react-select';

import {
    setCollectionsThemeFilter,
    setDefaultCollectionsFilters,
} from '../../redux/slices/filterSlice';
import { setDefaultCollectionsSorting } from '../../redux/slices/sortSlice';

import { collectionThemes } from '../../utils/constants';

import { useAppDispatch } from '../../hooks/useRedux';

function ThemeFilter({
    allCollections,
    filteringList,
    setList,
    theme,
    setThemeFilter,
    setDefaultFilters,
    setDefaultSorting,
}) {
    const { t } = useTranslation('translation');
    const dispatch = useAppDispatch();
    const collectionThemeOptions = collectionThemes.map((value) => ({
        value,
        label: `${t(`collections.${value}`)}`,
    }));

    useEffect(() => {
        if (theme) {
            const filteredCollections = filteringList?.filter(
                (collection) => collection.theme === theme
            );
            if (filteredCollections?.length === 0) {
                const filteredAllCollections = allCollections?.filter(
                    (collection) => collection.theme === theme
                );
                dispatch(setList(filteredAllCollections || null));
                return;
            }
            dispatch(setList(filteredCollections || null));
        }
    }, [theme]);

    const resetFilters = () => {
        dispatch((setDefaultFilters || setDefaultCollectionsFilters)());
        dispatch((setDefaultSorting || setDefaultCollectionsSorting)());
        dispatch(setList(allCollections));
    };

    const getValueFromOption = (value) =>
        value ? collectionThemeOptions.find((option) => option.value === value) : '';

    return (
        <div className="flex">
            <button
                type="button"
                onClick={resetFilters}
                className="bg-transparent border-none text-base px-5 text-textColor transition hover:text-primary-light active:opacity-hoverOpacity"
            >
                <GrFormClose />
            </button>
            <ReactSelect
                options={collectionThemeOptions}
                placeholder={t('collections.themePlaceholder')}
                value={getValueFromOption(theme)}
                onChange={(value) =>
                    dispatch(
                        (setThemeFilter || setCollectionsThemeFilter)(value.value)
                    )
                }
                className="react-select-container w-270 themeFilter"
                classNamePrefix="react-select"
                noOptionsMessage={() => `${t('filter.noOptions')}`}
            />
        </div>
    );
}

ThemeFilter.defaultProps = {
    setThemeFilter: setCollectionsThemeFilter,
    setDefaultFilters: setDefaultCollectionsFilters,
    setDefaultSorting: setDefaultCollectionsSorting,
};

export default ThemeFilter;
