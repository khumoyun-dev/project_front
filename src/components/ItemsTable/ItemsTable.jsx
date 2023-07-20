import React, { useState } from 'react';
import { Image, Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { FaHeart } from 'react-icons/fa';
import { MdClose, MdDone } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';

import { setCustomFieldsValues, setSelectedItem } from '../../redux/slices/itemSlice';

import { defaultInputTypes } from '../../utils/constants';
import { formatDate } from '../../utils/functions';

import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';

import ColumnSorting from './ColumnSorting/ColumnSorting';

function ItemsTable({ items }) {
    const [activeAscSorting, setActiveAscSorting] = useState('');
    const [activeDescSorting, setActiveDescSorting] = useState('');
    const { t } = useTranslation('translation', { keyPrefix: 'collectionPage' });
    const defaultItemsTableHeadings = ['#', 'image', 'name', 'date'];
    const fieldsInCollection = useAppSelector((state) => state.item.customFieldsInItem);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const selectItem = (itemId) => {
        const selectedItem = items.find((item) => item._id === itemId);
        if (selectedItem) {
            dispatch(setSelectedItem(selectedItem));
            const itemFieldsValues = selectedItem
                ? [...selectedItem.customFields].map((field) => field.value)
                : [];
            dispatch(setCustomFieldsValues(itemFieldsValues));
            navigate(`/items/${itemId}`);
        }
    };

    return (
        <div>
            <Table responsive className="text-black">
                <thead>
                    <tr>
                        {defaultItemsTableHeadings.map((heading) => (
                            <th key={v4()}>{t(heading)}</th>
                        ))}
                        <th className="likes">
                            {t('likes')} <FaHeart />
                        </th>
                        {fieldsInCollection &&
                            fieldsInCollection.map((field) => (
                                <th key={v4()}>
                                    <span className="d-flex align-items-start gap-1">
                                        {field.label}{' '}
                                        <ColumnSorting
                                            items={items}
                                            field={field}
                                            activeAsc={activeAscSorting}
                                            setActiveAsc={setActiveAscSorting}
                                            activeDesc={activeDescSorting}
                                            setActiveDesc={setActiveDescSorting}
                                        />
                                    </span>
                                </th>
                            ))}
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={item._id} onClick={() => selectItem(item._id)}>
                            <td>{index + 1}</td>
                            <td className="position-relative">
                                <div className="loading-skeleton position-absolute" />
                                <Image src={item.itemImage} className="avatar position-absolute" />
                                <p className="imagePlaceholder">itemImage</p>
                            </td>
                            <td>{item.itemName}</td>
                            <td>{formatDate(item.createdAt)}</td>
                            <td>{item.likes.length}</td>
                            {item.customFields.map((field) => (
                                <td key={field.customFieldId}>
                                    {defaultInputTypes.includes(field.type) && (`${field.value}` || '⎯')}
                                    {field.type === 'text' && (
                                        <MDEditor.Markdown
                                            source={field.value || '⎯'}
                                            className="transition duration-200 ease-in-out bg-primary-color"
                                        />
                                    )}
                                    {field.type === 'checkbox' &&
                                        (field.value === 'true' ? (
                                            <div className="checkboxTrue">
                                                <MdDone />
                                            </div>
                                        ) : (
                                            <MdClose />
                                        ))}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default ItemsTable;
