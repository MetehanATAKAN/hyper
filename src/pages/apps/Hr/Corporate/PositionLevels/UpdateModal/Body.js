import React, { useState, useEffect } from 'react'
import 'antd/dist/antd.css';
import { SingleSelects, MultipleSelects } from '../../../../../../components/GlobalNew/Selects';
import { NewInput, NewTextArea } from '../../../../../../components/GlobalNew/Inputs';
import { Row, Col } from 'react-bootstrap';
import { FetchApiGet, FetchApiPost } from '../../../../../../utils/http.helper';
import { useHistory } from 'react-router-dom';

const Body = ({ isClickAdd, addButtonDisableStatus, setAddButtonDisableStatus, setIsShow, selectedValue, filterData, setIsClickAdd, setFilterData}) => {
    const history = useHistory();
    const [selectedPosition, setSelectedPosition] = useState();
    const [positionOptions, setPositionOptions] = useState([]);

    const [levelName, setLevelName] = useState(selectedValue.levelName);
    const [comments, setComments] = useState(selectedValue.comment);

    const [selectedRank, setSelectedRank] = useState();
    const [rankOptions, setRankOptions] = useState([]);

    const [selectedScore, setSelectedScore] = useState();
    const [scoreOptions, setScoreOptions] = useState([]);

    const [selectedRangeI, setSelectedRangeI] = useState();
    const [rangeIOptions, setRangeIOptions] = useState([]);

    const [selectedRangeII, setSelectedRangeII] = useState();
    const [rangeIIOptions, setRangeIIOptions] = useState([]);

    console.log("selectedValue",selectedValue)

    useEffect(() => {
        FetchApiGet('services/Hr/Position/GetAllPositions', 'GET')
            .then(res => {
                if(res.status === 200){
                    res.json().then(data => {
                        setPositionOptions(data.data.map(item => ({
                            label: item.positionName,
                            value: item.id
                        })))
                        let position = data.data.filter(item => item.positionName === selectedValue.position)
                        setSelectedPosition({label: position[0].positionName, value: position[0].id})
                    })
                }
            })
            for (let index = 1; index <= 10; index++) {
                setRankOptions(prevState => [...prevState, {label: `${index}`, value: index}])
                if(index === selectedValue.rank){
                    setSelectedRank({label: `${index}`, value: index})
                }
            }
            for (let index = 1; index <= 5; index++) {
                setScoreOptions(prevState => [...prevState, {label: `${index}`, value: index}])
                if(index === selectedValue.score){
                    setSelectedScore({label: `${index}`, value: index})
                }
            }
            for (let index = 0; index <= 10; index= index + 0.5) {
                setRangeIOptions(prevState => [...prevState, {label: `${index} %`, value: index}])
                setRangeIIOptions(prevState => [...prevState, {label: `${index} %`, value: index}])

                if(index === selectedValue.rangeI){
                    setSelectedRangeI({label: `${index} %`, value: index})
                }
                if(index === selectedValue.rangeII){
                    setSelectedRangeII({label: `${index} %`, value: index})
                }
            }

            setAddButtonDisableStatus(false)
    }, [history, selectedValue])

    useEffect(() => {
        if(isClickAdd){
            const data = {
                id: selectedValue.id,
                positionId: selectedPosition.value,
                positionLevelName: levelName.trim(),
                comments: comments.trim(),
                rank: selectedRank.value,
                score: selectedScore.value,
                rangeI: selectedRangeI.value,
                rangeII: selectedRangeII.value,
                modifiedBy: localStorage.getItem('userName')
            }
            FetchApiPost('services/Hr/PositionLevel/UpdatePositionLevel', 'POST', data)
                .then(res => {
                    if(res.status === 201){
                        res.json().then(data => {
                            let newData = filterData.map(item => {
                                if(item.id === data.data.id){
                                    item = {
                                        id: data.data.id,
                                        position: data.data.position.positionName,
                                        levelName: data.data.positionLevelName,
                                        comment: data.data.comments,
                                        rank: data.data.rank,
                                        score: data.data.score,
                                        rangeI: data.data.rangeI,
                                        rangeII: data.data.rangeII,
                                    }
                                }
                                return item
                                }
                            )
                            setFilterData(newData)
                            setIsShow(false)
                        })
                    }else if (res.status === 409){
                        res.json().then(data => {
                            alert(data.message)
                            setIsClickAdd(false)
                        })
                    }
                })
        }
    }, [isClickAdd])

    useEffect(() => {
        if(selectedPosition && levelName.trim().length > 0 && selectedRank && selectedScore && selectedRangeI && selectedRangeII){
            setAddButtonDisableStatus(false);
        }else{
            setAddButtonDisableStatus(true);
        }
    }, [selectedPosition, levelName, selectedRank, selectedScore, selectedRangeI, selectedRangeII])

  return (
    <div>
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
            <NewInput 
                label="level name"
                value={levelName}
                setValue={setLevelName}
                width={'100%'}
                isStar={true}
                placeholder="level name"
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