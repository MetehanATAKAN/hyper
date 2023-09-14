import React, { useState } from 'react'
import { BsFilterLeft } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const AddBusinessBrochure = ({ handleClose }) => {
    const { t } = useTranslation();

    const [brochure, setBrochure] = useState([{
        subProcessId: 1, subProcess: 'Content', companies: [
            {id: 1, company: 'GMG İlaclari'},
            {id: 2, company: 'Setonda TR'},
            {id: 3, company: 'GMG UZ'},
            {id: 4, company: 'GMG AZ'},
        ]
    },{
        subProcessId: 2, subProcess: 'Medical Control', companies: [
            {id: 1, company: 'GMG İlaclari'},
            {id: 2, company: 'Setonda TR'},
            {id: 3, company: 'GMG UZ'},
            {id: 4, company: 'GMG AZ'},
        ]
    },{
        subProcessId: 3, subProcess: 'Production', companies: [
            {id: 1, company: 'GMG İlaclari'},
            {id: 2, company: 'Setonda TR'},
            {id: 3, company: 'GMG UZ'},
            {id: 4, company: 'GMG AZ'},
        ]
    }])

    const handleDeleteCompany = (subProcessId, companyId) => {
        
        const newBrochure = brochure.map(item => {
            if(item.subProcessId === subProcessId){
                console.log("QWEQEQEQEQ");
                item.companies = item.companies.filter(company => company.id !== companyId)
            }
            return item
        })
        setBrochure(newBrochure)
    }



  return (
    <div className='add-business-brochure'>
        <div className='add-business-brochure__container'>
            <label>{t('Brochure')}</label>
            <div className='add-business-brochure__table'>
                <div className='add-business-brochure__table-header'>
                    <div><span>{t('Sub Process')}</span> <BsFilterLeft /></div>
                    <div><span>{t('Companies')}</span> <BsFilterLeft /></div>
                </div>
            </div>
            <div className='add-business-brochure__table-content'>
                {
                    brochure.map((item, index) => (
                        <div key={index} className='add-business-brochure-table-row'>
                            <div className='add-business-brochure-table-row__sub'>
                                {item.subProcess}
                            </div>
                                <div className='add-business-brochure-table-row__companies'>
                                {
                                    item.companies.map((company, companyIndex) => (
                                        <div key={companyIndex} className='add-business-brochure-table-row__companies-item'>
                                            <span>{company.company}</span>
                                            <button onClick={() => handleDeleteCompany(item.subProcessId, company.id)}><IoMdClose /></button>
                                        </div>
                                    ))
                                }
                                </div>
                        </div>
                    ))
                }
            </div>
        </div>
        <div className="task-management-footer-btn">
                <Button variant="light" onClick={() => handleClose()}>
                    {t('cancel')}
                </Button>
                <Button variant="primary" onClick={() => handleClose()}>
                    {t('add')}
                </Button>
            </div>
    </div>
  )
}

export default AddBusinessBrochure