import React from 'react';
import { NewInput, NewTextArea } from '../../../../../components/GlobalNew/Inputs';
import { SingleSelects } from '../../../../../components/GlobalNew/Selects';

const Category = (props) => {
    const { categoryModalProps, categoryModalStatus } = props;
    return (
        <div>
            <NewInput
                width={'100%'}
                value={categoryModalProps[0].state}
                setValue={categoryModalProps[0].setState}
                placeholder="category"
                label="category"
                status={categoryModalStatus[0].status}
                isStar={true}
            />
            <NewInput
                placeholder="abbreviation"
                width={'100%'}
                value={categoryModalProps[1].state}
                setValue={categoryModalProps[1].setState}
                status={categoryModalStatus[1].status}
                label="abbreviation"
                isStar={true}
            />
            <NewTextArea
                value={categoryModalProps[2].state}
                setValue={categoryModalProps[2].setState}
                status={categoryModalStatus[2].status}
                label="description"
                placeholder="description"
                isStar={true}
            />
            <hr />
            <SingleSelects
                label="main category"
                isStar={true}
                selectedItems={categoryModalProps[3].state}
                setSelectedItems={categoryModalProps[3].setState}
                options={categoryModalProps[3].options}
                status={categoryModalStatus[3].status}
                width="100%"
            />
        </div>
    );
};

export default Category;
