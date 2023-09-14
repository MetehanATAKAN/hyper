import React, { useState } from 'react';
import { SingleSelects } from '../../../../components/GlobalNew/Selects';
import { InputDefault, TextArea } from '../../../../components/FormElements/Input';
import { Divider } from '../../../../components/FormElements/Divider';
import { useTranslation } from 'react-i18next';
const General = () => {
    const { t } = useTranslation();

    const [processName, setProcessName] = useState('');
    const [description, setDescription] = useState('');

    const [ownerDepartment, setOwnerDepartment] = useState();
    const [ownerDepartmentOptions, setOwnerDepartmentOptions] = useState([]);

    const [priorty, setPriorty] = useState([]);
    const [priortyOptions, setPriortyOptions] = useState([
        {
            value: 0,
            label: 'Low',
        },
        {
            value: 1,
            label: 'Medium',
        },
        {
            value: 2,
            label: 'High',
        },
    ]);

    const [isRecurrency, setIsRecurrency] = useState();
    const [recurrencyOptions, setRecurrencyOptions] = useState([
        {
            value: 0,
            label: 'Yes',
        },
        {
            value: 1,
            label: 'No',
        },
    ]);

    const [processType, setProcessType] = useState();
    const [processTypeOptions, setProcessTypeOptions] = useState([]);

    const [mainProcess, setMainProcess] = useState();
    const [mainProcessOptions, setMainProcessOptions] = useState([]);

    const [businessProcess, setBusinessProcess] = useState([]);
    const [businessProcessOptions, setBusinessProcessOptions] = useState([]);
    const [onClick, setOnClick] = useState(false);

    const [errorModal, setErrorModal] = useState(false);

    return (
        <div className="brochure-general">
            <div className="general-process-card">
                <InputDefault
                    label={t('process name')}
                    value={processName}
                    setValue={setProcessName}
                    isStar={true}
                    placeholder="process name"
                    isUpperCase={true}
                />

                <TextArea
                    label={t('description')}
                    value={description}
                    setValue={setDescription}
                    isStar={true}
                    placeholder="description"
                />

                <div style={{ display: 'flex', columnGap: '16px', width: '100%' }}>
                    <SingleSelects
                        label={'process owner department'}
                        width={'100%'}
                        options={ownerDepartmentOptions}
                        selectedItems={ownerDepartment}
                        setSelectedItems={setOwnerDepartment}
                        isStar={true}
                    />

                    <SingleSelects
                        label={'priorty'}
                        width={'100%'}
                        options={priortyOptions}
                        selectedItems={priorty}
                        setSelectedItems={setPriorty}
                        isStar={true}
                    />

                    <SingleSelects
                        label={'is recurrency'}
                        width={'100%'}
                        options={recurrencyOptions}
                        selectedItems={isRecurrency}
                        setSelectedItems={setIsRecurrency}
                        isStar={true}
                    />
                </div>
                <Divider title={t('connection')} plain={true} />
                <div style={{ display: 'flex', columnGap: '16px', width: '100%' }}>
                    <SingleSelects
                        label={'process & project type'}
                        width={'100%'}
                        options={processTypeOptions}
                        selectedItems={processType}
                        setSelectedItems={setProcessType}
                        isStar={true}
                    />

                    <SingleSelects
                        label={'main process'}
                        width={'100%'}
                        options={mainProcessOptions}
                        selectedItems={mainProcess}
                        setSelectedItems={setMainProcess}
                        isStar={true}
                    />

                    <SingleSelects
                        label={'business process'}
                        width={'100%'}
                        options={businessProcessOptions}
                        selectedItems={businessProcess}
                        setSelectedItems={setBusinessProcess}
                        isStar={true}
                    />
                </div>
            </div>
        </div>
    );
};

export default General;
