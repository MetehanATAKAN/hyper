import React from 'react';
import { NewInput, NewTextArea } from '../../../../../components/GlobalNew/Inputs';
import { MultipleSelects, SingleSelects } from '../../../../../components/GlobalNew/Selects';

const MaterialService = ({ materialServiceModalProps, materialServiceModalStatus }) => {
    return (
        <div>
            <NewInput
                width={'100%'}
                value={materialServiceModalProps[0].state}
                setValue={materialServiceModalProps[0].setState}
                placeholder="materials or services"
                label="materials or services"
                status={materialServiceModalStatus[0].status}
                isStar={true}
            />
            <NewInput
                placeholder="abbreviation"
                width={'100%'}
                value={materialServiceModalProps[1].state}
                setValue={materialServiceModalProps[1].setState}
                status={materialServiceModalStatus[1].status}
                label="abbreviation"
                isStar={true}
            />
            <NewTextArea
                value={materialServiceModalProps[2].state}
                setValue={materialServiceModalProps[2].setState}
                status={materialServiceModalStatus[2].status}
                label="description"
                placeholder="description"
                isStar={true}
            />
            <hr />
            <MultipleSelects
                label="materials or services type"
                selectedItems={materialServiceModalProps[3].state}
                setSelectedItems={materialServiceModalProps[3].setState}
                options={materialServiceModalProps[3].options}
                width="100%"
            />
            <hr />
            <SingleSelects
                label="main category"
                isStar={true}
                selectedItems={materialServiceModalProps[4].state}
                setSelectedItems={materialServiceModalProps[4].setState}
                options={materialServiceModalProps[4].options}
                status={materialServiceModalStatus[3].status}
                width="100%"
            />
            <MultipleSelects
                label="category"
                isStar={true}
                selectedItems={materialServiceModalProps[5].state}
                setSelectedItems={materialServiceModalProps[5].setState}
                options={materialServiceModalProps[5].options}
                status={materialServiceModalStatus[4].status}
                width="100%"
            />
            <MultipleSelects
                label="category sub 1"
                selectedItems={materialServiceModalProps[6].state}
                setSelectedItems={materialServiceModalProps[6].setState}
                options={materialServiceModalProps[6].options}
                width="100%"
            />
            <MultipleSelects
                label="category sub 2"
                selectedItems={materialServiceModalProps[7].state}
                setSelectedItems={materialServiceModalProps[7].setState}
                options={materialServiceModalProps[7].options}
                width="100%"
            />
            <MultipleSelects
                label="category sub 3"
                selectedItems={materialServiceModalProps[8].state}
                setSelectedItems={materialServiceModalProps[8].setState}
                options={materialServiceModalProps[8].options}
                width="100%"
            />
        </div>
    );
};

export default MaterialService;
