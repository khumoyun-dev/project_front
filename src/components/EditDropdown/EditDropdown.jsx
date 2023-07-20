import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { BsThreeDots } from 'react-icons/bs';

function EditDropdown({ dropdownItems }) {
    return (
        <Dropdown>
            <Dropdown.Toggle className="text-textColor bg-transparent border-none transition hover:bg-backgroundSecondaryColor">
                <BsThreeDots className="transform scale-2 -mt-3" />
            </Dropdown.Toggle>
            <Dropdown.Menu className="bg-backgroundPrimaryColor border-linesColor">
                {dropdownItems.map((item) => (
                    <Dropdown.Item
                        key={item.id}
                        className="text-textColor transition hover:bg-backgroundSecondaryColor active:opacity-activeOpacity"
                        onClick={item.action}
                    >
                        {item.title}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default EditDropdown;
