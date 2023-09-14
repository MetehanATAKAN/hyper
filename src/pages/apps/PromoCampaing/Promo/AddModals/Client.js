import React, { useEffect, useState } from 'react';
import { SingleSelects } from '../../../../../components/GlobalNew/Selects';
import { FetchApiPost } from '../../../../../utils/http.helper';
import { useHistory } from 'react-router-dom';

const Client = ({ dropdownsClient, selectClient, setSelectClient }) => {
    const history = useHistory();
    const countryId = localStorage.getItem('countryId');
    const [optionsClient, setOptionsClient] = useState([]);
    useEffect(() => {
        const data = {
            headerIds: dropdownsClient.map((el) => {
                if (el.headerId === 0) {
                    return el.id;
                }
                return el.headerId;
            }),
            countryId: Number(countryId),
            defIds: [],
        };

        FetchApiPost('services/AdminPanel/Defination/GetDefinationsByHeaderIdandDefIds', 'POST', data).then((res) => {
            if (res.status === 200 || res.status === 201) {
                res.json().then(({ data }) =>
                    setOptionsClient(
                        data?.map((el) => ({
                            value: el.definationId,
                            label: el.definationName,
                            desc: el.description,
                            headerId: el.headerId,
                        }))
                    )
                );
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    }, []);
    return (
        <>
            {dropdownsClient?.map((el) => (
                <SingleSelects
                    label={'client'}
                    selectedItems={selectClient}
                    setSelectedItems={setSelectClient}
                    options={optionsClient}
                    width={'100%'}
                />
            ))}
        </>
    );
};

export default Client;
