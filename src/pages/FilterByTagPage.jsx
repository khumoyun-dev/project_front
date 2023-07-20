import React from 'react';
import { useTranslation } from 'react-i18next';

import EmptyContainer from '../components/EmptyContainer/EmptyContainer';
import TagFilter from '../components/FilterTools/TagFilter';
import ItemCardsContainer from '../components/ItemCardsContainer/ItemCardsContainer';

import { useAppSelector } from '../hooks/useRedux';

function FilterByTagPage() {
    const { t } = useTranslation('translation', { keyPrefix: 'searchPage' });
    const itemsFilteredByTag = useAppSelector((state) => state.filter.itemsFilteredByTag);

    return (
        <div className="content">
            <div className="d-flex justify-end">
                <TagFilter />
            </div>
            {itemsFilteredByTag.length > 0 && (
                <div className="d-flex justify-end">
                    <p>
                        {t('searchedQuantity')} {itemsFilteredByTag.length}
                    </p>
                </div>
            )}
            <div className="d-flex flex-col gap-4">
                {itemsFilteredByTag.length > 0 ? (
                    <ItemCardsContainer items={itemsFilteredByTag} />
                ) : (
                    <EmptyContainer title={t('noResults')} text="" />
                )}
            </div>
        </div>
    );
}

export default FilterByTagPage;
