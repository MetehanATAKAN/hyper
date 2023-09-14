import React, { useEffect, useMemo, useState } from 'react';
import Filter from './Filter';
import ModalTable from '../Tables';
import { FetchApiPost } from '../../../../../../../utils/http.helper';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { setProfileData } from '../../../../../../../redux/ProductStrategy/actions';

const ModalPage1 = ({
    data,
    setData,
    rowSelection,
    setRowSelection,
    setProfileData,
    selectYear,
    setSelectYear,
    selectCompany,
    setSelectCompany,
    selectBusUnit,
    setSelectBusUnit,
    selectSpec,
    setSelectSpec,
    selectGlobalBrand,
    setSelectGlobalBrand,
    selectWorkPlace,
    setSelectWorkPlace,
    selectClient,
    setSelectClient,
    selectPlace,
    setSelectPlace,
    selectPlaceType,
    setSelectPlaceType,
    selectTypeOfPriority,
    setSelectTypeOfPriority,
    selectClientType,
    setSelectClientType,
}) => {
    const history = useHistory();
    const empId = localStorage.getItem('userEmpId');
    const dispatch = useDispatch();
    const [isFilter, setIsFilter] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const columns = useMemo(
        () => [
            {
                enableColumnDragging: false,
                enableColumnActions: false,
                enableResizing: false,
                accessorKey: 'indication',
                header: 'Indication / Profile',
            },
            {
                enableColumnDragging: false,
                enableColumnActions: false,
                enableResizing: false,
                muiTableBodyCellProps: {
                    align: 'center',
                },
                accessorKey: 'patientNumber',
                header: 'Patient Number',
            },
            {
                enableColumnDragging: false,
                enableColumnActions: false,
                enableResizing: false,
                muiTableBodyCellProps: {
                    align: 'center',
                },
                accessorKey: 'category',
                header: 'Category',
            },
            {
                enableColumnDragging: false,
                enableColumnActions: false,
                enableResizing: false,
                muiTableBodyCellProps: {
                    align: 'center',
                },
                accessorKey: 'loyalty',
                header: 'Actual Loyalty',
            },
        ],
        []
    );

    const getFilterData = () => {
        setIsLoading(true);
        const data = {
            yearId: selectYear.value,
            companyId: selectCompany.value,
            businessUnitId: selectBusUnit.value,
            placeIds: [selectPlace.value],
            placeTypeIds: [selectPlaceType.value],
            typeOfPriorityIds: [selectTypeOfPriority.value],
            clientTypeIds: selectClientType ? [selectClientType.value] : [0],
            specIds: selectSpec.length <= 0 ? [] : [selectSpec.value],
            brandIds: [selectGlobalBrand.value],
        };
        FetchApiPost('services/Pages/PromoStrategy/GetPromoStrategyCreateData', 'POST', data)
            .then((res) => {
                if (res.status === 200 || res.status === 201) {
                    res.json().then(({ data }) => {
                        setIsLoading(false);
                        setIsFilter(false);
                        setData(data);
                    });
                }
                if (res.status === 500 || res.status === 502) {
                    history.push('/error-500');
                }
            })
            .catch((err) => console.log(err));
    };
    useEffect(() => {
        const trueProfileIds = Object.keys(rowSelection).filter((id) => rowSelection[id]);
        const trueIndicationIds = data
            .filter((item) =>
                item.profileDetails.some((detail) => trueProfileIds.includes(detail.profileId.toString()))
            )
            .map((item) => item.indicationId.toString());
        const arr = data.filter((item) => trueIndicationIds.includes(item.indicationId.toString()));
        const result = arr.map((x) => ({
            ...x,
            profileDetails: x.profileDetails.map((y) => ({
                ...y,
                selectChain: {
                    group1: ['P', 'C1', 'C2'],
                    group2: ['P', 'C1', 'C2'],
                    group3: ['P', 'C1', 'C2'],
                    group4: ['P', 'C1', 'C2'],
                },
            })),
        }));
        // dispatch(setProfileData(result));
        setProfileData(result);
    }, [rowSelection]);
    const tableData = useMemo(() => {
        const arr = data?.map((indication, i) => ({
            id: indication.indicationId,
            indication: indication.indicationName,
            patientNumber: indication.patientNumber,
            category: indication.category,
            loyalty: indication.loyalty,
            subRows: indication.profileDetails?.map((profile, j) => ({
                id: profile.profileId,
                indication: profile.profileName,
                patientNumber: profile.patientNumber,
                category: profile.category,
                loyalty: profile.loyalty,
            })),
        }));
        return arr;
    }, [data]);
    return (
        <div>
            <ModalTable
                data={tableData}
                columns={columns}
                filterShow={isFilter}
                setFilterShow={setIsFilter}
                isShowNewBtn={false}
                isLoading={isLoading}
                handlApplyBtn={getFilterData}
                rowSelection={rowSelection}
                setRowSelection={setRowSelection}
                filter={
                    <Filter
                        selectYear={selectYear}
                        setSelectYear={setSelectYear}
                        selectCompany={selectCompany}
                        setSelectCompany={setSelectCompany}
                        selectBusUnit={selectBusUnit}
                        setSelectBusUnit={setSelectBusUnit}
                        selectSpec={selectSpec}
                        setSelectSpec={setSelectSpec}
                        selectGlobalBrand={selectGlobalBrand}
                        setSelectGlobalBrand={setSelectGlobalBrand}
                        selectWorkPlace={selectWorkPlace}
                        setSelectWorkPlace={setSelectWorkPlace}
                        selectClient={selectClient}
                        setSelectClient={setSelectClient}
                        selectPlace={selectPlace}
                        setSelectPlace={setSelectPlace}
                        selectPlaceType={selectPlaceType}
                        setSelectPlaceType={setSelectPlaceType}
                        selectTypeOfPriority={selectTypeOfPriority}
                        setSelectTypeOfPriority={setSelectTypeOfPriority}
                        selectClientType={selectClientType}
                        setSelectClientType={setSelectClientType}
                    />
                }
            />
        </div>
    );
};

export default React.memo(ModalPage1);
