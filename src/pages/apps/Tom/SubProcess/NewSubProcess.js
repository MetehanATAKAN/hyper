import React, { useState } from 'react'
import { Modal } from '../../../../components/FormElements/Modal'
import { Button } from '../../../../components/FormElements/Button'
import { useTranslation } from 'react-i18next'
import { InputDefault, TextArea } from '../../../../components/FormElements/Input'
import { Col, Row } from 'antd'
import { MultipleSelects, SingleSelects } from '../../../../components/GlobalNew/Selects'
import TableAccordion from '../../../../components/Tables/TableAccordion'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const NewSubProcess = ({
    show,
    setShow
}) => {
    const { t } = useTranslation();

    /**sub process name */
    const [subProcessName, setSubProcessName] = useState('');

    /**aım */
    const [aım, setAım] = useState('');

    /**expected day */
    const [expectedDay, setExpectedDay] = useState([]);
    const [selectExpectedDay, setSelectExpectedDay] = useState();

    /**activity type */
    const [activityType, setActivityType] = useState([]);
    const [selectActivityType, setSelectActivityType] = useState();

    /**sub process mix type */
    const [subProcessMixType, setSubProcessMixType] = useState([]);
    const [selectSubProcessMixType, setSelectSubProcessMixType] = useState();

    /**assessment */
    const [assessment, setAssessment] = useState([]);
    const [selectAssessment, setSelectAssessment] = useState();

    /**company type */
    const [companyType, setCompanyType] = useState([]);
    const [selectCompanyType, setSelectCompanyType] = useState([]);

    /**department */
    const [department, setDepartment] = useState([]);
    const [selectDepartment, setSelectDepartment] = useState([]);

    /**position */
    const [position, setPosition] = useState([]);
    const [selectPosition, setSelectPosition] = useState([]);

    

    const topFilter = [
        {
            key: 'activityType',
            label: 'activity type',
            options: activityType,
            state: selectActivityType,
            setState: setSelectActivityType,
            type: 'single',
            isStar:true
        },
        {
            key: 'subProcessMixType',
            label: 'sub process mix type',
            options: subProcessMixType,
            state: selectSubProcessMixType,
            setState: setSelectSubProcessMixType,
            type: 'single',
            isStar:true
        },
        {
            key: 'assessment',
            label: 'assessment',
            options: assessment,
            state: selectAssessment,
            setState: setSelectAssessment,
            type: 'single',
            isStar:true
        },
    ]

    const operationalResponsibilityPositionFilter = [
        {
            key: 'companyType',
            label: 'company type',
            options: companyType,
            state: selectCompanyType,
            setState: setSelectCompanyType,
            type: 'multi',
            isStar:true
        },
        {
            key: 'department',
            label: 'department',
            options: department,
            state: selectDepartment,
            setState: setSelectDepartment,
            type: 'multi',
            isStar:true
        },
        {
            key: 'position',
            label: 'position',
            options: position,
            state: selectPosition,
            setState: setSelectPosition,
            type: 'multi',
            isStar:true
        },
    ]

    const [operationalData, setOperationalData] = useState([
        {
            company:'mete',
            department:'mete2',
            position:'boş'
        }
    ])
    const operationalColumns = [
        {
            header: t('Company'),
            accessorKey: 'company',
            size: '400'
        },
        {
            header: t('Department'),
            accessorKey: 'department',
            size: '400'
        },
        {
            header: t('Position'),
            accessorKey: 'position',
            size: '400'
        },
        {
            header: t(''),
            accessorKey: 'delete',
            size: '50',
            Cell: ({ cell, row }) => {
              return(
                <DeleteOutlineIcon color='green'/>
              )
            }
        },
    ]
    
  return (
      <>
      <>
                      <Row gutter={16}>
                          <Col span={12}>
                              <InputDefault
                                  value={subProcessName}
                                  setValue={setSubProcessName}
                                  label='sub process name'
                                  width='50%'
                              />
                          </Col>
                          <Col span={12}>
                              METEHAN ATAKAN
                          </Col>
                      </Row>

                      <TextArea
                          value={aım}
                          setValue={setAım}
                          label='AIM and Desription'
                      />

                      <Row gutter={16}>
                          <Col span={6}>
                              <InputDefault
                                  value={subProcessName}
                                  setValue={setSubProcessName}
                                  label='sub process name'
                                  width='50%'
                              />
                          </Col>

                          {
                              topFilter?.map(data => (
                                  <Col span={6}>
                                      <SingleSelects
                                          label={data.label}
                                          isStar={data.isStar}
                                          selectedItems={data.state}
                                          setSelectedItems={data.setState}
                                          options={data.options}
                                          width='100%'
                                      />
                                  </Col>
                              ))
                          }
                      </Row>

<br/><br/>
                        <h3>Operational Responsibility Position</h3>
                      <Row gutter={16}>
                        {
                            operationalResponsibilityPositionFilter?.map(data => (
                                <Col span={6}>
                                    <MultipleSelects
                                       label={data.label}
                                       isStar={data.isStar}
                                       selectedItems={data.state}
                                       setSelectedItems={data.setState}
                                       options={data.options}
                                       width='100%'
                                    />
                                </Col>
                            ))
                        }
                        <Col className='mt-auto' span={6}>
                            <Button  type='primary'>
                            {t('add')}
                            </Button>
                        </Col>
                      </Row>

                      <TableAccordion
                      columns={operationalColumns}
                      data={operationalData}
                      isBulkButtons={false}
                      isCheckBox={false}
                      enableExpanding={false}
                      isFilter={false}
                      isTopToolbarShow={false}

                      />

<br/><br/>
<h3>Functional Responsibility Position</h3>
                      <Row gutter={16}>
                        {
                            operationalResponsibilityPositionFilter?.map(data => (
                                <Col span={6}>
                                    <MultipleSelects
                                       label={data.label}
                                       isStar={data.isStar}
                                       selectedItems={data.state}
                                       setSelectedItems={data.setState}
                                       options={data.options}
                                       width='100%'
                                    />
                                </Col>
                            ))
                        }
                        <Col className='mt-auto' span={6}>
                            <Button  type='primary'>
                            {t('add')}
                            </Button>
                        </Col>
                      </Row>

                      <TableAccordion
                      columns={operationalColumns}
                      data={operationalData}
                      isBulkButtons={false}
                      isCheckBox={false}
                      enableExpanding={false}
                      isFilter={false}
                      isTopToolbarShow={false}

                      />

<br/><br/>
<h3>Approved Responsible</h3>
                      <Row gutter={16}>
                        {
                            operationalResponsibilityPositionFilter?.map(data => (
                                <Col span={6}>
                                    <MultipleSelects
                                       label={data.label}
                                       isStar={data.isStar}
                                       selectedItems={data.state}
                                       setSelectedItems={data.setState}
                                       options={data.options}
                                       width='100%'
                                    />
                                </Col>
                            ))
                        }
                      </Row>
                  </>
          {/* <Modal
              showModal={show}
              setShowModal={setShow}
              width={'100%'}
              toggle={() => setShow(false)}
              header='New Sub Process'
              body={
                  <>
                      <Row gutter={16}>
                          <Col span={12}>
                              <InputDefault
                                  value={subProcessName}
                                  setValue={setSubProcessName}
                                  label='sub process name'
                                  width='50%'
                              />
                          </Col>
                          <Col span={12}>
                              METEHAN ATAKAN
                          </Col>
                      </Row>

                      <TextArea
                          value={aım}
                          setValue={setAım}
                          label='AIM and Desription'
                      />

                      <Row gutter={16}>
                          <Col span={6}>
                              <InputDefault
                                  value={subProcessName}
                                  setValue={setSubProcessName}
                                  label='sub process name'
                                  width='50%'
                              />
                          </Col>

                          {
                              topFilter?.map(data => (
                                  <Col span={6}>
                                      <SingleSelects
                                          label={data.label}
                                          isStar={data.isStar}
                                          selectedItems={data.state}
                                          setSelectedItems={data.setState}
                                          options={data.options}
                                          width='100%'
                                      />
                                  </Col>
                              ))
                          }
                      </Row>

<br/><br/>
                        <h3>Operational Responsibility Position</h3>
                      <Row gutter={16}>
                        {
                            operationalResponsibilityPositionFilter?.map(data => (
                                <Col span={6}>
                                    <MultipleSelects
                                       label={data.label}
                                       isStar={data.isStar}
                                       selectedItems={data.state}
                                       setSelectedItems={data.setState}
                                       options={data.options}
                                       width='100%'
                                    />
                                </Col>
                            ))
                        }
                        <Col className='mt-auto' span={6}>
                            <Button  type='primary'>
                            {t('add')}
                            </Button>
                        </Col>
                      </Row>

                      <TableAccordion
                      columns={operationalColumns}
                      data={operationalData}
                      isBulkButtons={false}
                      isCheckBox={false}
                      enableExpanding={false}
                      isFilter={false}
                      isTopToolbarShow={false}

                      />

<br/><br/>
<h3>Functional Responsibility Position</h3>
                      <Row gutter={16}>
                        {
                            operationalResponsibilityPositionFilter?.map(data => (
                                <Col span={6}>
                                    <MultipleSelects
                                       label={data.label}
                                       isStar={data.isStar}
                                       selectedItems={data.state}
                                       setSelectedItems={data.setState}
                                       options={data.options}
                                       width='100%'
                                    />
                                </Col>
                            ))
                        }
                        <Col className='mt-auto' span={6}>
                            <Button  type='primary'>
                            {t('add')}
                            </Button>
                        </Col>
                      </Row>

                      <TableAccordion
                      columns={operationalColumns}
                      data={operationalData}
                      isBulkButtons={false}
                      isCheckBox={false}
                      enableExpanding={false}
                      isFilter={false}
                      isTopToolbarShow={false}

                      />

<br/><br/>
<h3>Approved Responsible</h3>
                      <Row gutter={16}>
                        {
                            operationalResponsibilityPositionFilter?.map(data => (
                                <Col span={6}>
                                    <MultipleSelects
                                       label={data.label}
                                       isStar={data.isStar}
                                       selectedItems={data.state}
                                       setSelectedItems={data.setState}
                                       options={data.options}
                                       width='100%'
                                    />
                                </Col>
                            ))
                        }
                      </Row>
                  </>
              }
              footer={null}
          /> */}
      </>
  )
}

export default NewSubProcess