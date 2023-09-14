import { Col, Row } from 'antd'
import React, { useState } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Button } from '../../../../../components/FormElements/Button';
import Header from '../../../../../components/Header';
import { useTranslation } from 'react-i18next';
import { SingleSelects } from '../../../../../components/GlobalNew/Selects';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useDispatch, useSelector } from 'react-redux';
import { isSaveSubProcess } from '../../../../../redux/subProcess/actions';

const NewSubProcessHeader = () => {


    const { t } = useTranslation();
    const dispatch = useDispatch();

    const subProcessName = useSelector(state => state.SubProcess.subProcessName);
    console.log(subProcessName);
    const buttonChange = useSelector(state => state.SubProcess.savedButton);


    const statusOptions = [
        {
            value: 1,
            label: 'Redact'
        }
    ]

    const [selectStatus, setSelectStatus] = useState(
        {
            value: 1,
            label: 'Redact'
        }
    );

    const breadCrumbProps = [
        { label: 'PP Management' },
        {
            label: 'Process',
            items: [
                {
                    key: 1,
                    label: (
                        <Link target="_blank" >
                            PP Management
                        </Link>
                    ),
                },
                {
                    key: 2,
                    label: (
                        <Link target="_blank" >
                            Sub Process
                        </Link>
                    ),
                }
            ],
        },
        { label: 'Sub Process' },
        { label: subProcessName },
    ];

    return (
        <>
            <Row className='sub-process-header' gutter={16}>
                <Col span={12}>
                    <Header
                        routes={breadCrumbProps}
                        pageTitle={'New Sub Process'}
                    />
                </Col>
                <Col className='header-right' span={12} style={{ paddingRight: '24px' }}>
                    <div className='header-right-buttons'>
                        <Button className={`save-info-${buttonChange}`}>
                            <FiberManualRecordIcon/>
                            <span>
                                {
                                    buttonChange === true ? 'Saved' : 'Not Saved'
                                }
                            </span>
                        </Button>
                        <Button onClick={()=>dispatch(isSaveSubProcess(true))} className='save-button' type='primary' >
                            {t('Save')}
                        </Button>
                        <SingleSelects
                            options={statusOptions}
                            selectedItems={selectStatus}
                            width='104px'
                            clearIcon={false}
                        />
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default NewSubProcessHeader