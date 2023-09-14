import React, { useEffect, useState } from 'react';
import GlobalModal from '../../../../../components/GlobalNew/Modal';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import TableComponent from './TableComponent';
import { FetchApiGet, FetchApiPost } from '../../../../../utils/http.helper';

const ViewModal = ({ show, setShow, selectedItem }) => {
  const { t } = useTranslation();
  const [isClickAdd, setIsClickAdd] = useState(false);
  const [addButtonDisableStatus, setAddButtonDisableStatus] = useState(true)
  const [loader, setLoader] = useState(false);

  const [tableData, setTableData] = useState([]);

  const [rowSelection, setRowSelection] = useState({});

  const columns = [
    {
      header: t('To'),
      accessorKey: 'name',
    },
    {
      header: '',
      accessorKey: 'to',
    },
  ]

  useEffect(() => {
    setLoader(true)
    FetchApiGet(`services/CRM/WorkPlace/GetConnectedWorkPlacesByWorkPlaceId?id=${selectedItem.id}`, 'GET')
      .then(res => {
        if(res.status === 200 || res.status === 201){
          res.json().then(({ data }) => {
            setLoader(false);
            setTableData(data.map(i => ({
                id: i.id,
                name: i.name,
                to: i.defination1.definationName
            })))
            let checkBox = data.filter(i => i.isConnected)
            if(checkBox.length > 0){
              let checBoxObject = {}
              checkBox.map((item, index) => (
                checBoxObject[item.id] = true
              ))
              setRowSelection(checBoxObject)
            }
          })
        }
      })
    }, [selectedItem])

    useEffect(() => {
      if(!isClickAdd) return;
      FetchApiPost('services/CRM/WorkPlace/ConnectToWorkPlace', 'POST', {
        id: selectedItem.id,
        workPlaceIds: Object.keys(rowSelection).map(i => Number(i))
      }).then(res => {
        setShow(false);
      })
    }, [isClickAdd])

    console.log(selectedItem)

    return (
        <>
            {show && (
                <GlobalModal
                    showModal={show}
                    setShowModal={setShow}
                    toggle={() => setShow(false)}
                    header={t('add View')}
                    size={'lg'}
                    body={
                      <>
                      <div style={{fontWeight: '600', fontSize: '1.2rem'}}>{selectedItem.name}</div>
                        <TableComponent
                      data={tableData}
                      columns={columns}
                      isHasStatus={false}
                      filterShow={false}
                      isNewButton={false}
                      isTopToolbarShow={false}
                      isLoading={loader}
                      rowSelection={rowSelection}
                      setRowSelection={setRowSelection}
                  />
                      </>
                    }
                    footer={
                        <>
                            <Button onClick={() => setShow(false)} variant="light">
                                {t('close')}
                            </Button>
                            <Button
                                onClick={() => setIsClickAdd(true)}
                                variant="primary">
                                {t('add')}
                            </Button>
                        </>
                    }
                />
            )}
        </>
    );
};

export default ViewModal;
