import React, { useState } from 'react';
import GlobalModal from '../../../../../components/GlobalNew/Modal';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import TableComponent from './TableComponent';

const ViewModal = ({ show, setShow, selectedItem }) => {
  const { t } = useTranslation();
  const [isClickAdd, setIsClickAdd] = useState(false);
  const [addButtonDisableStatus, setAddButtonDisableStatus] = useState(true)

  const [tableData, setTableData] = useState([
    {
      fromPlace: 'hospital',
      fromName: 'avcılar hospital',
      toPlace: 'hospital',
      toName: 'beylikdüzü hospital'
    },
    {
      fromPlace: 'hospital',
      fromName: 'avcılar hospital',
      toPlace: 'hospital',
      toName: 'beylikdüzü hospital'
    },
    {
      fromPlace: 'hospital',
      fromName: 'avcılar hospital',
      toPlace: 'hospital',
      toName: 'beylikdüzü hospital'
    }
  ])

  const columns = [
    {
      header: t('From'),
      accessorKey: 'fromPlace',
    },
    {
      header: '',
      accessorKey: 'fromName',
    },
    {
      header: t('To'),
      accessorKey: 'toPlace',
    },
    {
      header: '',
      accessorKey: 'toPlace',
    },
  ]
    return (
        <>
            {show && (
                <GlobalModal
                    showModal={show}
                    setShowModal={setShow}
                    toggle={() => setShow(false)}
                    header={t('View')}
                    size={'lg'}
                    body={
                      <>
                        <TableComponent
                      data={tableData}
                      columns={columns}
                      isAccordion={true}
                      isFilter={false}
                      isShowNewBtn={false}
                      // handleDropDownItemClick={statusClick}
                      // dropdownOptions={statusOptions}
                 
                      // isLoading={loader}
                   
                      // handlApplyBtn={getFilterData}
                    
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
                                disabled={addButtonDisableStatus}
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
