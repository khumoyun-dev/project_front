// import { TFunction } from 'i18next';

const parseJwt = tokenToParse => {
    const base64Url = tokenToParse.split(".")[1]
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
    const jsonPayload = decodeURIComponent(
        window
            .atob(base64)
            .split("")
            .map(c => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
            .join("")
    )

    return JSON.parse(jsonPayload)
}


const checkToken = userToken => {
    try {
        const parsedToken = parseJwt(userToken)
        const nowTimestamp = Math.floor(Date.now() / 1000)
        if (!parsedToken.isBlocked && parsedToken.exp > nowTimestamp) {
            return parsedToken.id
        }
        return false
    } catch (error) {
        return false
    }
}

const formatDate = (stringDate) => {
    const timestamp = Date.parse(stringDate);
    const date = new Date(timestamp);
    return date.toLocaleString('ru-RU');
};

const createImage = (type, value1, value2) => {
    return `https://source.boringavatars.com/${type}/120/${encodeURIComponent(value1 || '')}%20${encodeURIComponent(value2 || '')}?colors=F97D58,CDDCEB,F9DBCF,33B99,5D70C5&square`;
};


const formatDateAndTime = (elem, t, text) => {
    if (elem) {
        const formattedDate = formatDate(elem.createdAt);
        return `${formattedDate.slice(0, 10)} ${t(text)} ${formattedDate.slice(12)}`;
    }
    return '';
};

const filterUsersByRole = (filteringList) =>
    filteringList?.filter((user) => user.roles.includes('admin'));

const filterUsersByStatus = (filteringList) =>
    filteringList?.filter((user) => user.isBlocked);



const sortData = (sortType, userData, collectionData, itemData) => {
    const data = userData || collectionData || itemData;
    if (data) {
        switch (sortType) {
            case 'fromLessToMore':
                if (collectionData) {
                    return [...data].sort((a, b) => a.itemsQuantity - b.itemsQuantity);
                }
                if (itemData) {
                    return [...data].sort((a, b) => a.likes.length - b.likes.length);
                }
                break;
            case 'fromMoreToLess':
                if (collectionData) {
                    return [...data].sort((a, b) => b.itemsQuantity - a.itemsQuantity);
                }
                if (itemData) {
                    return [...data].sort((a, b) => b.likes.length - a.likes.length);
                }
                break;
            case 'fromAtoZ':
                if (userData) {
                    return [...data].sort((a, b) => (a.username > b.username ? 1 : -1));
                }
                if (collectionData) {
                    return [...data].sort((a, b) => (a.title > b.title ? 1 : -1));
                }
                if (itemData) {
                    return [...data].sort((a, b) => (a.itemName > b.itemName ? 1 : -1));
                }
                break;
            case 'fromZtoA':
                if (userData) {
                    return [...data].sort((a, b) => (a.username < b.username ? 1 : -1));
                }
                if (collectionData) {
                    return [...data].sort((a, b) => (a.title < b.title ? 1 : -1));
                }
                if (itemData) {
                    return [...data].sort((a, b) => (a.itemName < b.itemName ? 1 : -1));
                }
                break;
            case 'fromOldToNew':
                return [...data].sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt));
            case 'fromNewToOld':
            default:
                return [...data].sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
        }
    }
    return data;
};



export {
    createImage,
    checkToken,
    formatDate,
    filterUsersByRole,
    filterUsersByStatus,
    formatDateAndTime,
    sortData
}