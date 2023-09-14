import React from 'react';
import { useTranslation } from 'react-i18next';
import { NewInput, NewTextArea } from '../../../../../components/GlobalNew/Inputs';
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
const MainCategory = (props) => {
    const { mainCategoryModalProps, mainCategoryModalStatus } = props;
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
    return (
        <div>
            <NewInput
                width={'100%'}
                value={mainCategoryModalProps[0].state}
                setValue={mainCategoryModalProps[0].setState}
                placeholder="main category"
                label="main category"
                status={mainCategoryModalStatus[0].status}
                isDropDown={true}
                isStar={true}
                btnTooltip="Colors"
                btnIcon={<i className="fas fa-ellipsis-h"></i>}
                dropDownItems={items}
                dropDownStatus={mainCategoryModalStatus[1].status}
                dropDownSetValue={mainCategoryModalProps[1].setState}
            />
            <NewInput
                placeholder="abbreviation"
                width={'100%'}
                value={mainCategoryModalProps[2].state}
                setValue={mainCategoryModalProps[2].setState}
                status={mainCategoryModalStatus[2].status}
                label="abbreviation"
                isStar={true}
            />
            <NewTextArea
                value={mainCategoryModalProps[3].state}
                setValue={mainCategoryModalProps[3].setState}
                status={mainCategoryModalStatus[3].status}
                label="description"
                placeholder="description"
                isStar={true}
            />
        </div>
    );
};

export default React.memo(MainCategory);
