import { mdiArrowCollapse, mdiArrowExpand } from '@mdi/js';
import Icon from '@mdi/react';
import React, { useEffect, useState } from 'react';
import { AutoCompleteInput } from '../../../../../components/GlobalNew/Inputs';
import { MultipleSelects, SingleSelects } from '../../../../../components/GlobalNew/Selects';
import '../../../../../assets/scss/custom/Material/materialModal.scss';

const MaterialType = ({ materialTypeModalProps, materialTypeModalStatus }) => {
    const [arrow, setArrow] = useState(false);
    return (
        <div>
            <AutoCompleteInput
                placeholder="material or service type"
                width={'100%'}
                value={materialTypeModalProps[0].state}
                setValue={materialTypeModalProps[0].setState}
                status={materialTypeModalStatus[0].status}
                label="material or service type"
                options={materialTypeModalProps[1].options}
                isStar={true}
            />
            <hr />
            {arrow === true && (
                <>
                    <SingleSelects
                        label="main category"
                        selectedItems={materialTypeModalProps[2].state}
                        setSelectedItems={materialTypeModalProps[2].setState}
                        options={materialTypeModalProps[2].options}
                        width="100%"
                    />
                    <MultipleSelects
                        label="category"
                        selectedItems={materialTypeModalProps[3].state}
                        setSelectedItems={materialTypeModalProps[3].setState}
                        options={materialTypeModalProps[3].options}
                        width="100%"
                    />
                    <MultipleSelects
                        label="category sub 1"
                        selectedItems={materialTypeModalProps[4].state}
                        setSelectedItems={materialTypeModalProps[4].setState}
                        options={materialTypeModalProps[4].options}
                        width="100%"
                    />
                    <MultipleSelects
                        label="category sub 2"
                        selectedItems={materialTypeModalProps[5].state}
                        setSelectedItems={materialTypeModalProps[5].setState}
                        options={materialTypeModalProps[5].options}
                        width="100%"
                    />
                    <MultipleSelects
                        label="category sub 3"
                        selectedItems={materialTypeModalProps[6].state}
                        setSelectedItems={materialTypeModalProps[6].setState}
                        options={materialTypeModalProps[6].options}
                        width="100%"
                    />
                </>
            )}
            <MultipleSelects
                label="materials or services"
                selectedItems={materialTypeModalProps[7].state}
                setSelectedItems={materialTypeModalProps[7].setState}
                options={materialTypeModalProps[7].options}
                width="100%"
                isIcon={true}
                icon={
                    <Icon
                        path={arrow ? mdiArrowCollapse : mdiArrowExpand}
                        title="arrow expand"
                        size={0.8}
                        horizontal
                        vertical
                        className="material-type-add-arrow-expand"
                        onClick={() => setArrow(!arrow)}
                    />
                }
            />
        </div>
    );
};

export default MaterialType;
