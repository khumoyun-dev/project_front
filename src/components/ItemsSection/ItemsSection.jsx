import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import ItemCardsContainer from '../../components/ItemCardsContainer/ItemCardsContainer';

import { useAppSelector } from '../../hooks/useRedux';

function ItemsSection() {
    const { t } = useTranslation('translation', { keyPrefix: 'home' });
    const lastAddedItems = useAppSelector((state) => state.item.lastAddedItems);

    return (
        <section className="section">
            {lastAddedItems && (
                <>
                    <h3 className="m-0 self-start">{t('lastItems')}</h3>
                    <ItemCardsContainer items={lastAddedItems} />
                </>
            )}
        </section>
    );
}

export default memo(ItemsSection);
