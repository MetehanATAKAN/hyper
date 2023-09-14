import React, { useState } from 'react'
import { Button, Col, Form, Modal, Row, Table } from 'react-bootstrap'
import { CompulsorySelectLabels } from '../../../../forms/Basic'
import Select from 'react-select';
import { useTranslation } from 'react-i18next';
import { MultipleSelects } from '../../../../../components/GlobalNew/Selects';

const CreateOrgPlanModal = ({ show, setShow }) => {

  const { t } = useTranslation();
  const [pageNumber, setPageNumber] = useState(0);
  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
  

  // Company
  const [company, setCompany] = useState([]);
  const [selectCompany, setSelectCompany] = useState('');

  // Bus Unit
  const [busUnit, setBusUnit] = useState([]);
  const [selectBusUnit, setSelectBusUnit] = useState('');

  // Department
  const [department, setDepartment] = useState([]);
  const [selectDepartment, setSelectDepartment] = useState('');

  // Op Supervisor
  const [opSupervisor, setOpSupervisor] = useState([]);
  const [selectOpSupervisor, setSelectOpSupervisor] = useState('');

  //Position
  const [position, setPosition] = useState([]);
  const [selectPosition, setSelectPosition] = useState('');

  //Working type
  const [workingType, setWorkingType] = useState([]);
  const [selectWorkingType, setSelectWorkingType] = useState('');

  //Func Company
  const [funcCompany, setFuncCompany] = useState([]);
  const [selectFuncCompany, setSelectFuncCompany] = useState('');

  // Func Department
  const [funcDepartment, setFuncDepartment] = useState([]);
  const [selectFuncDepartment, setSelectFuncDepartment] = useState('');

  // Func Supervisor
  const [funcSupervisor, setFuncSupervisor] = useState([]);
  const [selectFuncSupervisor, setSelectFuncSupervisor] = useState('');

  const changeSelect = () => {

  }

  const filters = [
    {
      options: company,
      value: selectCompany,
      change: changeSelect,
      headerName: 'company',
      disabled: false
    },
    {
      options: busUnit,
      value: selectBusUnit,
      change: changeSelect,
      headerName: 'business unite',
      disabled: false
    },
    {
      options: department,
      value: selectDepartment,
      change: changeSelect,
      headerName: 'department',
      disabled: false
    },
    {
      options: opSupervisor,
      value: selectOpSupervisor,
      change: changeSelect,
      headerName: 'operational supervisor',
      disabled: false
    },
    {
      options: position,
      value: selectPosition,
      change: changeSelect,
      headerName: 'position',
      disabled: false
    },
    {
      options: workingType,
      value: selectWorkingType,
      change: changeSelect,
      headerName: 'working type',
      disabled: false
    },
    {
      options: funcCompany,
      value: selectFuncCompany,
      change: changeSelect,
      headerName: 'functional company',
      disabled: false
    },
    {
      options: funcDepartment,
      value: selectFuncDepartment,
      change: changeSelect,
      headerName: 'functional department',
      disabled: false
    },
    {
      options: funcSupervisor,
      value: selectFuncSupervisor,
      change: changeSelect,
      headerName: 'functional supervisor',
      disabled: false
    },
  ]

  

  const [options, setOptions] = useState([
    {
      value:1,label:'metehanmetehanmetehanmetehan'
    },
    {
      value:2,label:'atakan'
    }
  ])

  const [selectOptions, setSelectOptions] = useState();

  console.log(selectOptions);


  const [plannedLevel, setPlannedLevel] = useState([
    {
      id:'mete',
      select:(
        <MultipleSelects
          selectedItems={selectOptions}
          setSelectedItems={setSelectOptions}
          options={options}
          label='main type'
          placeholder='select...'
          width={'100%'}
          labelStyle={{ color: '#6c757d' }}
        />
      )
    },
    {
      id:'jan',
      select:(
        <MultipleSelects
          selectedItems={selectOptions}
          setSelectedItems={setSelectOptions}
          options={options}
          label='main type'
          placeholder='select...'
          width={'100%'}
          labelStyle={{ color: '#6c757d' }}
        />
      )
    },
    {
      id:'jan',
      select:<Select
      options={options}
      className="react-select"
      classNamePrefix="react-select"
      placeholder={`${t('Select')}...`}
      onChange={(e)=> setSelectOptions(e)}
      value={selectOptions}
  />
    },
    {
      id:'jan',
      select:<Select
      options={options}
      className="react-select"
      classNamePrefix="react-select"
      placeholder={`${t('Select')}...`}
      onChange={(e)=> setSelectOptions(e)}
      value={selectOptions}
  />
    },
    {
      id:'jan',
      select:<Select
      options={options}
      className="react-select"
      classNamePrefix="react-select"
      placeholder={`${t('Select')}...`}
      onChange={(e)=> setSelectOptions(e)}
      value={selectOptions}
  />
    },
    {
      id:'jan',
      select:<Select
      options={options}
      className="react-select"
      classNamePrefix="react-select"
      placeholder={`${t('Select')}...`}
      onChange={(e)=> setSelectOptions(e)}
      value={selectOptions}
  />
    },
    {
      id:'jan',
      select:<Select
      options={options}
      className="react-select"
      classNamePrefix="react-select"
      placeholder={`${t('Select')}...`}
      onChange={(e)=> setSelectOptions(e)}
      value={selectOptions}
  />
    },
    {
      id:'jan',
      select:<Select
      options={options}
      className="react-select"
      classNamePrefix="react-select"
      placeholder={`${t('Select')}...`}
      onChange={(e)=> setSelectOptions(e)}
      value={selectOptions}
  />
    },
    {
      id:'jan',
      select:<Select
      options={options}
      className="react-select"
      classNamePrefix="react-select"
      placeholder={`${t('Select')}...`}
      onChange={(e)=> setSelectOptions(e)}
      value={selectOptions}
  />
    },
    {
      id:'jan',
      select:<Select
      options={options}
      className="react-select"
      classNamePrefix="react-select"
      placeholder={`${t('Select')}...`}
      onChange={(e)=> setSelectOptions(e)}
      value={selectOptions}
  />
    },
    {
      id:'jan',
      select:<Select
      options={options}
      className="react-select"
      classNamePrefix="react-select"
      placeholder={`${t('Select')}...`}
      onChange={(e)=> setSelectOptions(e)}
      value={selectOptions}
  />
    },
    {
      id:'jan',
      select:<Select
      options={options}
      className="react-select"
      classNamePrefix="react-select"
      placeholder={`${t('Select')}...`}
      onChange={(e)=> setSelectOptions(e)}
      value={selectOptions}
  />
    },
  ])

  const [item, setItem] = useState({ kindOfStand: "", another: "another" });

  const { kindOfStand } = item;

  console.log(kindOfStand);

  const handleChangeRadioButton = (e) => {
    e.persist();

    setItem((prevState) => ({
      ...prevState,
      kindOfStand: e.target.value
    }));

  }

  return (
    <div>
      <Modal show={show} size={pageNumber === 0 ? 'md' : 'xl'} className='add-department'  >
        <Modal.Header closeButton onClick={() => setShow(false)} style={{ backgroundColor: '#FFFFFF', color: '#000000' }}>

          <h4
            className="modal-title"
            style={{
              color: '#7A7A7A',
              font: '18px',
            }}
          >
            Create Organization Plan
          </h4>

        </Modal.Header>
        <Modal.Body>
          {
            pageNumber === 0 &&
            <>
              <Row>
                <Col>
                  <CompulsorySelectLabels
                    options={company}
                    value={selectCompany}
                    change={(e) => changeSelect('company', e)}
                    headerName={'company'}
                    disabled={false}
                  />
                </Col>

                <Col>
                  <CompulsorySelectLabels
                    options={busUnit}
                    value={selectBusUnit}
                    change={(e) => changeSelect('busUnite', e)}
                    headerName={'business unite'}
                    disabled={false}
                  />
                </Col>
              </Row>

              <Row>
                <Col>
                  <CompulsorySelectLabels
                    options={department}
                    value={selectDepartment}
                    change={(e) => changeSelect('department', e)}
                    headerName={'department'}
                    disabled={false}
                  />
                </Col>

                <Col>
                  <CompulsorySelectLabels
                    options={opSupervisor}
                    value={selectOpSupervisor}
                    change={(e) => changeSelect('opSupervisor', e)}
                    headerName={'operational supervisor'}
                    disabled={false}
                  />
                </Col>
              </Row>

              <Row>
                <Col>
                  <CompulsorySelectLabels
                    options={position}
                    value={selectPosition}
                    change={(e) => changeSelect('position', e)}
                    headerName={'position'}
                    disabled={false}
                  />
                </Col>

                <Col>
                  <CompulsorySelectLabels
                    options={workingType}
                    value={selectWorkingType}
                    change={(e) => changeSelect('working type', e)}
                    headerName={'working type'}
                    disabled={false}
                  />
                </Col>
              </Row>
              <hr />
              <Row>
                <CompulsorySelectLabels
                  options={funcCompany}
                  value={selectFuncCompany}
                  change={(e) => changeSelect('funcCompany', e)}
                  headerName={'functional company'}
                  disabled={false}
                />
              </Row>
              <Row>
                <Col>
                  <CompulsorySelectLabels
                    options={funcDepartment}
                    value={selectFuncDepartment}
                    change={(e) => changeSelect('funcDepartment', e)}
                    headerName={'functional department'}
                    disabled={false}
                  />
                </Col>

                <Col>
                  <CompulsorySelectLabels
                    options={funcSupervisor}
                    value={selectFuncSupervisor}
                    change={(e) => changeSelect('funcSupervisor', e)}
                    headerName={'functional supervisor'}
                    disabled={false}
                  />
                </Col>
              </Row>
            </>
          }

          {
            pageNumber === 1 &&
            <>
            <label>territory type</label>
              <Row>
                <Col>
                <Form.Group>
                  <Form.Check
                    type='radio'
                    label='country'
                    value='country'
                    aria-label='country'
                    onChange={handleChangeRadioButton}
                    checked={kindOfStand === "country"}
                    inline='horizontal'
                  />

                  <Form.Check
                    type='radio'
                    label='region'
                    value='region'
                    aria-label='region'
                    onChange={handleChangeRadioButton}
                    checked={kindOfStand === "region"}
                    inline='horizontal'
                  />

                  <Form.Check
                    type='radio'
                    label='area'
                    value='area'
                    aria-label='area'
                    onChange={handleChangeRadioButton}
                    checked={kindOfStand === "area"}
                    inline='horizontal'
                  />

                  <Form.Check
                    type='radio'
                    label='zone'
                    value='zone'
                    aria-label='zone'
                    onChange={handleChangeRadioButton}
                    checked={kindOfStand === "zone"}
                    inline='horizontal'
                  />
                </Form.Group>
                </Col>

                <Col>
                  <div className='d-flex float-right'>
                    <label className='me-3' >copy the value to the following months</label>
                    <Form.Check
                      type="switch"
                      id="custom-switch"
                    />
                  </div>
                  
                </Col>

                <div>
                <Table bordered hover>
      <thead>
        <tr>
          <th>#</th>
          {
            month.map(month => (
              <th> {month} </th>
            ))
          }
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Planned Level</td>
          {
            plannedLevel.map(data =>(
              <td> {data.select} </td>
            ))
          }
        </tr>
        <tr>
          <td>FTE</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>Region</td>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
        </tr>

        <tr>
          <td>Area</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>

        <tr>
          <td>Zone</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
      </tbody>
    </Table>
                </div>
              </Row>
            </>
          }


        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: '#FAFBFE ' }}>
          {
            pageNumber === 0 &&
            <>
              <Button
                className='btn-light'
                style={{ backgroundColor: '#EBEBEB' }}
                onClick={() => setShow(false)}
              >
                cancel
              </Button>
              <Button variant="primary" onClick={()=>setPageNumber(prev => prev+1)} >
                next
              </Button>
            </>
          }

          {
            pageNumber === 1 &&
            <>
            <Button
                className='btn-light'
                style={{ backgroundColor: '#EBEBEB' }}
                onClick={() => setPageNumber(prev => prev-1)}
              >
                cancel
              </Button>
              <Button variant="primary" onClick={()=>setPageNumber(prev => prev+1)} >
                add
              </Button>
            </>
          }
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default CreateOrgPlanModal