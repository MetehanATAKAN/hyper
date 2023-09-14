import React, { useState } from 'react';
import TableAccordion from '../../../../components/Tables/TableAccordion';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { FetchApiGet } from '../../../../utils/http.helper';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import GlobalModal from '../../../../components/GlobalNew/Modal';
import { Button } from 'react-bootstrap';


const Details = ({
    detailsId,
    open,
    setOpen
}) => {

    const { t } = useTranslation();
    const history = useHistory();

  
    /**table data */
    const [data, setData] = useState([]);

    /**table data loading */
    const [dataLoading, setDataLoading] = useState(false);

    const columns = [
        {
            header: t('Account Name'),
            accessorKey: 'accountName',
            size: '120'
        },
        {
            header: t('Name'),
            accessorKey: 'name',
            size: '150'
        },
        {
            header: t('Account Type'),
            accessorKey: 'accountType',
            size: '150'
        },
        {
            header: t('Account Sub Type'),
            accessorKey: 'accountSubType',
            size: '150'
        },
        {
            header: t('Account Number'),
            accessorKey: 'accountNumber',
            size: '150'
        },
        {
            header: t('IBAN'),
            accessorKey: 'iban',
            size: '150'
        },
        {
            header: t('Currency'),
            accessorKey: 'currency',
            size: '150'
        },
        {
            header: t('Account Priority'),
            accessorKey: 'accountPriority',
            size: '150'
        }
    ]


    
    useEffect(() => {
        setDataLoading(true);
        FetchApiGet(`services/Finance/Branch/GetDetailsByBranchId?branchId=${detailsId}`,'GET')
        .then(res => {
            setDataLoading(false);
            if (res.status === 200) {
                res.json().then(data => {
                   setData(data.data?.map(el =>(
                    {
                        accountName:el.accountName,
                        name:el.name,
                        accountType:el.accountType,
                        accountSubType:el.accountSubType,
                        accountNumber:el.accountNumber,
                        iban:el.iban,
                        currency:el.currency,
                        accountPriority:el.accountPriority
                    }
                   )))
                })
            }
            else if(res.status === 409) {
                history.push('/error-500');
            }
            else {
                history.push('/error-500');
            }
        })
    }, [detailsId, history])
    

    


    return (
        <>
        <GlobalModal
        showModal={open}
        setShowModal={()=>setOpen(false)}
        toggle={()=>setOpen(false)}
        header='Details'
        size='xl'
        body={
            <TableAccordion
                data={data}
                columns={columns}
                filterShow={false}
                enableExpanding={false}
                isShowNewBtn={false}
                isTopToolbarShow={false}
                isCheckBox={false}
                isLoading={dataLoading}
            />
        }
        footer={
            <Button onClick={()=>setOpen(false)} variant="light">
                {t('back')}
            </Button>
        }
        />
        </>
    )
}

export default Details