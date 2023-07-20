import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { CSVLink } from 'react-csv';
import { useTranslation } from 'react-i18next';

import { formatDate } from '../../utils/functions';

import { useAppSelector } from '../../hooks/useRedux';

function CsvButton() {
    const { t } = useTranslation('translation');
    const [csvHeadings, setCsvHeadings] = useState([]);
    const [csvTableValues, setCsvTableValues] = useState([]);
    const selectedCollection = useAppSelector(
        (state) => state.collection.selectedCollection
    );
    const customFieldsInCollection = useAppSelector(
        (state) => state.item.customFieldsInItem
    );
    const items = useAppSelector((state) => state.item.itemsInCollection);

    useEffect(() => {
        if (customFieldsInCollection) {
            const defaultItemsTableHeadings = [
                'num',
                'Item name',
                'Creation date & time',
                'Likes',
            ];
            const customFieldsLabels = customFieldsInCollection.map((field) => field.label);
            const headings = [...defaultItemsTableHeadings, ...customFieldsLabels];
            setCsvHeadings(headings);
        }
    }, [customFieldsInCollection]);

    useEffect(() => {
        if (items) {
            const defaultTableValues = items.map((item, index) => ({
                num: `${index + 1}`,
                'Item name': item.itemName,
                'Creation date & time': formatDate(item.createdAt),
                Likes: `${item.likes.length}`,
            }));
            const customFieldsValues = items.map((item) =>
                item.customFields.map((field) => ({ [field.label]: field.value }))
            );
            const flatValues = customFieldsValues.map((arr) => Object.assign({}, ...arr));
            const csvValues = defaultTableValues.map((tableRow, index) => ({
                ...tableRow,
                ...flatValues[index],
            }));
            setCsvTableValues(csvValues);
        }
    }, [items]);

    return (
        <Button className="secondary-button mt-2">
            <CSVLink
                headers={csvHeadings}
                data={csvTableValues}
                filename={`${selectedCollection?.title}-items-list.csv`}
                enclosingCharacter=" "
                className="text-black no-underline transition duration-200 ease-in-out hover:opacity-80 active:text-button-color"
            >
                {t('collectionPage.csv')}
            </CSVLink>
        </Button>
    );
}

export default CsvButton;
