import React from 'react';
import { NewInput, NewTextArea } from '../../../../../components/GlobalNew/Inputs';
import { MultipleSelects, SingleSelects } from '../../../../../components/GlobalNew/Selects';

const Category1 = ({ category1ModalProps, category1ModalStatus }) => {
    return (
        <div>
            <NewInput
                width={'100%'}
                value={category1ModalProps[0].state}
                setValue={category1ModalProps[0].setState}
                placeholder="category sub 1"
                label="category sub 1"
                status={category1ModalStatus[0].status}
                isStar={true}
            />
            <NewInput
                placeholder="abbreviation"
                width={'100%'}
                value={category1ModalProps[1].state}
                setValue={category1ModalProps[1].setState}
                status={category1ModalStatus[1].status}
                label="abbreviation"
                isStar={true}
            />
            <NewTextArea
                value={category1ModalProps[2].state}
                setValue={category1ModalProps[2].setState}
                status={category1ModalStatus[2].status}
                label="description"
                placeholder="description"
                isStar={true}
            />
            <hr />
            <SingleSelects
                label="main category"
                isStar={true}
                selectedItems={category1ModalProps[3].state}
                setSelectedItems={category1ModalProps[3].setState}
                options={category1ModalProps[3].options}
                status={category1ModalStatus[3].status}
                width="100%"
            />
            <MultipleSelects
                label="category"
                isStar={true}
                selectedItems={category1ModalProps[4].state}
                setSelectedItems={category1ModalProps[4].setState}
                options={category1ModalProps[4].options}
                status={category1ModalStatus[4].status}
                width="100%"
            />
        </div>
    );
};

export default Category1;
