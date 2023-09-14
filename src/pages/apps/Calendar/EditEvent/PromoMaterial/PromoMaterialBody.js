import React, { useEffect, useState } from 'react';
import { Button, Col, InputGroup, Modal } from 'react-bootstrap';
import Select from 'react-select';
import '../../../../../assets/scss/custom/components/promoMaterial.scss';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const PromoMaterialBody = (props) => {
    const { label, setButtonDisable, data, selectPromoMaterial, setSelectPromoMaterial } = props;
    const { t } = useTranslation();
    const appStatus = useSelector((state) => state.Calendar.appStatus);

    const [selectMaterial, setSelectMaterial] = useState({
        BrandId: 0,
        SubTypeId: 0,
        SubTypeAbb: '-',
        SubTypeName: '-',
        label: 'Select Material',
        url: '-',
    });

    useEffect(() => {
        setButtonDisable({ disable: false, message: null });
    }, []);
    const handleChange = (event) => {
        console.log(event);
        setSelectMaterial(event);
    };
    useEffect(() => {
        if (appStatus !== 4) {
            setSelectPromoMaterial((prev) => prev.SubTypeId !== 0 && [...prev, selectMaterial]);
        }
    }, [selectMaterial, setSelectPromoMaterial]);

    const options =
        data[0] &&
        data[0].promoMaterialSubTypes?.map((el) => ({
            BrandId: data[0].BrandId,
            SubTypeId: el.SubTypeId,
            SubTypeAbb: el.SubTypeAbb,
            SubTypeName: el.SubTypeName,
            label: el.SubTypeUniqId,
            url: el.DocumentUrl,
        }));
    useEffect(() => {
        if (appStatus === 4) {
            data[0] &&
                data[0].promoMaterialSubTypes?.map((el) =>
                    setSelectMaterial({
                        BrandId: data[0].brandId,
                        SubTypeId: el.subTypeId,
                        SubTypeAbb: el.subTypeAbb,
                        SubTypeName: el.subTypeName,
                        label: el.subTypeUniqId,
                        url: el.documentUrl,
                    })
                );
        }
    }, [data]);
    const openFile = (event) => {
        if (event.target.id !== '-' && event.target.id !== 'undefined') {
            const link = document.createElement('a');
            link.href = `${event.target.id}`;
            link.setAttribute('download', `document.pdf`);
            document.body.appendChild(link);
            link.target = '_blank';
            link.click();
            link.parentNode.removeChild(link);
        }
    };
    return (
        <>
            <label>{label}</label>
            <InputGroup className="mb-3" size="md" style={{ height: '20px' }}>
                <InputGroup.Text className="skuAbb" title={selectMaterial.SubTypeName}>
                    {selectMaterial.SubTypeAbb}
                </InputGroup.Text>
                <Col>
                    <Select
                        isMulti={false}
                        className="react-select"
                        classNamePrefix="react-select"
                        options={options}
                        onChange={handleChange}
                        value={selectMaterial}
                        isDisabled={appStatus === 4 ? true : false}
                    />
                </Col>
                <Button
                    variant="outline-secondary"
                    className="promo-material-btn"
                    id={`${selectMaterial.url}`}
                    onClick={openFile}>
                    <i id={`${selectMaterial.url}`} className="fas fa-eye"></i>
                </Button>
            </InputGroup>
        </>
    );
};

export default React.memo(PromoMaterialBody);
