import React from 'react';
import { NewInput, NewTextArea } from '../../../../../components/GlobalNew/Inputs';
import { MultipleSelects, SingleSelects } from '../../../../../components/GlobalNew/Selects';

const Category3 = (props) => {
    const { category3ModalProps, category3ModalStatus } = props;
    return (
        <div>
            <NewInput
                width={'100%'}
                value={category3ModalProps[0].state}
                setValue={category3ModalProps[0].setState}
                placeholder="category sub 3"
                label="category sub 3"
                status={category3ModalStatus[0].status}
                isStar={true}
            />
            <NewInput
                placeholder="abbreviation"
                width={'100%'}
                value={category3ModalProps[1].state}
                setValue={category3ModalProps[1].setState}
                status={category3ModalStatus[1].status}
                label="abbreviation"
                isStar={true}
            />
            <NewTextArea
                value={category3ModalProps[2].state}
                setValue={category3ModalProps[2].setState}
                status={category3ModalStatus[2].status}
                label="description"
                placeholder="description"
                isStar={true}
            />
            <hr />
            <SingleSelects
                label="main category"
                isStar={true}
                selectedItems={category3ModalProps[3].state}
                setSelectedItems={category3ModalProps[3].setState}
                options={category3ModalProps[3].options}
                status={category3ModalStatus[3].status}
                width="100%"
            />
            <MultipleSelects
                label="category"
                isStar={true}
                selectedItems={category3ModalProps[4].state}
                setSelectedItems={category3ModalProps[4].setState}
                options={category3ModalProps[4].options}
                status={category3ModalStatus[4].status}
                width="100%"
            />
            <MultipleSelects
                label="category sub 1"
                isStar={true}
                selectedItems={category3ModalProps[5].state}
                setSelectedItems={category3ModalProps[5].setState}
                options={category3ModalProps[5].options}
                status={category3ModalStatus[5].status}
                width="100%"
            />
            <MultipleSelects
                label="category sub 2"
                isStar={true}
                selectedItems={category3ModalProps[6].state}
                setSelectedItems={category3ModalProps[6].setState}
                options={category3ModalProps[6].options}
                status={category3ModalStatus[6].status}
                width="100%"
            />
        </div>
    );
};

export default Category3;
