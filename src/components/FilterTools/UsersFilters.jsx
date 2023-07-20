import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { AiFillLock, AiFillStar } from 'react-icons/ai';

import { setUsersFilterAdmins, setUsersFilterBlocked } from '../../redux/slices/filterSlice';

import { filterUsersByRole, filterUsersByStatus } from '../../utils/functions';

import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';

const UsersFilters = ({ allUsers, filteringList, setList }) => {
    const { t } = useTranslation('translation', { keyPrefix: 'filter' });
    const filterAdmins = useAppSelector((state) => state.filter.usersFilterAdmins);
    const filterBlocked = useAppSelector((state) => state.filter.usersFilterBlocked);
    const dispatch = useAppDispatch();

    const filterUsers = (filterFunction, usersList) => {
        const filteredUsers = filterFunction(usersList);
        dispatch(setList(filteredUsers || null));
    };

    const filterByRole = () => {
        if (!filterAdmins) {
            filterUsers(filterUsersByRole, filteringList);
        } else if (filterBlocked) {
            filterUsers(filterUsersByStatus, allUsers);
        } else {
            dispatch(setList(allUsers || null));
        }
        dispatch(setUsersFilterAdmins(!filterAdmins));
    };

    const filterByStatus = () => {
        if (!filterBlocked) {
            filterUsers(filterUsersByStatus, filteringList);
        } else if (filterAdmins) {
            filterUsers(filterUsersByRole, allUsers);
        } else {
            dispatch(setList(allUsers || null));
        }
        dispatch(setUsersFilterBlocked(!filterBlocked));
    };

    const filterUserActions = [
        {
            id: 'admins',
            inactive: 'admins',
            activeClassName: 'filterAdminsActive',
            state: filterAdmins,
            action: filterByRole,
            icon: <AiFillStar />,
        },
        {
            id: 'blocked',
            inactive: 'blocked',
            activeClassName: 'filterBlockedActive',
            state: filterBlocked,
            action: filterByStatus,
            icon: <AiFillLock />,
        },
    ];

    return (
        <div className="d-flex justify-end gap-3">
            {filterUserActions.map((action) => (
                <OverlayTrigger
                    key={action.id}
                    placement="bottom"
                    overlay={
                        <Tooltip>
                            {action.state ? `${t('noFilter')}` : `${t(action.inactive)}`}
                        </Tooltip>
                    }
                >
                    <button
                        type="button"
                        className={`filterButton ${action.id === 'admins' ? 'adminsButton' : ''
                            } ${action.state ? action.activeClassName : ''}`}
                        onClick={action.action}
                    >
                        {action.icon}
                    </button>
                </OverlayTrigger>
            ))}
        </div>
    );
};

export default UsersFilters;
