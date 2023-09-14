import React, { useEffect, useState } from 'react';
import { Row, Col, Tab, Nav } from 'react-bootstrap';
import Masonry from 'react-masonry-component';
import { RibbonContainer, LeftCornerRibbon } from 'react-ribbons';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';
import ContentPageTab from './ContentPageTab';
import TemplateTab from './TemplateTab';
import ContentTab from './ContentTab';
import { useHistory } from 'react-router-dom';

const Content = () => {
    const history = useHistory();
    const { t } = useTranslation();
    const [selectedTab, setSelectedTab] = useState('Template');
    const [filterStatus, setFilterStatus] = useState(false);
    const [contentOnModal, setContentOnModal] = useState({ onModal: false, content: null });

    return (
        <div className="brochure-templates">
            <h3>Content</h3>
            <ContentPageTab
                setSelectedTab={setSelectedTab}
                setFilterStatus={setFilterStatus}
                filterStatus={filterStatus}
                setContentOnModal={setContentOnModal}
            />
            {selectedTab === 'Template' && <TemplateTab filterStatus={filterStatus} />}
            {selectedTab === 'Content' && (
                <ContentTab
                    filterStatus={filterStatus}
                    setFilterStatus={setFilterStatus}
                    contentOnModal={contentOnModal}
                    setContentOnModal={setContentOnModal}
                />
            )}
        </div>
    );
};

export default Content;
