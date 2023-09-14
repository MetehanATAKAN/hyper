import React, { useState, useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import PharmacySplitPercentProblem from '../../../../components/Modals/PharmacySplitPercentProblem';
import { FetchApiPost } from '../../../../utils/http.helper';
import { useHistory } from 'react-router-dom';
import GlobalModal from '../../../../components/GlobalNew/Modal';
import { NewInput, NewTextArea } from '../../../../components/GlobalNew/Inputs';

const Colors = ({ label, color }) => {
    const { t } = useTranslation();
    return (
        <div style={{ color: `rgb(${color})`, display: 'flex', alignItems: 'center', fontWeight: '500' }}>
            <div
                style={{
                    width: '14px',
                    height: '14px',
                    backgroundColor: `rgba(${color}, 0.5)`,
                    borderRadius: '3px',
                    marginRight: '8px',
                }}></div>{' '}
            {t(label)}
        </div>
    );
};

const AddDepartmantModal = ({ isShow, setIsShow, tableData, setTableData }) => {

    const { t } = useTranslation();
    const history = useHistory();

    // department name
    const [departmentName, setDepartmentName] = useState('');

    // abbreviation
    const [abbreviation, setAbbreviation] = useState('');

    // department overview
    const [departmentOverview, setDepartmentOverview] = useState('');

    const [color, setColor] = useState("")

    const [filteredList, setFilteredList] = useState(tableData);


    const [errorShow, setErrorShow] = useState(false);


    const handleClose = () => {
        setErrorShow(false);
    }

    const items = [
        { label: <Colors color="0, 160, 223" label={'Blue'} />, key: '0, 160, 223' }, // remember to pass the key prop
        { label: <Colors color="108, 117, 125" label={'Gray'} />, key: '108, 117, 125' },
        { label: <Colors color="10, 207, 151" label={'Green'} />, key: '10, 207, 151' },
        { label: <Colors color="255, 188, 0" label={'Yellow'} />, key: '255, 188, 0' },
        { label: <Colors color="250, 92, 124" label={'Red'} />, key: '250, 92, 124' },
        { label: <Colors color="57, 175, 209" label={'Turquoise'} />, key: '57, 175, 209' },
        { label: <Colors color="114, 124, 245" label={'Indigo'} />, key: '114, 124, 245' },
        { label: <Colors color="107, 94, 174" label={'Purple'} />, key: '107, 94, 174' },
        { label: <Colors color="255, 103, 155" label={'Pink'} />, key: '255, 103, 155' },
        { label: <Colors color="253, 126, 20" label={'Orange'} />, key: '253, 126, 20' },
        { label: <Colors color="2, 168, 181" label={'Teal'} />, key: '2, 168, 181' },
    ];

    const addDepartment = async () => {
        const departmantNameEqual = tableData.filter(item => item.departments === departmentName);

        if (departmantNameEqual.length !== 0) {
            setErrorShow(true)
        }
        else {

            const departmentBody = {
                DepartmentName: departmentName.trim(),
                Abbreviation: abbreviation.trim(),
                DepartmentOverview: departmentOverview.trim(),
                Color: color !== '' ? color : 'd1eff9',
                CreatedBy: localStorage.getItem('userName')
            }
            FetchApiPost('services/Hr/Department/CreateDepartment ', 'POST', departmentBody)
                .then((res) =>
                    (async () => {
                        try {
                            if (res.status === 201) {
                                res.json().then(item => {
                                    return (
                                        setTimeout(() => {
                                            setIsShow(false);
                                            window.location.reload();
                                        }, 1000)
                                    )
                                })
                            }
                            else if (res.status === 409) {
                                setErrorShow(true);
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
    }

    const filterBySearch = (event) => {
        setDepartmentName(event.target.value);
        const query = event.target.value;
            let updateList = tableData;

            updateList = updateList.filter(function (item) {
                return item.departments.toLowerCase().search(query.toLowerCase()) !== -1;
            });
            console.log(query);
            console.log(updateList);
        if(event.target.value.length === 0) {
            setFilteredList([])
        }else{
            setFilteredList(updateList);
        }
    }

    useEffect(() => {
        if (departmentName !== '') {
            const test = departmentName.charAt(0).toUpperCase() + departmentName.slice(1);
            setDepartmentName(test);
        }
    }, [departmentName]);

    useEffect(() => {
        if (abbreviation !== '') {
            const upperCaseDepartmentName = abbreviation.toUpperCase();
            setAbbreviation(upperCaseDepartmentName);
        }
    }, [abbreviation])


    return (
        <div className="process-type-form ">
            <GlobalModal 
                showModal={isShow}
                setShowModal={setIsShow}
                toggle={() => setIsShow(false)}
                header={t('add Department')}
                size={'md'}
                body={
                    <>
                        <div>
                            <NewInput
                                value={departmentName}
                                setValue={setDepartmentName}
                                label="department name"
                                isStar={true}
                                placeholder="search department..."
                                width="100%"
                                listName="datalistOption"
                            />

                            {filteredList?.length > 0 && (
                                <datalist id="datalistOption" style={{ width: '100%' }}>
                                    {filteredList.map((item, index) => (
                                        <option style={{ minWidth: '300px' }} key={index} value={item?.departments} />
                                    ))}
                                </datalist>
                            )}

                        </div>

                        {errorShow && (
                            <PharmacySplitPercentProblem
                                show={errorShow}
                                handleClose={handleClose}
                                messages={t('System has') + ' ' + t(`${ departmentName }`) + ' ' +  t('department name')}
                            />
                        )}

                            <div>
                            <NewInput
                                width={'100%'}
                                value={abbreviation}
                                setValue={setAbbreviation}
                                label="abbreviation"
                                isDropDown={true}
                                isStar={true}
                                isUpperCase={true}
                                btnTooltip="Colors"
                                btnIcon={<i className="fas fa-ellipsis-h"></i>}
                                dropDownItems={items}
                                dropDownSetValue={setColor}
                            />
                            </div>

                            <div>
                            <NewTextArea
                                label={"department overview"}
                                value={departmentOverview}
                                setValue={setDepartmentOverview}
                                width="100%"
                                isStar={true}
                                placeholder="department overview"
                            />
                            </div>
                    </>
                }

                footer={
                    <>
                    <Button onClick={() => setIsShow(false)} variant="secondary">
                    {t('cancel')}
                    </Button>
                    <Button
                        disabled={departmentName.trim().length !== 0 && abbreviation.trim().length !== 0 && departmentOverview.trim().length !== 0 ? false : true}
                        variant="primary"
                        onClick={() => addDepartment()}
                        >
                        {t('add')}
                    </Button>
                </>
                }
            />
           
        </div>
    )
}

export default AddDepartmantModal