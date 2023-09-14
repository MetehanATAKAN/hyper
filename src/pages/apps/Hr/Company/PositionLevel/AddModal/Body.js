import React, { useState, useEffect } from 'react'
import 'antd/dist/antd.css';
import { SingleSelects, MultipleSelects } from '../../../../../../components/GlobalNew/Selects';
import { NewInput, NewTextArea } from '../../../../../../components/GlobalNew/Inputs';
import { Row, Col } from 'react-bootstrap';
import { FetchApiGet, FetchApiPost } from '../../../../../../utils/http.helper';
import { useHistory } from 'react-router-dom';

const Body = ({ isClickAdd, addButtonDisableStatus, setAddButtonDisableStatus, setIsShow, setFilterData, getAllFilterData}) => {
    const empId = localStorage.getItem('userEmpId');
    const history = useHistory();
    const [selectedCompany, setSelectedCompany] = useState();
    const [companyOptions, setCompanyOptions] = useState([]);

    const [selectedDepartment, setSelectedDepartment] = useState();
    const [departmentOptions, setDepartmentOptions] = useState([]);

    const [selectedPosition, setSelectedPosition] = useState();
    const [positionOptions, setPositionOptions] = useState([]);

    const [selectedLevelName, setSelectedLevelName] = useState();
    const [levelNameOptions, setLevelNameOptions] = useState([]);

    const [comments, setComments] = useState('');

    const [selectedRank, setSelectedRank] = useState();
    const [rankOptions, setRankOptions] = useState([]);

    const [selectedScore, setSelectedScore] = useState();
    const [scoreOptions, setScoreOptions] = useState([]);

    const [selectedRangeI, setSelectedRangeI] = useState();
    const [rangeIOptions, setRangeIOptions] = useState([]);

    const [selectedRangeII, setSelectedRangeII] = useState();
    const [rangeIIOptions, setRangeIIOptions] = useState([]);

    useEffect(() => {
            for (let index = 1; index <= 10; index++) {
                setRankOptions(prevState => [...prevState, {label: `${index}`, value: index}])
            }
            for (let index = 1; index <= 5; index++) {
                setScoreOptions(prevState => [...prevState, {label: `${index}`, value: index}])
            }
            for (let index = 0; index <= 10; index= index + 0.5) {
                setRangeIOptions(prevState => [...prevState, {label: `${index} %`, value: index}])
                setRangeIIOptions(prevState => [...prevState, {label: `${index} %`, value: index}])
            }
    }, [history])

    useEffect(() => {
        // FetchApiGet('api/OldSystem/GetAllCompanies', 'GET')
        //     .then(res => {
        //         if(res.status === 200){
        //             res.json().then(data => {
        //                 setCompanyOptions(data.map(item => ({
        //                     label: item.CompanyName,
        //                     value: item.CompanyId
        //                 })))
        //             })
        //         }
        //     })

            FetchApiGet(`api/OldSystem/GetCompanies/${empId}`, 'GET')
          .then(res => {
            if(res.status === 200){
              res.json().then(item => {
                setCompanyOptions(item?.map(data => (
                  {
                      value:data.CompanyId,
                      label:data.CompanyName
                  }
                )))
              })
            }
          })
    }, [])

    useEffect(() => {
        setSelectedDepartment()
        setSelectedPosition()
        setSelectedLevelName()
        setSelectedRank()
        setSelectedScore()
        setSelectedRangeI()
        setSelectedRangeII()
        setComments('')

        setDepartmentOptions([])
        setPositionOptions([])
        setLevelNameOptions([])
        if(selectedCompany){
            FetchApiPost('services/Hr/CompanyDepartment/GetDepartmentsByCompanyIds', 'POST', {
                companyIds: [selectedCompany.value]
            }).then(res => {
                if(res.status === 200){
                    res.json().then(data => {
                        setDepartmentOptions(data.data.map(item => ({
                            label: item.departmentName,
                            value: item.id
                        })))
                    })
                }
            })
        }
    }, [selectedCompany])

    useEffect(() => {
        setSelectedPosition()
        setSelectedLevelName()
        setSelectedRank()
        setSelectedScore()
        setSelectedRangeI()
        setSelectedRangeII()
        setComments('')

        setPositionOptions([])
        setLevelNameOptions([])
        if(selectedDepartment && selectedCompany){
            FetchApiPost('services/Hr/CompanyDepartment/GetPositionByDepIds', 'POST', [selectedDepartment.value]).then(res => {
                if(res.status === 200){
                    res.json().then(data => {
                        setPositionOptions(data.data.map(item => ({
                            label: item.positionName,
                            value: item.id
                        })))
                    })
                }
            })
        }
    }, [selectedDepartment])


    const [allPositionLevelData, setAllPositionLevelData] = useState([]);
    useEffect(() => {

        setSelectedLevelName()
        setSelectedRank()
        setSelectedScore()
        setSelectedRangeI()
        setSelectedRangeII()
        setComments('')

        setLevelNameOptions([])

        if(selectedPosition){
            FetchApiPost('services/Hr/PositionLevel/GetAllPositionLevelByPositionIds', 'POST', {
                positionIds: [selectedPosition.value]
            })
            .then(res => {
                if(res.status === 201){
                    res.json().then(data => {
                        setAllPositionLevelData(data.data)
                        setLevelNameOptions(data.data.map(item => ({
                            label: item.positionLevelName,
                            value: item.id
                            }))
                        )
                    })
                }
            })
        }
        
    }, [selectedPosition])

    useEffect(() => {
        setSelectedRank()
        setSelectedScore()
        setSelectedRangeI()
        setSelectedRangeII()
        setComments('')

        if(selectedLevelName){
            const data = allPositionLevelData.find(item => item.id === selectedLevelName.value)
            setSelectedRank({label: `${data.rank}`, value: data.rank})
            setSelectedScore({label: `${data.score}`, value: data.score})
            setSelectedRangeI({label: `${data.rangeI} %`, value: data.rangeI})
            setSelectedRangeII({label: `${data.rangeII} %`, value: data.rangeII})
            setComments(data.comments)
        }
    }, [selectedLevelName])

    useEffect(() => {
        if(isClickAdd){
            const data = {
                companyId: selectedCompany.value,
                departmantId: selectedDepartment.value,
                positionId: selectedPosition.value,
                positionLevelId: selectedLevelName.value,
                comment: comments.trim(),
                rank: selectedRank.value,
                score: selectedScore.value,
                rangeI: selectedRangeI.value,
                rangeII: selectedRangeII.value,
                createdBy: localStorage.getItem('userName')
            }
            FetchApiPost('services/Hr/CompanyPositionLevel/CreateCompanyPositionLevel', 'POST', data)
                .then(res => {
                    if(res.status === 201){
                        res.json().then(data => {
                            // setFilterData(prev => [...prev, {
                            //     id: data.data.id,
                            //     company: data.data.company.companyName,
                            //     companyId: data.data.company.companyId,
                            //     department: data.data.departmant.departmentName,
                            //     departmentId: data.data.departmant.id,
                            //     position: data.data.position.positionName,
                            //     positionId: data.data.position.id,
                            //     levelName: data.data.positionLevel.positionLevelName,
                            //     levelNameId: data.data.positionLevel.id,
                            //     comment: data.data.comment,
                            //     rank: data.data.rank,
                            //     score: data.data.score,
                            //     rangeI: data.data.rangeI,
                            //     rangeII: data.data.rangeII
                            // }])
                            getAllFilterData()
                            setIsShow(false);
                        })
                    }
                })
        }
    }, [isClickAdd])

    useEffect(() => {
        if(selectedCompany && selectedDepartment && selectedPosition && selectedLevelName && selectedRank && selectedScore && selectedRangeI && selectedRangeII){
            setAddButtonDisableStatus(false);
        }else{
            setAddButtonDisableStatus(true);
        }
    }, [selectedCompany, selectedDepartment, selectedPosition, selectedLevelName, selectedRank, selectedScore, selectedRangeI, selectedRangeII])

  return (
    <div>
        <Row>
            <SingleSelects 
                label="company"
                options={companyOptions}
                selectedItems={selectedCompany}
                setSelectedItems={setSelectedCompany}
                width={'100%'}
                isStar={true}
            />
        </Row>
        <Row>
            <SingleSelects 
                label="department"
                options={departmentOptions}
                selectedItems={selectedDepartment}
                setSelectedItems={setSelectedDepartment}
                width={'100%'}
                isStar={true}
            />
        </Row>
        <Row>
            <SingleSelects 
                label="position"
                options={positionOptions}
                selectedItems={selectedPosition}
                setSelectedItems={setSelectedPosition}
                width={'100%'}
                isStar={true}
            />
        </Row>
        <Row>
            <SingleSelects 
                label="level name"
                options={levelNameOptions}
                selectedItems={selectedLevelName}
                setSelectedItems={setSelectedLevelName}
                width={'100%'}
                isStar={true}
            />
        </Row>
        <Row>
            <NewTextArea 
                label="comments"
                value={comments}
                setValue={setComments}
                width={'100%'}
                placeholder="comments"
            />
        </Row>
        <Row>
            <Col>
                <SingleSelects 
                    label="rank"
                    options={rankOptions}
                    selectedItems={selectedRank}
                    setSelectedItems={setSelectedRank}
                    width={'100%'}
                    isSortable={false}
                    isStar={true}
                />
            </Col>
            <Col>
                <SingleSelects 
                    label="score"
                    options={scoreOptions}
                    selectedItems={selectedScore}
                    setSelectedItems={setSelectedScore}
                    width={'100%'}
                    isSortable={false}
                    isStar={true}
                />
            </Col>
        </Row>
        <Row>
            <Col>
                <SingleSelects 
                    label="range I"
                    options={rangeIOptions}
                    selectedItems={selectedRangeI}
                    setSelectedItems={setSelectedRangeI}
                    width={'100%'}
                    isSortable={false}
                    isStar={true}
                />
            </Col>
            <Col>
                <SingleSelects 
                    label="range II"
                    options={rangeIIOptions}
                    selectedItems={selectedRangeII}
                    setSelectedItems={setSelectedRangeII}
                    width={'100%'}
                    isSortable={false}
                    isStar={true}
                />
            </Col>
        </Row>
    </div>
  )
}

export default Body