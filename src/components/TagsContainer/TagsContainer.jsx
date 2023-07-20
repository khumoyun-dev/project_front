import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setFilterTag } from '../../redux/slices/filterSlice';

function TagsContainer({ tags }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const filterByTag = (tagId) => {
        dispatch(setFilterTag(tagId));
        navigate('/tags');
    };

    return (
        <div className="flex gap-2 flex-wrap justify-center mt-3 mb-3">
            {tags &&
                tags.length > 0 &&
                tags.map((tag) => (
                    <div
                        key={tag._id}
                        className="bg-lightColor py-1 px-2 rounded text-fontSizeSmall text-secondary-color transition cursor-pointer"
                        onClick={() => filterByTag(tag._id)}
                        aria-hidden="true"
                    >
                        {tag.label}
                    </div>
                ))}
        </div>
    );
}

export default TagsContainer;
