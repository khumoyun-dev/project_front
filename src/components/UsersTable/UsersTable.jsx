import React, { memo } from 'react';
import { OverlayTrigger, Table, Tooltip } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { AiFillLock, AiFillStar } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

import { setSelectedUser } from '../../redux/slices/adminSlice';

import { usersTableHeadings } from '../../utils/constants';
import { formatDate } from '../../utils/functions';

import { useAppDispatch } from '../../hooks/useRedux';

const UsersTable = ({ users }) => {
    const { t } = useTranslation('translation', { keyPrefix: 'usersPage' });
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const selectUser = (userId) => {
        const selectedUser = users?.find((user) => user._id === userId);
        if (selectedUser) {
            dispatch(setSelectedUser(selectedUser));
            navigate(`/users/${userId}`);
        }
    };

    return (
        <div>
            <Table responsive className="table">
                <thead>
                    <tr>
                        {usersTableHeadings.map((heading) => (
                            <th key={heading.id} className="py-2 px-4 text-left">
                                {t(heading.headingName)}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {users?.map((user, index) => (
                        <tr
                            key={user._id}
                            onClick={() => selectUser(user._id)}
                            className="cursor-pointer transition-colors hover:bg-background-secondary-color hover:active:bg-background-secondary-color"
                        >
                            <td className="py-2 px-4">{index + 1}</td>
                            <OverlayTrigger placement="right" overlay={<Tooltip>{user._id}</Tooltip>}>
                                <td className="py-2 px-4">{user._id.slice(0, 7)}...</td>
                            </OverlayTrigger>
                            <td className="py-2 px-4">
                                {user.username}
                                <OverlayTrigger placement="right" overlay={<Tooltip>{t('admin')}</Tooltip>}>
                                    {user.roles.includes('admin') && (
                                        <span className="adminIcon ml-1">
                                            <AiFillStar />
                                        </span>
                                    )}
                                </OverlayTrigger>
                                <OverlayTrigger placement="right" overlay={<Tooltip>{t('blocked')}</Tooltip>}>
                                    {user.isBlocked && (
                                        <span className="blockIcon ml-1">
                                            <AiFillLock />
                                        </span>
                                    )}
                                </OverlayTrigger>
                            </td>
                            <td className="py-2 px-4">{user.email}</td>
                            <td className="py-2 px-4">{formatDate(user.createdAt)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default memo(UsersTable);
