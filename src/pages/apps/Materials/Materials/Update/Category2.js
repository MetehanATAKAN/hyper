import React from 'react';
import { NewInput, NewTextArea } from '../../../../../components/GlobalNew/Inputs';
import { MultipleSelects, SingleSelects } from '../../../../../components/GlobalNew/Selects';

const Category2 = (props) => {
    const { category2ModalProps, category2ModalStatus } = props;
    return (
        <div>
            <NewInput
                width={'100%'}
                value={category2ModalProps[0].state}
                setValue={category2ModalProps[0].setState}
                placeholder="category sub 2"
                label="category sub 2"
                status={category2ModalStatus[0].status}
                isStar={true}
            />
            <NewInput
                placeholder="abbreviation"
                width={'100%'}
                value={category2ModalProps[1].state}
                setValue={category2ModalProps[1].setState}
                status={category2ModalStatus[1].status}
                label="abbreviation"
                isStar={true}
            />
            <NewTextArea
                value={category2ModalProps[2].state}
                setValue={category2ModalProps[2].setState}
                status={category2ModalStatus[2].status}
                label="description"
                placeholder="description"
                isStar={true}
            />
            <hr />
            <SingleSelects
                label="main category"
                isStar={true}
                selectedItems={category2ModalProps[3].state}
                setSelectedItems={category2ModalProps[3].setState}
                options={category2ModalProps[3].options}
                status={category2ModalStatus[3].status}
                width="100%"
            />
            <MultipleSelects
                label="category"
                isStar={true}
                selectedItems={category2ModalProps[4].state}
                setSelectedItems={category2ModalProps[4].setState}
                options={category2ModalProps[4].options}
                status={category2ModalStatus[4].status}
                width="100%"
            />
            <MultipleSelects
                label="category sub 1"
                isStar={true}
                selectedItems={category2ModalProps[5].state}
                setSelectedItems={category2ModalProps[5].setState}
                options={category2ModalProps[5].options}
                status={category2ModalStatus[5].status}
                width="100%"
            />
        </div>
    );
};

export default Category2;
