import React from 'react';
import { useTranslation } from 'react-i18next';
import CollectionCard from '../../components/CollectionCard/CollectionCard';
import EmptyContainer from '../../components/EmptyContainer/EmptyContainer';

function CollectionCardsContainer({ collections }) {
    const { t } = useTranslation('translation');

    return (
        <>
            <div className='grid grid-cols-[repeat(auto-fill,285px)] gap-15 items-start content-start justify-around'>
                {collections &&
                    collections.map((collection) => (
                        <CollectionCard key={collection._id} collection={collection} />
                    ))}
            </div>
            {collections?.length === 0 && (
                <EmptyContainer title={t('filter.noCollectionsResult')} text="" />
            )}
        </>
    );
}

export default CollectionCardsContainer;
