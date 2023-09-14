import React, { useEffect, useState } from 'react';
import { MultipleSelects } from '../../../../../components/GlobalNew/Selects';
import { FetchApiPost } from '../../../../../utils/http.helper';
import { useHistory } from 'react-router-dom';

const Spec = ({ selectSpec, setSelectSpec, selectedBusUnit, selectedDate, selectedClient, status }) => {
    const [optionsSpec, setOptionsSpec] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const data = {
            busId: selectedBusUnit.value,
            year: selectedDate ? new Date(selectedDate).getFullYear() : new Date().getFullYear(),
        };
        FetchApiPost('api/OldSystem/GetSpec', 'POST', data).then((res) => {
            if (res.status === 200 || res.status === 201) {
                res.json().then((data) => setOptionsSpec(data.map((el) => ({ value: el.Id, label: el.Val1 }))));
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    }, []);
    const handleChange = (value, label) => {
        const arr = label?.map((el) => ({ ...el, category: [] }));
        setSelectSpec(arr);
    };
    const allSelect = () => {
        const arr = optionsSpec?.map((el) => ({ ...el, category: [] }));
        setSelectSpec(arr);
    };
    return (
        <MultipleSelects
            disabled={selectedClient ? false : true}
            label={'spec'}
            selectedItems={selectSpec}
            setSelectedItems={() => {}}
            handleChange={handleChange}
            allClear={() => setSelectSpec([])}
            allSelect={allSelect}
            options={optionsSpec}
            width={'100%'}
            status={status}
        />
    );
};

export default React.memo(Spec);
