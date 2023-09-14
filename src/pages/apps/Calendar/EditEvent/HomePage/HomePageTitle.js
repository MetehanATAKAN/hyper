import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
    const HomePageTitle = () => {
    const page = useSelector((state) => state.Calendar.changePage);
    const { t } = useTranslation();
    const [pageTitle] = useState([
        "Clinic Visit", "Planned Visit", "Number of Patients", "Visit Evulotion", "Visit Evulotion", "Visit Evulotion", "Promo Material", 
        "Loyalty to Product", "Loyalty to Product", "Loyalty to Product", "Pharmacy Split", "Wants", "Wants", "Wants", "Wants"
    ])
  return (
        <>{t(pageTitle[page-1])}</>
  )
}

export default HomePageTitle