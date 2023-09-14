import React, { useEffect } from 'react';
import { MultipleSelects } from '../../../../../components/GlobalNew/Selects';
import { useTranslation } from 'react-i18next';
import { FetchApiGet, FetchApiPost } from '../../../../../utils/http.helper';
import { mdiCheck, mdiDeleteSweepOutline, mdiClose } from '@mdi/js';
import Icon from '@mdi/react';

const Filter = ({
    selectCountries,
    setSelectCountries,
    selectProducts,
    setSelectProducts,
    selectIndications,
    setSelectIndications,
    selectProfiles,
    setSelectProfiles,
    selectSpecializations,
    setSelectSpecializations,
    selectStatus,
    setSelectStatus,
    countries,
    products,
    indications,
    profiles,
    specializations,
    status,
    setCountries,
    setProducts,
    setIndications,
    setProfiles,
    setSpecializations,
    setStatus,
    setCloseFilter,
    selectLink,
    setSelectLink,
    link,
    setLink,
    needFilter,
}) => {
    const { t } = useTranslation();
    const filterComponentsData = [
        {
            label: 'Countries',
            options: countries,
            state: selectCountries,
            setState: setSelectCountries,
        },
        {
            label: 'Product',
            options: products,
            state: selectProducts,
            setState: setSelectProducts,
        },
        {
            label: 'Indication',
            options: indications,
            state: selectIndications,
            setState: setSelectIndications,
        },
        {
            label: 'Profile',
            options: profiles,
            state: selectProfiles,
            setState: setSelectProfiles,
        },
        {
            label: 'Specialization',
            options: specializations,
            state: selectSpecializations,
            setState: setSelectSpecializations,
        },
        {
            label: 'Link',
            options: link,
            state: selectLink,
            setState: setSelectLink,
        },
        {
            label: 'Status',
            options: status,
            state: selectStatus,
            setState: setSelectStatus,
        },
    ];

    useEffect(() => {
        if (selectProducts.length !== 0) {
            if (selectProducts.length === products.length) {
                setSelectStatus([
                    { value: 1, label: t('Editable') },
                    { value: 2, label: t('Approval') },
                    { value: 3, label: t('Approved') },
                    { value: 4, label: t('Reject') },
                ]);
            }
        }
    }, [
        selectProducts,
        selectCountries,
        selectIndications,
        selectProfiles,
        products,
        countries,
        indications,
        profiles,
    ]);

    useEffect(() => {
        if (products.length !== 0 && selectProducts.length === 0) {
            setSelectStatus([]);
        } else if (countries.length !== 0 && selectCountries.length === 0) {
            setSelectProducts([]);
            setSelectStatus([]);
        } else if (indications.length !== 0 && selectIndications.length === 0) {
            setSelectStatus([]);
        } else if (profiles.length !== 0 && selectProfiles.length === 0) {
            setSelectStatus([]);
        }
    }, [
        selectProducts,
        selectCountries,
        selectIndications,
        selectProfiles,
        products,
        countries,
        indications,
        profiles,
    ]);

    useEffect(() => {
        try {
            FetchApiGet('api/OldSystem/GetCountries', 'GET')
                .then((res) => res.json())
                .then(
                    (data) => (
                        setSelectCountries(
                            data.map((item) => ({
                                value: item.CountryId,
                                label: item.CountryName,
                            }))
                        ),
                        setCountries(
                            data.map((item) => ({
                                value: item.CountryId,
                                label: item.CountryName,
                            }))
                        )
                    )
                );
            /*
            CountryAbb
            CountryName
            CountryId
        */
            FetchApiGet('api/OldSystem/GetAllGlobalBrands', 'GET')
                .then((res) => res.json())
                .then(
                    (data) => (
                        setProducts(
                            data.map((item) => ({
                                value: item.GlobalBrandId,
                                label: item.GlobalBrandName,
                            }))
                        ),
                        setSelectProducts(
                            data.map((item) => ({
                                value: item.GlobalBrandId,
                                label: item.GlobalBrandName,
                            }))
                        )
                    )
                );
        } catch (err) {
            console.log(err);
        }
        /*
            globalBrandAbb
            globalBrandName
            globalBrandId
        */
    }, []);

    useEffect(() => {
        const productId = selectProducts.map((item) => item.value);
        const str = productId.join(',');
        FetchApiPost('api/OldSystem/GetIndicationsForContentByBrandIds', 'POST', {
            brandIds: str,
        })
            .then((res) => res.json())
            .then(
                (res) => (
                    setIndications(
                        res.map((item) => ({
                            value: item.IndicationId,
                            label: item.Indication,
                        }))
                    ),
                    setSelectIndications(
                        res.map((item) => ({
                            value: item.IndicationId,
                            label: item.Indication,
                        }))
                    )
                )
            );
        /*
            Indication
            IndicationId
        */
    }, [selectProducts]);

    useEffect(() => {
        const productId = selectProducts.map((item) => item.value);
        const productStr = productId.join(',');
        const indicationId = selectIndications.map((item) => item.value);
        const indicationStr = indicationId.join(',');
        FetchApiPost('api/OldSystem/GetProfileForContentByIndicationId', 'POST', {
            brandIds: productStr,
            indicationIds: indicationStr,
        })
            .then((res) => res.json())
            .then(
                (res) => (
                    setProfiles(
                        res.map((item) => ({
                            value: item.ProfileId,
                            label: item.Profile,
                        }))
                    ),
                    setSelectProfiles(
                        res.map((item) => ({
                            value: item.ProfileId,
                            label: item.Profile,
                        }))
                    )
                )
            );
        /*
            Indication
            IndicationId
        */
    }, [selectIndications]);

    useEffect(() => {
        const productId = selectProducts.map((item) => item.value);
        const productStr = productId.join(',');
        const indicationId = selectIndications.map((item) => item.value);
        const indicationStr = indicationId.join(',');
        const profileId = selectProfiles.map((item) => item.value);
        const profileStr = profileId.join(',');
        FetchApiPost('api/OldSystem/GetSpecsForContent', 'POST', {
            brandIds: productStr,
            indicationIds: indicationStr,
            profileIds: profileStr,
        })
            .then((res) => res.json())
            .then(
                (res) => (
                    setSpecializations(
                        res.map((item) => ({
                            value: item.SpecId,
                            label: item.SpecName,
                        }))
                    ),
                    setSelectSpecializations(
                        res.map((item) => ({
                            value: item.SpecId,
                            label: item.SpecName,
                        }))
                    )
                )
            );
        /*
            SpecName
            SpecId
            SpecAbb
        */
    }, [selectProfiles]);

    const deleteFilter = () => {
        setSelectCountries([]);
        setSelectProducts([]);
        setSelectIndications([]);
        setSelectProfiles([]);
        setSelectSpecializations([]);
        setSelectStatus([]);
    };

    return (
        <div
            className="d-flex flex-wrap"
            style={{
                columnGap: '.4rem',
                rowGap: '.5rem',
                marginBottom: '16px',
            }}>
            {filterComponentsData.map((item, key) => (
                <MultipleSelects
                    key={key}
                    className="filter-radius"
                    size="small"
                    label={item.label}
                    selectedItems={item.state}
                    setSelectedItems={item.setState}
                    options={item.options}
                    placeholder={item.label}
                    width="143px"
                />
            ))}
            <div style={{ width: 'min-content' }} className="filter-select-buttons">
                <Icon
                    onClick={() => needFilter()}
                    className="filter-button-icons"
                    path={mdiCheck}
                    size={1}
                    color={'#0ACF97'}
                />
                <Icon
                    path={mdiDeleteSweepOutline}
                    onClick={() => deleteFilter()}
                    className="filter-button-icons"
                    size={1}
                    color={'#FA5C7C'}
                />
                <Icon
                    path={mdiClose}
                    onClick={() => setCloseFilter(true)}
                    size={1}
                    color={'#6C757D'}
                    className="filter-button-icons"
                />
            </div>
        </div>
    );
};

export default Filter;
