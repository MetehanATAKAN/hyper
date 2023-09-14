import React from 'react'
import { Col, Nav, Row, Tab } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { benefitTab, pageListPlus } from '../../../../redux/actions';
import BenefitIndex from './Benefit';
import PageGalleryIndex from './PageGallery';
import PageListIndex from './PageList';
import TemplatesIndex from './Templates';
import BreadCrumb from '../../../../components/BreadCrumb';

const Index = () => {

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const tabName = useSelector( state => state.Need.benefitTabName);
  console.log('tabname => ',tabName);

  const tabContents = [
    {
        id: '1',
        title: t('Benefit'),
        text: <BenefitIndex />,
        disabled: false,
        ariaSelected:false
    },
    {
        id: '2',
        title: t('Page List'),
        text: <PageListIndex />,
        disabled: false,
        ariaSelected:true
        // tabsDısabled.ownersIsDisabled
    },
    {
        id: '3',
        title: t('Page Gallery'),
        text: <PageGalleryIndex />,
        disabled: false,
        ariaSelected:false
        // tabsDısabled.participantsIsDisabled
    },
    {
        id: '4',
        title: t('Templates'),
        text: <TemplatesIndex />,
        disabled: false,
        ariaSelected:false
    },

];

const breadCrumbProps = [
    { label: 'Home', url: '/apps/calendar' },
    { label: 'Page Design', url: '/apps/calendar' },
    { label: 'Benefit' },
];

const changeTab = (e) => {
    dispatch(benefitTab(e));
    dispatch(pageListPlus(false))
}
  return (
    <div>
        <BreadCrumb breadCrumbProps={breadCrumbProps} />
        <Row>
                <Col lg={12}>
                    <div>
                        
                            <Tab.Container  
                            // activeKey={
                            //     localStorage.getItem('i18nextLng') === 'en' 
                            //     ? 'Benefit' 
                            //     :localStorage.getItem('i18nextLng') === 'tr'
                            //     ? 'Yarar'
                            //     :localStorage.getItem('i18nextLng') === 'ru'
                            //     ? 'Польза'
                            //     :null
                            // }
                            defaultActiveKey={
                                localStorage.getItem('i18nextLng') === 'en' 
                                ? 'Benefit' 
                                :localStorage.getItem('i18nextLng') === 'tr'
                                ? 'Yarar'
                                :localStorage.getItem('i18nextLng') === 'ru'
                                ? 'Польза'
                                :null
                            }
                            onSelect={(e)=>changeTab(e)} 
                            >
                                <Nav variant="tabs" className="nav-bordered" as="ul">
                                    {tabContents.map((tab, index) => {
                                        return (
                                            <Nav.Item key={index} as="li">
                                                <Nav.Link href="#" className='mete' eventKey={tab.title} disabled={tab.disabled}  >
                                                    <span>{tab.title}</span>
                                                </Nav.Link>
                                            </Nav.Item>
                                        );
                                    })}
                                </Nav>

                                <Tab.Content>
                                    {tabContents.map((tab, index) => {
                                        return (
                                            <Tab.Pane eventKey={tab.title} id={tab.id} key={index}>
                                                <Row>
                                                    <Col sm="12">
                                                        <p className="mb-2">{tab.text}</p>
                                                    </Col>
                                                </Row>
                                            </Tab.Pane>
                                        );
                                    })}
                                </Tab.Content>
                            </Tab.Container>
                       
                    </div>
                </Col>

            </Row>
    </div>
  )
}

export default Index