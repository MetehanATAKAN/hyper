import React, { useState, useEffect } from 'react'
import 'antd/dist/antd.css';
import { SingleSelects, MultipleSelects } from '../../../../../../components/GlobalNew/Selects';
import { NewInput, NewTextArea } from '../../../../../../components/GlobalNew/Inputs';
import { Row, Col } from 'react-bootstrap';
import { FetchApiGet, FetchApiPost } from '../../../../../../utils/http.helper';
import { useHistory } from 'react-router-dom';

const Body = ({ isClickAdd, addButtonDisableStatus, setAddButtonDisableStatus, setIsShow, setFilterData, selectedValue, filterData }) => {
    const empId = localStorage.getItem('userEmpId');
    const history = useHistory();
    const [selectedCompany, setSelectedCompany] = useState({value: selectedValue.companyId, label: selectedValue.company});
    const [companyOptions, setCompanyOptions] = useState([]);

    const [selectedDepartment, setSelectedDepartment] = useState({value: selectedValue.departmentId, label: selectedValue.department});
    const [departmentOptions, setDepartmentOptions] = useState([]);

    const [selectedPosition, setSelectedPosition] = useState({value: selectedValue.positionId, label: selectedValue.position});
    const [positionOptions, setPositionOptions] = useState([]);

    const [selectedLevelName, setSelectedLevelName] = useState({value: selectedValue.levelNameId, label: selectedValue.levelName});
    const [levelNameOptions, setLevelNameOptions] = useState([]);

    const [comments, setComments] = useState(selectedValue.comment);

    const [selectedRank, setSelectedRank] = useState({value: selectedValue.rank, label: `${selectedValue.rank}`});
    const [rankOptions, setRankOptions] = useState([]);

    const [selectedScore, setSelectedScore] = useState({value: selectedValue.score, label: `${selectedValue.score}`});
    const [scoreOptions, setScoreOptions] = useState([]);

    const [selectedRangeI, setSelectedRangeI] = useState({value: selectedValue.rangeI, label: `${selectedValue.rangeI} %`});
    const [rangeIOptions, setRangeIOptions] = useState([]);

    const [selectedRangeII, setSelectedRangeII] = useState({value: selectedValue.rangeII, label: `${selectedValue.rangeII} %`});
    const [rangeIIOptions, setRangeIIOptions] = useState([]);

    // console.log(selectedValue)

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
    }, [selectedValue])

    useEffect(() => {
        
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
        }else{
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
        }
    }, [selectedCompany])

     const handleChangeCompany = (value, label) =>{
    //     setSelectedDepartment()
    //     setSelectedPosition()
    //     setSelectedLevelName()
    //     setSelectedRank()
    //     setSelectedScore()
    //     setSelectedRangeI()
    //     setSelectedRangeII()
    //     setComments('')

    //     setDepartmentOptions([])
    //     setPositionOptions([])
    //     setLevelNameOptions([])

    //     FetchApiPost('services/Hr/CompanyDepartment/GetDepartmentsByCompanyIds', 'POST', {
    //         companyIds: [value]
    //     }).then(res => {
    //         if(res.status === 200){
    //             res.json().then(data => {
    //                 setDepartmentOptions(data.data.map(item => ({
    //                     label: item.departmentName,
    //                     value: item.id
    //                 })))
    //             })
    //         }
    //     })
     }

     console.log(selectedValue)

    useEffect(() => {
        
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
        }else{
            setSelectedPosition()
            setSelectedLevelName()
            setSelectedRank()
            setSelectedScore()
            setSelectedRangeI()
            setSelectedRangeII()
            setComments('')
    
            setPositionOptions([])
            setLevelNameOptions([])
        }
    }, [selectedDepartment])

    const handleChangeDepartment = (value, label) =>{
        setSelectedPosition()
        setSelectedLevelName()
        setSelectedRank()
        setSelectedScore()
        setSelectedRangeI()
        setSelectedRangeII()
        setComments('')

        setPositionOptions([])
        setLevelNameOptions([])

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


    const [allPositionLevelData, setAllPositionLevelData] = useState([]);
    useEffect(() => {

        

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
        }else{
            setSelectedLevelName()
        setSelectedRank()
        setSelectedScore()
        setSelectedRangeI()
        setSelectedRangeII()
        setComments('')

        setLevelNameOptions([])
        }
        
    }, [selectedPosition])

    useEffect(() => {
        

        if(selectedLevelName){
            const data = allPositionLevelData.find(item => item.id === selectedLevelName.value)
            if(data !== undefined){
                setSelectedRank({label: `${data.rank}`, value: data.rank})
                setSelectedScore({label: `${data.score}`, value: data.score})
                setSelectedRangeI({label: `${data.rangeI} %`, value: data.rangeI})
                setSelectedRangeII({label: `${data.rangeII} %`, value: data.rangeII})
                setComments(data.comments)
            }
            
        }else{
            setSelectedRank()
        setSelectedScore()
        setSelectedRangeI()
        setSelectedRangeII()
        setComments('')
        }
    }, [selectedLevelName])

    useEffect(() => {
        if(isClickAdd){
            const data = {
                id: selectedValue.id,
                companyId: selectedCompany.value,
                departmantId: selectedDepartment.value,
                positionId: selectedPosition.value,
                positionLevelId: selectedLevelName.value,
                comment: comments,
                rank: selectedRank.value,
                score: selectedScore.value,
                rangeI: selectedRangeI.value,
                rangeII: selectedRangeII.value,
                modifiedBy: localStorage.getItem('userName')
            }
            FetchApiPost('services/Hr/CompanyPositionLevel/UpdateCompanyPositionLevel', 'POST', data)
                .then(res => {
                    if(res.status === 201){
                        res.json().then(data => {
                            let newData = filterData.map(item => {
                                if(item.id === selectedValue.id){
                                    return {
                                        id: data.data.id,
                                        company: data.data.company.companyName,
                                        companyId: data.data.company.companyId,
                                        department: data.data.departmant.departmentName,
                                        departmentId: data.data.departmant.id,
                                        position: data.data.position.positionName,
                                        positionId: data.data.position.id,
                                        levelName: data.data.positionLevel.positionLevelName,
                                        levelNameId: data.data.positionLevel.id,
                                        comment: data.data.comment,
                                        rank: data.data.rank,
                                        score: data.data.score,
                                        rangeI: data.data.rangeI,
                                        rangeII: data.data.rangeII
                                    }
                                }else{
                                    return item
                                }
                            })
                            setFilterData(newData)
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

    const handleResetStates = (value, label, headerName) => {
        if(headerName === "company"){
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
        }else if(headerName === "department"){
            setSelectedPosition()
            setSelectedLevelName()
            setSelectedRank()
            setSelectedScore()
            setSelectedRangeI()
            setSelectedRangeII()
            setComments('')

            setPositionOptions([])
            setLevelNameOptions([])
        }else if(headerName === "position"){
            setSelectedLevelName()
            setSelectedRank()
            setSelectedScore()
            setSelectedRangeI()
            setSelectedRangeII()
            setComments('')

            setLevelNameOptions([])
        }else if(headerName === "levelName"){
            // setSelectedLevelName({label: label , value: value})
    }
}
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
                handleChange={(value, label) => handleResetStates(value, label, "company")}
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
                handleChange={(value, label) => handleResetStates(value, label, "department")}
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
                handleChange={(value, label) => handleResetStates(value, label, "position")}
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
                handleChange={(value, label) => handleResetStates(value, label, "levelName")}
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