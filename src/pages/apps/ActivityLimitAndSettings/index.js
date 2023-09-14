import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ResponsiveTable from '../../tables/Basic';
import ActivityIndex from './Activity';
import ActivityLocation from './ActivityLocation';
import BudgetIndex from './Budget';
import OwnersIndex from './Owners';
import PartcipiantsIndex from './Partcipiants';
import { Modal, Button } from 'react-bootstrap';
import BorderedTabs from '../../uikit/BorderedTabs';
import ProductMixTable from './ProductMix/ProductMixTable';
import { useTranslation } from 'react-i18next';
import ProductMixIndex from './ProductMix';
import ProjectGannt from '../Projects/Gantt';
import ActivityLimitandSettingsMainTable from './ActivityLimitandSettingsMainTable';
import { alsModal } from '../../../redux/actions';
import ALSReccurence from './Reccurence/ALSReccurence';
import { useHistory } from 'react-router-dom';
import { FetchApiPost } from '../../../utils/http.helper';

const Index = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const modal = useSelector((state) => state.ActivityLimit.alsModal);
    const tabsDısabled = useSelector((state) => state.ActivityLimit);
    const { t } = useTranslation();
    // const [modal, setModal] = useState(false);
    const [size, setSize] = useState(null);
    const [className, setClassName] = useState(null);
    const [scroll, setScroll] = useState(null);

    /**
     * Show/hide the modal
     */
    const toggle = () => {
        // setModal(!modal);
        dispatch(alsModal(!modal));
    };

    /**
     * Opens large modal
     */
    const openModalWithSize = (size) => {
        setSize(size);
        setClassName(null);
        setScroll(null);
        toggle();
    };

    const tabContents = [
        {
            id: '1',
            title: t('Activity'),
            text: <ActivityIndex />,
            disabled: false,
        },
        {
            id: '2',
            title: t('Owners'),
            text: <OwnersIndex />,
            disabled: false,
            // tabsDısabled.ownersIsDisabled
        },
        {
            id: '3',
            title: t('Participants'),
            text: <PartcipiantsIndex />,
            disabled: false,
            // tabsDısabled.participantsIsDisabled
        },
        {
            id: '4',
            title: t('Budget'),
            text: <BudgetIndex />,
            disabled: false,
        },
        {
            id: '5',
            title: t('Product Mix'),
            text: <ProductMixIndex />,
            disabled: false,
        },
        {
            id: '6',
            title: t('Location'),
            text: <ActivityLocation />,
            disabled: false,
        },
        {
            id: '7',
            title: t('Recurrent'),
            text: <ALSReccurence />,
            disabled: false,
        },
    ];

    return (
        <div className="activity-main">
            {/* <ProjectGannt/> */}
            <ActivityLimitandSettingsMainTable openModal={openModalWithSize} />
            <>
                <Modal show={modal} onHide={toggle} dialogClassName={className} size={'lg'} scrollable={scroll} clas>
                    <Modal.Header onHide={toggle} closeButton style={{ backgroundColor: '#FFFFFF', color: '#000000' }}>
                        <h4 className="modal-title">{t('Add Activity Limit and Settings')}</h4>
                    </Modal.Header>
                    <Modal.Body>{<BorderedTabs tabContents={tabContents} />}</Modal.Body>
                </Modal>
            </>
        </div>
    );
};

export default Index;
