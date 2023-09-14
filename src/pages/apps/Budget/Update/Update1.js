import { mdiInformationOutline } from '@mdi/js';
import Icon from '@mdi/react';
import Tippy from '@tippyjs/react';
import React, { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import './../../../../assets/scss/custom/budget/budgetModal.scss';
import 'tippy.js/dist/tippy.css';
import Select from 'react-select';
import { forwardRef } from 'react';

export const CustomSwitch = ({ label, checked, setCheck, key, isInfo, style, disabled, tooltip = 'Tooltip' }) => {
    const { t } = useTranslation();
    return (
        <button
            disabled={disabled}
            style={style}
            className="budget-modal-switch"
            onClick={() => setCheck(!checked)}
            key={key}>
            <span>{t(label)}</span>
            {isInfo && (
                <Tippy content={tooltip} placement="left">
                    <span style={{ marginLeft: 'auto' }}>
                        <Icon size={1} path={mdiInformationOutline} />
                    </span>
                </Tippy>
            )}

            <Form.Check
                disabled={disabled}
                checked={checked}
                onClick={() => setCheck(!checked)}
                type="switch"
                id="custom-switch"
            />
        </button>
    );
};
export const CustomSelect = forwardRef(({ label, isLabel, options, state, setState }, ref) => {
    const { t } = useTranslation();
    const customStyles = {
        control: (base) => ({
            ...base,
            height: 30,
            minHeight: 30,
        }),
        menu: (base) => ({
            ...base,
            width: 'max-content',
            minWidth: '100%',
        }),
    };
    return (
        <>
            {isLabel && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>{t(label)}</span>
                    <span style={{ color: 'red' }}>*</span>
                </div>
            )}
            <Select
                ref={ref}
                isMulti={false}
                isSearchable={true}
                styles={customStyles}
                className="react-select budget-select"
                classNamePrefix="react-select"
                placeholder="Select..."
                value={state}
                options={options}
                onChange={(e) => setState(e)}
            />
        </>
    );
});
const Update1 = (props) => {
    const { modalDropdownStates, switchProp, positionSwitch, setPositionSwitch } = props;
    const { t } = useTranslation();
    return (
        <>
            {switchProp.map((el, i) => (
                <CustomSwitch
                    label={el.label}
                    checked={el.state}
                    setCheck={el.setState}
                    key={i}
                    isInfo={true}
                    tooltip={el.tooltip}
                />
            ))}
            <Row>
                <Col xs={6}>
                    <CustomSelect
                        isLabel={true}
                        label="Company"
                        options={modalDropdownStates[0].options}
                        state={modalDropdownStates[0].state}
                        setState={modalDropdownStates[0].setState}
                        ref={modalDropdownStates[0].ref}
                    />
                </Col>
                <Col>
                    <CustomSelect
                        isLabel={true}
                        label="Year"
                        options={modalDropdownStates[1].options}
                        state={modalDropdownStates[1].state}
                        setState={modalDropdownStates[1].setState}
                        ref={modalDropdownStates[1].ref}
                    />
                </Col>
                <Col>
                    <CustomSelect
                        isLabel={true}
                        label="Currency"
                        options={modalDropdownStates[2].options}
                        state={modalDropdownStates[2].state}
                        setState={modalDropdownStates[2].setState}
                        ref={modalDropdownStates[2].ref}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <CustomSelect
                        isLabel={true}
                        label="Department"
                        options={modalDropdownStates[3].options}
                        state={modalDropdownStates[3].state}
                        setState={modalDropdownStates[3].setState}
                        ref={modalDropdownStates[3].ref}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <CustomSwitch
                        label="Position"
                        checked={positionSwitch}
                        setCheck={setPositionSwitch}
                        isInfo={false}
                        style={{ marginBottom: '5px' }}
                    />
                    {positionSwitch === true && (
                        <CustomSelect
                            isLabel={false}
                            options={modalDropdownStates[4].options}
                            state={modalDropdownStates[4].state}
                            setState={modalDropdownStates[4].setState}
                        />
                    )}
                </Col>
            </Row>
            <Row>
                <Col>
                    <CustomSelect
                        isLabel={true}
                        label="P&L Section"
                        options={modalDropdownStates[5].options}
                        state={modalDropdownStates[5].state}
                        setState={modalDropdownStates[5].setState}
                        ref={modalDropdownStates[5].ref}
                    />
                </Col>
                <Col>
                    <CustomSelect
                        isLabel={true}
                        label="Account Group"
                        options={modalDropdownStates[6].options}
                        state={modalDropdownStates[6].state}
                        setState={modalDropdownStates[6].setState}
                        ref={modalDropdownStates[6].ref}
                    />
                </Col>
            </Row>
            <Row>
                <Col xs={6}>
                    <CustomSelect
                        isLabel={true}
                        label="Account Cost Center"
                        options={modalDropdownStates[7].options}
                        state={modalDropdownStates[7].state}
                        setState={modalDropdownStates[7].setState}
                        ref={modalDropdownStates[7].ref}
                    />
                </Col>
            </Row>
        </>
    );
};

export default React.memo(Update1);
