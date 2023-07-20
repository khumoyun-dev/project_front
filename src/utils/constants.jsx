import React from 'react';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';
import { FaTelegramPlane } from 'react-icons/fa';
import { MeiliSearch } from 'meilisearch';
import {
    BsSortAlphaDown,
    BsSortAlphaUp,
    BsSortDown,
    BsSortNumericDown,
    BsSortNumericUp,
    BsSortUp,
} from 'react-icons/bs';



const navLinks = [
    {
        id: 'home',
        name: 'header.home',
        path: '/'
    },
    {
        id: 'collections',
        name: 'header.collections',
        path: '/collections'
    }
]

const privateLink = {
    id: 'users',
    name: 'header.users',
    path: '/users',
};

const burgerMenuLinks = [
    {
        id: 'signin',
        name: 'header.signin',
        path: '',
    },
    {
        id: 'signup',
        name: 'header.signup',
        path: '',
    },
];

const burgerMenuLinksLoggedIn = [
    {
        id: 'profile',
        name: 'header.profile',
        path: '/profile',
    },
    {
        id: 'logout',
        name: 'header.logout',
        path: '',
    },
];

const authorsContacts = [
    {
        id: "1",
        link: "https://github.com/khumoyun-dev",
        icon: <AiFillGithub />,
        title: "Khumoyun on GitHub"
    },
    {
        id: "2",
        link: "https://t.me/khumoyun_mirzaev",
        icon: <FaTelegramPlane />,
        title: "Send a message"
    },
    {
        id: "3",
        link: "https://www.linkedin.com/in/khumoyun-mirzaev/",
        icon: <AiFillLinkedin />,
        title: "Khumoyun on LinkedIn"
    },
]

const emailValidation = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;


const defaultUserFormValues = {
    username: '',
    email: '',
    password: '',
};

const defaultInputTypes = ['string', 'number', 'date'];

const customFieldsTypes = [
    'number',
    'string',
    'text',
    'date',
    'checkbox',
];

const collectionThemes = [
    'books',
    'vinyl',
    'movies',
    'comics',
    'toys',
    'flowers',
    'cosmetics',
    'antiques',
    'autographs',
    'souvenirs',
    'coins',
    'stamps',
    'calendars',
    'pictures',
    'other',
];

const selectStyles = {
    control: (base, { isFocused }) => ({
        ...base,
        border: isFocused ? '1px solid var(--primary-color)' : '',
        boxShadow: isFocused
            ? `${localStorage.getItem('app-theme') === 'light'
                ? '0 0 0 0.25rem #f9dbcf'
                : '0 0 0 0.25rem #f9dbcfb5'
            }`
            : 'none',
        '&:hover': {
            border: isFocused ? '1px solid var(--primary-color)' : '',
        },
    }),
    option: (base, { isFocused, isSelected }) => ({
        ...base,
        backgroundColor: isSelected ? 'var(--secondary-color-light)' : '',
        transition: 'all 0.2s ease-out',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: isFocused ? '#adb6c2' : '',
        },
    }),
};

const imageFileTypes = ['JPEG', 'JPG', 'PNG', 'GIF'];

const userAvatarBaseUrl = 'https://source.boringavatars.com/beam/';

const usersTableHeadings = [
    {
        id: '1',
        headingName: '#',
    },
    {
        id: '2',
        headingName: 'id',
    },
    {
        id: '3',
        headingName: 'username',
    },
    {
        id: '4',
        headingName: 'email',
    },
    {
        id: '5',
        headingName: 'createdAt',
    },
];

const defaultSortButtons = [
    {
        id: 'fromAtoZ',
        icon: React.createElement(BsSortAlphaDown),
        tooltip: 'aZ',
    },
    {
        id: 'fromZtoA',
        icon: React.createElement(BsSortAlphaUp),
        tooltip: 'zA',
    },
    {
        id: 'fromOldToNew',
        icon: React.createElement(BsSortDown),
        tooltip: 'oldNew',
    },
    {
        id: 'fromNewToOld',
        icon: React.createElement(BsSortUp),
        tooltip: 'newOld',
    },
];

const sortByItemsQuantityButtons = [
    {
        id: 'fromLessToMore',
        icon: <BsSortNumericDown />,
        tooltip: 'lessMore',
    },
    {
        id: 'fromMoreToLess',
        icon: <BsSortNumericUp />,
        tooltip: 'moreLess',
    },
];

const sortByLikesButtons = [
    {
        id: 'fromLessToMore',
        icon: <BsSortNumericDown />,
        tooltip: 'lessMoreLikes',
    },
    {
        id: 'fromMoreToLess',
        icon: <BsSortNumericUp />,
        tooltip: 'moreLessLikes',
    },
];


const meiliSearchClient = new MeiliSearch({
    host: import.meta.env.VITE_MEILISEARCH_HOST,
    apiKey: import.meta.env.VITE_MEILISEARCH_API_KEY,
});

const itemsIndex = meiliSearchClient.index('items');
const collectionsIndex = meiliSearchClient.index('collections');
const commentsIndex = meiliSearchClient.index('comments');



export {
    navLinks,
    privateLink,
    authorsContacts,
    emailValidation,
    defaultUserFormValues,
    imageFileTypes,
    userAvatarBaseUrl,
    usersTableHeadings,
    defaultSortButtons,
    sortByItemsQuantityButtons,
    sortByLikesButtons,
    collectionThemes,
    selectStyles,
    customFieldsTypes,
    burgerMenuLinks,
    burgerMenuLinksLoggedIn,
    defaultInputTypes,
    itemsIndex,
    collectionsIndex,
    commentsIndex
}