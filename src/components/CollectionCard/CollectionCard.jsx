import clsx from 'clsx';
import React from 'react';
import { Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { setSelectedUser } from '../../redux/slices/adminSlice';
import { setSelectedCollection } from '../../redux/slices/collectionSlice';
import {
    setCollectionsBySelectedUserThemeFilter,
    setCollectionsByUserThemeFilter,
    setCollectionsThemeFilter,
} from '../../redux/slices/filterSlice';
import { formatDateAndTime } from '../../utils/functions';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';

function CollectionCard({ collection }) {
    const isAdmin = useAppSelector((state) => state.user.isAdmin);
    const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
    const { t } = useTranslation('translation');
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const location = useLocation();
    const currentLocation = location.pathname;

    const clickOnTheme = (event) => {
        event.stopPropagation();
        switch (currentLocation) {
            case '/collections':
                dispatch(setCollectionsThemeFilter(collection.theme));
                break;
            case '/profile':
                dispatch(setCollectionsByUserThemeFilter(collection.theme));
                break;
            case '/':
                dispatch(setCollectionsThemeFilter(collection.theme));
                navigate('/collections');
                break;
            default:
                dispatch(setCollectionsBySelectedUserThemeFilter(collection.theme));
        }
    };

    return (
        <Card
            className={`h-full cursor-pointer transition-all ease-out duration-200 ${currentLocation === '/' ? 'cardHomePage:nth-child(4)' : ''} bg-backgroundPrimaryColor border-linesColor hover:transform hover:scale-110 shadow-[0_10px_13px_bg-backgorundSecondaryColor]`}

            onClick={() => {
                dispatch(setSelectedCollection(collection));
                navigate(`/collections/${collection._id}`);
            }}
        >
            <div className='w-full h-[240px] rounded'>
                <div className='w-full h-[240px] rounded absolute' />
                <Card.Img
                    alt={`${collection.title}-image`}
                    variant="top"
                    className="position-absolute"
                    src={collection.image}
                />
            </div>
            <Card.Body className="d-flex flex-column justify-content-between align-items-start gap-3">
                <div>
                    <Card.Title className='mb-0 break-words'>{collection.title}</Card.Title>
                    <Card.Link
                        className='mb-[8px] inline-block bg-primary-light px-0 py-5 rounded text-base no-underline text-textColor transition-all ease-out duration-200 hover:transform hover:scale-110 hover:opacity-[0.8] shadow-[0_10px_13px_bg-backgorundSecondaryColor]'
                        onClick={(event) => {
                            clickOnTheme(event);
                        }}
                    >
                        {t(`collections.${collection.theme}`)}
                    </Card.Link>
                </div>
                <Card.Text className='text-base'>
                    <em>
                        {t('collections.itemsQuantity')}
                        {collection.itemsQuantity}
                    </em>
                </Card.Text>
            </Card.Body>
            <Card.Footer className='border-linesColor'>
                <p className='m-0 text-xs'>
                    {t('collections.createdBy')}
                    <NavLink
                        to={isAdmin && isLoggedIn ? `/users/${collection.ownerId}` : ''}
                        className={`text-secondary transition hover:text-secondary ${isAdmin && isLoggedIn ? 'no-underline' : 'underline'}`}
                        onClick={(event) => {
                            event.stopPropagation();
                            dispatch(setSelectedUser(null));
                        }}
                    >
                        <span>{collection.ownerName}</span>
                    </NavLink>
                </p>
                <p>{formatDateAndTime(collection, t, 'collections.createdAt')}</p>
            </Card.Footer>
        </Card>
    );
}

export default CollectionCard;
