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


export {
    navLinks,
    privateLink,
    burgerMenuLinks,
    burgerMenuLinksLoggedIn
}