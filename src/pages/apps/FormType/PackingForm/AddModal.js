import React, { useEffect, useReducer } from 'react';
import { useTranslation } from 'react-i18next';
import GlobalModal from '../../../../components/GlobalNew/Modal';
import { SingleSelects } from '../../../../components/GlobalNew/Selects';
import { NewInput } from '../../../../components/GlobalNew/Inputs';
import FailModal from '../../../../components/FailModal';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';
import { useHistory } from 'react-router-dom';
import { statusControl } from '../../../../components/Function/StatusCheck';
const intialState = {
    selectMainForm: undefined,
    optionsMainForm: [],
    insideOneCassete: '',
    casseteQuantity: '',
    selectAssistForm: undefined,
    optionsAssistForm: [],
    insideOneCasseteTwo: '',
    casseteQuantityTwo: '',
};
const reducer = (state = intialState, action) => {
    switch (action.type) {
        case 'SET_MAIN_FORM':
            return { ...state, selectMainForm: action.payload };
        case 'SET_OPTIONS_MAIN_FORM':
            return { ...state, optionsMainForm: action.payload };
        case 'SET_INSIDE_ONE_CASSETE':
            return { ...state, insideOneCassete: action.payload };
        case 'SET_CASSETE_QUANTITY':
            return { ...state, casseteQuantity: action.payload };
        case 'SET_ASSIST_FORM':
            return { ...state, selectAssistForm: action.payload };
        case 'SET_OPTIONS_ASSIST_FORM':
            return { ...state, optionsAssistForm: action.payload };
        case 'SET_INSIDE_ONE_CASSETE_TWO':
            return { ...state, insideOneCasseteTwo: action.payload };
        case 'SET_CASSETE_QUANTITY_TWO':
            return { ...state, casseteQuantityTwo: action.payload };
        default:
            return state;
    }
};
const AddModal = ({ showModal, setShowModal, applyFilter }) => {
    const { t } = useTranslation();
    const history = useHistory();
    const user = localStorage.getItem('userName');
    const [showFailModal, setShowFailModal] = useState(false);
    const [state, dispatch] = useReducer(reducer, intialState);
    const [status, setStatus] = useState([
        { id: 0, status: 'default' },
        { id: 1, status: 'default' },
        { id: 2, status: 'default' },
        { id: 3, status: 'default' },
        { id: 4, status: 'default' },
        { id: 5, status: 'default' },
    ]);
    const [error, setError] = useState('');
    useEffect(() => {
        FetchApiGet('services/Material/PackingForm/GetAllMainForm', 'GET').then((res) => {
            if (res.status === 200 || res.status === 201) {
                res.json().then(({ data }) => {
                    dispatch({
                        type: 'SET_OPTIONS_MAIN_FORM',
                        payload: data?.map((el) => ({ value: el.id, label: el.formName })),
                    });
                });
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
        FetchApiGet('services/Material/PackingForm/GetAllAssistForm', 'GET').then((res) => {
            if (res.status === 200 || res.status === 201) {
                res.json().then(({ data }) => {
                    dispatch({
                        type: 'SET_OPTIONS_ASSIST_FORM',
                        payload: data?.map((el) => ({ value: el.id, label: el.formName })),
                    });
                });
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    }, []);
    const handleAddButton = () => {
        const condition = [
            !state.selectMainForm ? true : false,
            state.insideOneCassete.trim() === '',
            state.casseteQuantity.trim() === '',
            !state.selectAssistForm ? true : false,
            state.insideOneCasseteTwo.trim() === '',
            state.casseteQuantityTwo.trim() === '',
        ];
        statusControl(condition, status, setStatus);
        if (condition.some((x) => x === true)) return;
        const data = {
            mainFormId: state.selectMainForm.value,
            mainInsideOneCassette: Number(state.insideOneCassete.trim()),
            mainCassetteQuantity: Number(state.casseteQuantity.trim()),
            assistFormId: state.selectAssistForm.value,
            assistInsideOneCassette: Number(state.insideOneCasseteTwo.trim()),
            assistCassetteQuantity: Number(state.casseteQuantityTwo.trim()),
            createdBy: user,
        };
        FetchApiPost('services/Material/PackingForm/CreatePackingForm', 'POST', data).then((res) => {
            if (res.status === 201 || res.status === 200) {
                applyFilter();
                setShowModal(false);
            }
            if (res.status === 400 || res.status === 409 || res.status === 404) {
                res.json().then(({ errors }) => {
                    setShowFailModal(true);
                    setError(errors);
                });
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    };
    return (
        <>
            <GlobalModal
                header={t('Add Packing Form')}
                showModal={showModal}
                setShowModal={setShowModal}
                toggle={() => setShowModal(!showModal)}
                body={
                    <div>
                        <SingleSelects
                            label="main form"
                            isStar={true}
                            selectedItems={state.selectMainForm}
                            setSelectedItems={() => {}}
                            handleChange={(value, labeL) => dispatch({ type: 'SET_MAIN_FORM', payload: labeL })}
                            options={state.optionsMainForm}
                            width="100%"
                            status={status[0].status}
                        />
                        <NewInput
                            type="number"
                            exceptThisSymbols={['e', 'E', '+', '-', '.', ',', '*', '/', ' ']}
                            isKeyDown={true}
                            label="inside one cassette"
                            value={state.insideOneCassete}
                            setValue={() => {}}
                            handleChange={(value) => dispatch({ type: 'SET_INSIDE_ONE_CASSETE', payload: value })}
                            isStar={true}
                            width="100%"
                            status={status[1].status}
                        />
                        <NewInput
                            type="number"
                            exceptThisSymbols={['e', 'E', '+', '-', '.', ',', '*', '/', ' ']}
                            isKeyDown={true}
                            label="cassette quantity"
                            value={state.casseteQuantity}
                            setValue={() => {}}
                            handleChange={(value) => dispatch({ type: 'SET_CASSETE_QUANTITY', payload: value })}
                            isStar={true}
                            width="100%"
                            status={status[2].status}
                        />
                        <hr />
                        <SingleSelects
                            label="assist form"
                            isStar={true}
                            selectedItems={state.selectAssistForm}
                            setSelectedItems={() => {}}
                            handleChange={(value, labeL) => dispatch({ type: 'SET_ASSIST_FORM', payload: labeL })}
                            options={state.optionsMainForm}
                            width="100%"
                            status={status[3].status}
                        />
                        <NewInput
                            type="number"
                            exceptThisSymbols={['e', 'E', '+', '-', '.', ',', '*', '/', ' ']}
                            isKeyDown={true}
                            label="inside one cassette"
                            value={state.insideOneCasseteTwo}
                            setValue={() => {}}
                            handleChange={(value) => dispatch({ type: 'SET_INSIDE_ONE_CASSETE_TWO', payload: value })}
                            isStar={true}
                            width="100%"
                            status={status[4].status}
                        />
                        <NewInput
                            type="number"
                            exceptThisSymbols={['e', 'E', '+', '-', '.', ',', '*', '/', ' ']}
                            isKeyDown={true}
                            label="cassette quantity"
                            value={state.casseteQuantityTwo}
                            setValue={() => {}}
                            handleChange={(value) => dispatch({ type: 'SET_CASSETE_QUANTITY_TWO', payload: value })}
                            isStar={true}
                            width="100%"
                            status={status[5].status}
                        />
                    </div>
                }
                footer={
                    <>
                        <Button onClick={() => setShowModal(false)} variant="light">
                            {t('cancel')}
                        </Button>
                        <Button variant="primary" onClick={handleAddButton}>
                            {t('add')}
                        </Button>
                    </>
                }
            />
            {showFailModal && <FailModal modalShow={showFailModal} setModalShow={setShowFailModal} error={error} />}
        </>
    );
};

export default React.memo(AddModal);
