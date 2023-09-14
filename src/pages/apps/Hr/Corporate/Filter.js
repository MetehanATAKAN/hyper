import React, { useState, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { mdiCheck, mdiDeleteSweepOutline, mdiClose, mdiDotsVertical } from '@mdi/js';
import Icon from '@mdi/react';
import { MultiSelectReact } from '../../../forms/Basic';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Filter = ({ tableData, setTableData }) => {

    const history = useHistory();
    const { t } = useTranslation();

    // Position
    const [position, setPosition] = useState([]);
    const [selectPosition, setSelectPosition] = useState([]);

    //Additional Positions 
    const [addPositions, setAddPositions] = useState([]);
    const [selectAddPositions, setSelectAddPositions] = useState([]);

    const [updateModal, setUpdateModal] = useState(false);
    const [tableItem, setTableItem] = useState(null);

    const [deleteModal, setDeleteModal] = useState(false);

    const actions = (data,name) => {
        console.log(data);
        if(name === 'edit') {
          setUpdateModal(true);
          setTableItem(data);
        }
        else if(name === 'delete') {
          setDeleteModal(true);
          setTableItem(data);
        }
      
      }
      
      const [anchorEl, setAnchorEl] = React.useState(null);
        const open = Boolean(anchorEl);
        const handleClick = (event) => {
          setAnchorEl(event.currentTarget);
        };
        const handleClose = () => {
          console.log('handle close de');
          setAnchorEl(null);
        };
      
        const deneme = () => {
          document.getElementById("myDropdown").classList.toggle("show-mete");
        }
      
      
        useEffect(() => {
          window.onclick = (event) => {
            if (!event.target.matches('.dropbtn')) {
              var dropdowns = document.getElementsByClassName("dropdown-content1");
              var i;
              for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show-mete')) {
                  openDropdown.classList.remove('show-mete');
                }
              }
            }
          }
        }, [])

    // const applyFilter = () => {
    //     const body = {
    //         departmentIds: selectPosition.map(item => item.departmentIds)
    //     }
    //     FetchApiPost('services/Hr/Department/ApplyForDepartmentFilter ', 'POST', body)
    //         .then((res) =>
    //             (async () => {
    //                 try {
    //                     if (res.status === 200) {
    //                         res.json().then(item => {
    //                             return (
    //                                 setTableData(item.data.map(data => (
    //                                     {
    //                                         id: data?.id,
    //                                         departments: data?.departmentName,
    //                                         departmentOverview: data?.departmentOverview,
    //                                         positions: (
    //                                             data?.position.map((el, index) => (

    //                                                 <span
    //                                                     className="task-management-activity-background"
    //                                                     style={{
    //                                                         backgroundColor: data?.color + '50',
    //                                                         color: data?.color,
    //                                                         padding: '3px 6px',
    //                                                         fontSize: '.7rem',
    //                                                         fontWeight: 700,
    //                                                         whiteSpace: 'nowrap',
    //                                                         marginRight: '5px',
    //                                                     }}>
    //                                                     {el?.abbreviation}
    //                                                 </span>

    //                                             ))
    //                                         ),
    //                                         additionalPositions: (
    //                                             data?.position.map((el, index) => (

    //                                                 <span
    //                                                     className="task-management-activity-background"
    //                                                     style={{
    //                                                         backgroundColor: data?.color + '50',
    //                                                         color: data?.color,
    //                                                         padding: '3px 6px',
    //                                                         fontSize: '.7rem',
    //                                                         fontWeight: 700,
    //                                                         whiteSpace: 'nowrap',
    //                                                         marginRight: '5px',
    //                                                     }}>
    //                                                     {el?.abbreviation}
    //                                                 </span>

    //                                             ))
    //                                         ),
    //                                         abbreviation: (
    //                                             <span
    //                                                 className="task-management-activity-background"
    //                                                 style={{
    //                                                     backgroundColor: data?.color + '50',
    //                                                     color: data?.color,
    //                                                     padding: '3px 6px',
    //                                                     fontSize: '.7rem',
    //                                                     fontWeight: 700,
    //                                                     whiteSpace: 'nowrap',
    //                                                     marginRight: '5px',
    //                                                 }}>
    //                                                 {data?.abbreviation}
    //                                             </span>
    //                                         ),
    //                                         actions: (
    //                                             <>
    //                                             {/* <button onClick={() => actions(data.id, 'edit')}>
    //                                                 bas
    //                                             </button> */}
    //                                                 <div className="dropdown">
    //                                                     <Icon
    //                                                         path={mdiDotsVertical}
    //                                                         size={1}
    //                                                         color='#6C757D'
    //                                                         onClick={deneme}
    //                                                         className="dropbtn"
    //                                                     />
    //                                                     {/* <button onClick={deneme} className="dropbtn">Dropdown</button> */}
    //                                                     <div id="myDropdown" class="dropdown-content1">
    //                                                         <div className='action-button' onClick={() => actions(data.id, 'edit')} >{t('Edit')}</div>
    //                                                         <div className='action-button' onClick={() => actions(data.id, 'delete')} >{t('Delete')}</div>
    //                                                     </div>
    //                                                 </div>

    //                                             </>
    //                                         )
    //                                     }
    //                                 )))
    //                             )
    //                         })
    //                     }
    //                     else if (res.status === 500) {
    //                         history.push('/error-500');
    //                     }
    //                     else {
    //                         console.log('hata');
    //                     }

    //                 } catch (error) {
    //                     console.log('error', error);
    //                 }
    //             })()
    //         )
    // }

    const clearFilter = () => {
        setSelectPosition([]);

        setAddPositions([]);
        setSelectAddPositions([]);
    }

    const changeSelect = (name, e) => {
        switch (name) {
            case 'position':
                return (
                    setSelectPosition(e),
                    setSelectAddPositions([]),
                    setAddPositions([])
                )
            case 'addPositions':
                return (
                    setSelectAddPositions(e)
                )

            default:
                break;
        }
    }

    useEffect(() => {

        FetchApiGet('services/Hr/Department/GetPositionsForDepartmentFilter', 'GET')
            .then((res) =>
                (async () => {
                    try {
                        if (res.status === 200) {
                            res.json().then(item => {
                                return (
                                    setPosition(item.data?.map(data => (
                                        {
                                            value: data.id,
                                            label: data.positionName,
                                            departmentIds: data.department?.id
                                        }
                                    )))
                                )
                            })
                        }
                        else if (res.status === 500) {
                            history.push('/error-500');
                        }
                        else {
                            console.log('hata');
                        }

                    } catch (error) {
                        console.log('error', error);
                    }
                })()
            )

    }, [history])

    useEffect(() => {

        if (selectPosition.length !== 0) {

            const body = {
                departmentIds: selectPosition?.map(item => item.departmentIds)
            }
            FetchApiPost('services/Hr/Department/GetAddPositionsForDepartmentFilter', 'POST', body)
                .then((res) =>
                    (async () => {
                        try {
                            if (res.status === 200) {
                                res.json().then(item => {
                                    return (
                                        setAddPositions(item.data.map(data => (
                                            {
                                                value: data.id,
                                                label: data.positionName
                                            }
                                        )))
                                    )
                                })
                            }
                            else if (res.status === 500) {
                                history.push('/error-500');
                            }
                            else {
                                console.log('hata');
                            }

                        } catch (error) {
                            console.log('error', error);
                        }
                    })()
                )
        }

    }, [history, selectPosition])

    return (
        <div>
            <Row className='page-filters  mt-2 mb-2'>

                <Col xs={8} sm={9} md={10} className='d-flex flex-wrap multi-select-auto'>
                    <MultiSelectReact
                        options={position}
                        change={(e) => changeSelect('position', e)}
                        value={selectPosition}
                        placeholder={'position'}
                    />

                    <MultiSelectReact
                        options={addPositions}
                        change={(e) => changeSelect('addPositions', e)}
                        value={selectAddPositions}
                        placeholder={'add positions'}
                    />
                </Col>

                <Col xs={4} sm={3} md={2} className='buttons'>
                    <button >
                        <Icon path={mdiCheck}
                            size={1}
                            color={'#0ACF97'}

                        />
                    </button>

                    <button onClick={clearFilter}>
                        <Icon path={mdiDeleteSweepOutline}
                            size={1}
                            color={'#FA5C7C'}

                        />
                    </button>

                    <button>
                        <Icon path={mdiClose}
                            size={1}
                            color={'#6C757D'}
                        />
                    </button>

                </Col>
            </Row>
        </div>
    )
}

export default Filter