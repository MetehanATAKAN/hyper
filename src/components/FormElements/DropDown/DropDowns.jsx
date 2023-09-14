import React from 'react';
import { Dropdown } from 'antd';
import type { MenuProps } from 'antd';
type Props = {
    items: MenuProps,
    child: React.ReactNode,
    onClick: (event: React.MouseEvent<HTMLElement>) => void,
};
export const DropDowns = ({ child = <></>, items, onClick }: Props) => {
    // const items = [
    //     {
    //         key: 1,
    //         label: '1st menu item',
    //     },
    //     {
    //         key: 2,
    //         label: ' 2nd menu item',
    //         children: [
    //             {
    //                 key: 6,
    //                 label: '3rd menu item',
    //                 danger: true,
    //             },
    //             {
    //                 key: 8,
    //                 label: '4th menu item',
    //             },
    //         ],
    //     },
    //     {
    //         key: 3,
    //         label: ' 3rd menu item (disabled)',
    //         disabled: true,
    //     },
    //     {
    //         key: 4,
    //         danger: true,
    //         label: 'a danger item',
    //     },
    // ];

    // Returns the key value in the defined array

    // const onClick = ({ key }) => {
    //     console.log(`Click on item ${key}`);
    // };
    return (
        <Dropdown
            overlayClassName="custom-dropdown"
            trigger={['click']}
            menu={{
                items,
                onClick,
            }}
            dropdownRender={(menu) => <div className="dropdown-content">{menu}</div>}>
            {child}
        </Dropdown>
    );
};
