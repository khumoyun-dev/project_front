import React, { memo } from 'react';

import CollectionsSection from '../components/CollectionsSection/CollectionsSection';
import ItemsSection from '../components/ItemsSection/ItemsSection';
import TagsSection from '../components/TagsSection/TagsSection';
import SignUpSection from '../components/SignUpSection/SignUpSection';

import { useAppSelector } from '../hooks/useRedux';

function HomePage() {
    const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

    return (
        <div className="content pt-0 pb-0">
            <CollectionsSection />
            <ItemsSection />
            <TagsSection />
            {!isLoggedIn && <SignUpSection />}
        </div>
    );
}

export default memo(HomePage);
