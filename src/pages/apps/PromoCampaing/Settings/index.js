import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import TableAccordion from '../../../../components/Tables/TableAccordion';
import { FetchApiPost } from '../../../../utils/http.helper';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton, Tooltip } from '@mui/material';
import EditModal from './EditModal';
const CampaingSettings = () => {
    const { t } = useTranslation();
    const empId = localStorage.getItem('userEmpId');
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [dataById, setDataById] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const column = useMemo(
        () => [
            {
                accessorKey: 'name',
                header: t('Name'),
                size: 75,
            },
            {
                accessorKey: 'description',
                header: t('Description'),
                size: 275,
                Cell: ({ cell }) => (
                    <Tooltip title={cell.getValue()} placement="bottom-start" arrow>
                        <span>{cell.getValue()}</span>
                    </Tooltip>
                ),
            },
            {
                accessorKey: 'language',
                header: t('Language'),
                maxSize: 49,
            },
            {
                enableColumnFilter: false,
                accessorKey: 'action',
                header: '',
                maxSize: 20,
            },
        ],
        []
    );
    const getAllCampaignSettingsData = useCallback(() => {
        FetchApiPost('services/Organization/Organization/CampaignSetting/GetCampaignSetting', 'POST', {
            empId: empId,
        }).then((res) => {
            if (res.status === 200) {
                res.json().then(({ data }) => {
                    setData(data);
                    setLoading(false);
                });
            }
            if (res.status === 500 || res.status === 502) {
                history.push('/error-500');
            }
        });
    }, [empId, history]);

    useEffect(() => {
        getAllCampaignSettingsData();
    }, [getAllCampaignSettingsData]);
    const tableData = useMemo(
        () =>
            data?.map((el) => ({
                // id: el.id,
                name: el.name,
                description: el.description,
                language: el.languageName?.toUpperCase(),
                action: (
                    <Tooltip title={t('edit')} arrow>
                        <IconButton
                            onClick={() => {
                                setShowEditModal(true);
                                setDataById(el);
                            }}
                            size="small">
                            <EditIcon sx={{ width: 18, height: 18 }} />
                        </IconButton>
                    </Tooltip>
                ),
                subRows: el.detail?.map((detail) => ({
                    // id: detail.id,
                    name: detail.name,
                    description: detail.description,
                    language: detail.languageName?.toUpperCase(),
                    action: (
                        <Tooltip title={t('edit')} arrow>
                            <IconButton
                                onClick={() => {
                                    setShowEditModal(true);
                                    setDataById(detail);
                                }}
                                size="small">
                                <EditIcon sx={{ width: 18, height: 18 }} />
                            </IconButton>
                        </Tooltip>
                    ),
                })),
            })),
        [data]
    );
    return (
        <>
            <TableAccordion
                data={tableData}
                isLoading={loading}
                columns={column}
                isCheckBox={false}
                isFilter={false}
                isShowNewBtn={false}
            />
            {showEditModal && (
                <EditModal
                    showModal={showEditModal}
                    setShowModal={setShowEditModal}
                    data={dataById}
                    getData={getAllCampaignSettingsData}
                />
            )}
        </>
    );
};

export default React.memo(CampaingSettings);
