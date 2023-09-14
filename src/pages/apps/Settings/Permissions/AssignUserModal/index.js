import React, { useState } from 'react';
import GlobalModal from '../../../../../components/GlobalNew/Modal';
import Body from './Body';
import Footer from './Footer';
import { useTranslation } from 'react-i18next';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { settingsAsssignUser } from '../../../../../config';

const AssignUserModal = ({ isShow, setIsShow, setFilterData, pageNum = 0, roleId }) => {
    const { t } = useTranslation();
    const apiURL = settingsAsssignUser.API_URL;
    const [rowSelection, setRowSelection] = useState({});

    const history = useHistory();

    const [tableData, setTableData] = useState([]);

    const [isClickAdd, setIsClickAdd] = useState(false);
    const [addButtonDisableStatus, setAddButtonDisableStatus] = useState(true);
    const [pageNumber, setPageNumber] = useState(pageNum);

    const handleCloseModal = () => {
        setIsShow(false);
        setPageNumber(0);
    };
    const addBtn = () => {
        const selectionItems = Object.keys(rowSelection).filter((id) => rowSelection[id]);
        const newArr = tableData.filter((item) => selectionItems.includes(item.id));
        const body = {
            assign: newArr.map((data) => ({
                userId: data.id,
                roleId: String(roleId),
            })),
        };

        fetch(`${apiURL}/api/Accounts/UsersAssignToRole`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'access-control-allow-origin': '*',
                'Content-type': 'application/json; charset=UTF-8',
                Authorization: 'Bearer ' + localStorage.getItem('userToken'),
            },
        }).then((res) =>
            (async () => {
                try {
                    if (res.status === 201) {
                        setIsShow(false);
                        setPageNumber(0);
                    } else if (res.status === 500 || res.status === 499) {
                        history.push('/error-500');
                    } else {
                    }
                } catch (error) {
                    console.log('error', error);
                }
            })()
        );
    };

    const cancelBtn = () => {
        setIsShow(false);
        setPageNumber(0);
    };
    return (
        <>
            {isShow && (
                <GlobalModal
                    showModal={isShow}
                    setShowModal={setIsShow}
                    toggle={handleCloseModal}
                    header={t('Assign User')}
                    size={'lg'}
                    body={
                        pageNumber === 0 ? (
                            <>
                                <div style={{ paddingLeft: '95px' }}>
                                    <div className="d-flex" style={{ height: '50px' }}>
                                        <Form.Check type="radio" name="empOrPosition" />

                                        <div
                                            className="d-flex"
                                            style={{
                                                flexDirection: 'column',
                                                position: 'absolute',
                                                left: '145px',
                                                top: '13px',
                                            }}>
                                            <label> {t('position')} </label>
                                            <label style={{ fontWeight: '400' }}> {t('can access all records')} </label>
                                        </div>
                                    </div>

                                    <div className="d-flex" style={{ height: '50px' }}>
                                        <Form.Check type="radio" name="empOrPosition" />

                                        <div
                                            className="d-flex"
                                            style={{
                                                flexDirection: 'column',
                                                position: 'absolute',
                                                left: '145px',
                                                top: '77px',
                                            }}>
                                            <label> {t('Employee')} </label>
                                            <label style={{ fontWeight: '400' }}>
                                                {' '}
                                                {t('can only access asigned records')}{' '}
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <Body
                                isClickAdd={isClickAdd}
                                addButtonDisableStatus={addButtonDisableStatus}
                                setAddButtonDisableStatus={setAddButtonDisableStatus}
                                setShowModal={setIsShow}
                                setFilterData={setFilterData}
                                tableData={tableData}
                                setTableData={setTableData}
                                roleId={roleId}
                                rowSelection={rowSelection}
                                setRowSelection={setRowSelection}
                            />
                        )
                    }
                    footer={
                        pageNumber === 0 ? (
                            <>
                                <Button onClick={cancelBtn} variant="light">
                                    {t('cancel')}
                                </Button>
                                <Button onClick={() => setPageNumber((num) => num + 1)} variant="primary">
                                    {t('next')}
                                </Button>
                            </>
                        ) : (
                            <Footer
                                addBtn={addBtn}
                                cancelBtn={cancelBtn}
                                addButtonDisableStatus={Object.keys(rowSelection).length === 0 ? true : false}
                            />
                        )
                    }
                />
            )}
        </>
    );
};

export default AssignUserModal;
