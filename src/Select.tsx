import { Dropdown, DropdownMenuItemType, IDropdownOption, IDropdownStyles } from '@fluentui/react';
import React, { useCallback } from 'react';

const dropdownStyles: Partial<IDropdownStyles> = { dropdown: { width: "100%" } };

const dropdownControlledExampleOptions = [
    { key: 'fruitsHeader', text: 'Fruits', itemType: DropdownMenuItemType.Header },
    { key: 'apple', text: 'Apple' },
    { key: 'banana', text: 'Banana' },
    { key: 'orange', text: 'Orange', disabled: true },
    { key: 'grape', text: 'Grape' },
    { key: 'divider_1', text: '-', itemType: DropdownMenuItemType.Divider },
    { key: 'vegetablesHeader', text: 'Vegetables', itemType: DropdownMenuItemType.Header },
    { key: 'broccoli', text: 'Broccoli' },
    { key: 'carrot', text: 'Carrot' },
    { key: 'lettuce', text: 'Lettuce' },
];

const SelectEditor = (
    props: {
        onCommit: (value: any, e: any) => void,
        onRevert: (value: any, e: any) => void
    }) => {
    const [selectedItem, setSelectedItem] = React.useState<IDropdownOption>();
    const onChange = (event:any, item?: IDropdownOption): void => {
        props.onCommit(item?.key, event);
        setSelectedItem(item);
    };

    return <Dropdown
        selectedKey={selectedItem ? selectedItem.key : undefined}
        onChange={onChange}
        options={dropdownControlledExampleOptions}
        styles={dropdownStyles}
    />
};

export default SelectEditor;
