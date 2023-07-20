import React from 'react';
import { useNavigate } from 'react-router-dom';

import { setSelectedItem } from '../../redux/slices/itemSlice';

import ItemCard from '../../components/ItemCard/ItemCard';

import { useAppDispatch } from '../../hooks/useRedux';

function ItemCardsContainer({ items }) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const selectItem = (item) => {
        dispatch(setSelectedItem(item));
        navigate(`/items/${item._id}`);
    };

    return (
        <div className="flex flex-col gap-3 items-center w-full">
            {items.map((item) => (
                <span
                    key={item._id}
                    onClick={() => selectItem(item)}
                    className="cursor-pointer link"
                    aria-hidden="true"
                >
                    <div className="transition-hover:transform-hover:scale-101 hover:shadow-hoverShadow">
                        <ItemCard item={item} />
                    </div>
                </span>
            ))}
        </div>
    );

}

export default ItemCardsContainer;
