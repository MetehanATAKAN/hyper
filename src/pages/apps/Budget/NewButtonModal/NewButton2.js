import { mdiInformationOutline } from '@mdi/js';
import Icon from '@mdi/react';
import Tippy from '@tippyjs/react';
import React, { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { CustomSelect } from './NewButton';
import { AutoCompleteInput } from '../../../../components/GlobalNew/Inputs';
const NewButton2 = (props) => {
    const {
        radios,
        setRadios,
        modalDropdownStates,
        serviceMaterialInput,
        setServiceMaterialInput,
        technicalInfoInput,
        setTechnicalInfoInput,
        descriptionInput,
        setDescriptionInput,
        statusPage2,
    } = props;
    const { t } = useTranslation();
    const resetSelectedInputs = () => {
        modalDropdownStates[0].setState({
            id: 0,
            value: 'Main Category',
            label: t('Main Category'),
        });
        modalDropdownStates[1].setState({
            id: 0,
            value: 'Category',
            label: t('Category'),
        });
        modalDropdownStates[2].setState({
            id: 0,
            value: 'Category 1',
            label: t('Category Sub 1'),
        });
        modalDropdownStates[3].setState({
            id: 0,
            value: 'Category 2',
            label: t('Category Sub 2'),
        });
        modalDropdownStates[4].setState({
            id: 0,
            value: 'Category 3',
            label: t('Category Sub 3'),
        });
        modalDropdownStates[5].setState({
            id: 0,
            value: 'ServiceOrMaterial',
            label: t('Material'),
        });
        setServiceMaterialInput('');
        setTechnicalInfoInput('');
        setDescriptionInput('');
    };
    const radioClick = (e) => {
        resetSelectedInputs();
        if (Number(e.target.id) === 1) {
            setRadios({ radio1: true, radio2: false });
        }
        if (Number(e.target.id) === 2) {
            setRadios({ radio1: false, radio2: true });
        }
    };
    return (
        <>
            <Row style={{ marginBottom: '16px' }}>
                <Col>
                    <span>{t('Procurement Type')}</span>
                    <Form style={{ marginTop: '8px', color: '#6C757D', display: 'flex' }} onChange={radioClick}>
                        <Form.Check
                            style={{ marginRight: '48px' }}
                            id={1}
                            inline
                            checked={radios.radio1}
                            name="group1"
                            type="radio"
                            label={t('service or material')}
                        />
                        <Form.Check
                            id={2}
                            checked={radios.radio2}
                            inline
                            name="group1"
                            type="radio"
                            label={t('new service or material')}
                        />
                        <Tippy
                            content={t('Add a new one if there is no service or material in the list')}
                            placement="top">
                            <span style={{ marginLeft: 'auto' }}>
                                <Icon size={1} path={mdiInformationOutline} />
                            </span>
                        </Tippy>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col xs={6}>
                    <CustomSelect
                        isLabel={true}
                        label="Main Category"
                        state={modalDropdownStates[0].state}
                        setState={modalDropdownStates[0].setState}
                        options={modalDropdownStates[0].options}
                        status={statusPage2[0].status}
                    />
                </Col>
                <Col xs={6}>
                    <CustomSelect
                        isLabel={true}
                        label="Category"
                        state={modalDropdownStates[1].state}
                        setState={modalDropdownStates[1].setState}
                        options={modalDropdownStates[1].options}
                        status={statusPage2[1].status}
                    />
                </Col>
            </Row>
            <Row>
                <Col xs={6}>
                    <CustomSelect
                        isLabel={true}
                        label="Category Sub 1"
                        state={modalDropdownStates[2].state}
                        setState={modalDropdownStates[2].setState}
                        options={modalDropdownStates[2].options}
                    />
                </Col>
                <Col xs={6}>
                    <CustomSelect
                        isLabel={true}
                        label="Category Sub 2"
                        state={modalDropdownStates[3].state}
                        setState={modalDropdownStates[3].setState}
                        options={modalDropdownStates[3].options}
                    />
                </Col>
            </Row>
            <Row>
                <Col xs={6}>
                    <CustomSelect
                        isLabel={true}
                        label="Category Sub 3"
                        state={modalDropdownStates[4].state}
                        setState={modalDropdownStates[4].setState}
                        options={modalDropdownStates[4].options}
                    />
                </Col>
                <Col xs={6}>
                    {radios.radio1 === true ? (
                        <CustomSelect
                            isLabel={true}
                            label="Service or Material"
                            state={modalDropdownStates[5].state}
                            setState={modalDropdownStates[5].setState}
                            options={modalDropdownStates[5].options}
                        />
                    ) : (
                        <AutoCompleteInput
                            placeholder="material or service type"
                            width={'100%'}
                            value={serviceMaterialInput}
                            setValue={setServiceMaterialInput}
                            label="material or service type"
                            options={modalDropdownStates[5].options}
                            isStar={true}
                            labelStyle={{ marginBottom: 0 }}
                        />
                    )}
                </Col>
            </Row>
            <Col style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>{t('Technical Info')}</span>
                    <Tippy
                        content={t('Must include all information to recognize and create a proper procurement request')}
                        placement="top">
                        <span style={{ marginLeft: 'auto' }}>
                            <Icon size={1} path={mdiInformationOutline} />
                        </span>
                    </Tippy>
                </div>
                <Form.Control
                    as="textarea"
                    disabled={radios.radio2 === true ? false : true}
                    placeholder="..."
                    style={{ maxHeight: '75px', margin: 0, borderColor: '#cecece' }}
                    value={technicalInfoInput}
                    onChange={(e) => setTechnicalInfoInput(e.target.value)}
                />
            </Col>
            <Col style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>{t('description of the aim and value of this cost ?')}</span>
                    <Tippy
                        content={t('All costs must have an end goal and create added value for the company')}
                        placement="top">
                        <span style={{ marginLeft: 'auto' }}>
                            <Icon size={1} path={mdiInformationOutline} />
                        </span>
                    </Tippy>
                </div>
                <Form.Control
                    as="textarea"
                    disabled={radios.radio2 === true ? false : true}
                    placeholder="..."
                    style={{ maxHeight: '75px', margin: 0, borderColor: '#cecece' }}
                    value={descriptionInput}
                    onChange={(e) => setDescriptionInput(e.target.value)}
                />
            </Col>
        </>
    );
};

export default React.memo(NewButton2);
