import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import Header from '../../../../components/Header.jsx';
import Icon from '@mdi/react';
import { mdiHomeOutline } from '@mdi/js';
import Table from './Table';
import { useTranslation } from 'react-i18next';

// import 'suneditor/dist/css/suneditor.min.css';
// import SunEditor from 'suneditor-react';

const Tom = () => {
    const { t } = useTranslation();
    const breadCrumb =[
        {
            label: <Link to="/apps/tom/process-and-project-type" style={{display: 'flex', alignItems: 'center', columnGap: '4px'}}> <Icon path={mdiHomeOutline} size={0.75} /><span>{t('PP Management')}</span></Link>
        },
        {
            label: t('Processes'),
            items: [
               {
                    key: 1,
                    label: <div>{t('Main Process')}</div>
               },
               {
                key: 2,
                label: <Link to="/apps/tom/business-process">{t('Business Process')}</Link>
               },
               {
                key: 3,
                label: <div>{t('Process')}</div>
               },
               {
                key: 3,
                label: <div>{t('Sub Process')}</div>
               }
            ]
        },
        {
            label: t('Process')
        }
    ]

    const [value, defaultValue] = useState(`
    <a href='#lala'>deneme</a>
            <div>adasdsadasdadaaa</div>
            <div>adasdsadasdadaaa</div>
            <div>adasdsadasdadaaa</div>
            <div>adasdsadasdadaaa</div>
            <div>adasdsadasdadaaa</div>
            <div>adasdsadasdadaaa</div>
            <div>adasdsadasdadaaa</div>
            <div>adasdsadasdadaaa</div>
            <div>adasdsadasdadaaa</div>
            <div>adasdsadasdadaaa</div>
            <div>adasdsadasdadaaa</div>
            <div>adasdsadasdadaaa</div>
            <div>adasdsadasdadaaa</div>
            <div>adasdsadasdadaaa</div>
            <div>adasdsadasdadaaa</div>
            <div>adasdsadasdadaaa</div>
            <div>adasdsadasdadaaa</div>
            <div>adasdsadasdadaaa</div>
            <div>adasdsadasdadaaa</div>
            <div>adasdsadasdadaaa</div>
            <div>adasdsadasdadaaa</div>
            <div>adasdsadasdadaaa</div>
            <div>adasdsadasdadaaa</div>
            <div>adasdsadasdadaaa</div>
            <div>adasdsadasdadaaa</div>
            <div>adasdsadasdadaaa</div>
            <div>adasdsadasdadaaa</div>
            <div>adasdsadasdadaaa</div>
            <div>adasdsadasdadaaa</div>`)

            const editor = useRef();

    // The sunEditor parameter will be set to the core suneditor instance when this function is called
    const getSunEditorInstance = (sunEditor) => {
        let a = document.implementation.createHTMLDocument()
        a.body.innerHTML = `<a href='#lala'>deneme</a>
        <div>adasdsadasdadaaa</div>
        <div>adasdsadasdadaaa</div>
        <div>adasdsadasdadaaa</div>
        <div>adasdsadasdadaaa</div>
        <div>adasdsadasdadaaa</div>
        <div>adasdsadasdadaaa</div>
        <div>adasdsadasdadaaa</div>
        <div>adasdsadasdadaaa</div>
        <div>adasdsadasdadaaa</div>
        <div>adasdsadasdadaaa</div>
        <div>adasdsadasdadaaa</div>
        <div>adasdsadasdadaaa</div>
        <div>adasdsadasdadaaa</div>
        <div>adasdsadasdadaaa</div>
        <div>adasdsadasdadaaa</div>
        <div>adasdsadasdadaaa</div>
        <div>adasdsadasdadaaa</div>
        <div>adasdsadasdadaaa</div>
        <div>adasdsadasdadaaa</div>
        <div>adasdsadasdadaaa</div>
        <div>adasdsadasdadaaa</div>
        <div>adasdsadasdadaaa</div>
        <div>adasdsadasdadaaa</div>
        <div>adasdsadasdadaaa</div>
        <div>adasdsadasdadaaa</div>
        <div>adasdsadasdadaaa</div>
        <div>adasdsadasdadaaa</div>
        <div>adasdsadasdadaaa</div>
        <div id='lalala'>link</div>`
        

        console.log(a)
        editor.current = sunEditor.insertHTML(`
        <p><a href='#lala'>deneme</a><p>dasdsa</p><p>
        <div>adasdsadasdadaaa</div>
        <div>adasdsadasdadaaa</div>
        <div>adasdsadasdadaaa</div>
        <div>adasdsadasdadaaa</div>
        <div>adasdsadasdadaaa</div>
        <div>adasdsadasdadaaa</div>
        <div>adasdsadasdadaaa</div>
        <div>adasdsadasdadaaa</div>
        <div>adasdsadasdadaaa</div>
        <div>adasdsadasdadaaa</div>
        <div>adasdsadasdadaaa</div>
        <div>adasdsadasdadaaa</div>
        <div>adasdsadasdadaaa</div>
        <div>adasdsadasdadaaa</div>
        <div>adasdsadasdadaaa</div>
        <div>adasdsadasdadaaa</div>
        <div>adasdsadasdadaaa</div>
        <div>adasdsadasdadaaa</div>
        <div>adasdsadasdadaaa</div>
        <div>adasdsadasdadaaa</div>
        <div>adasdsadasdadaaa</div>
        <div>adasdsadasdadaaa</div>
        <div>adasdsadasdadaaa</div>
        <div>adasdsadasdadaaa</div>
        <div>adasdsadasdadaaa</div>
        <div>adasdsadasdadaaa</div>
        <div>adasdsadasdadaaa</div>
        <div>adasdsadasdadaaa</div>
        <div>adasdsadasdadaaa</div>
        <div>adasdsadasdadaaa</div>
        <div>adasdsadasdadaaa</div>
        <div>adasdsadasdadaaa</div>
        <div>adasdsadasdadaaa</div>
        <div>adasdsadasdadaaa</div>
        <div>adasdsadasdadaaa</div>
        <div>adasdsadasdadaaa</div>
        <div>adasdsadasdadaaa</div>
        <div>adasdsadasdadaaa</div>
        <div>adasdsadasdadaaa</div>
        <div>adasdsadasdadaaa</div>
        <div>adasdsadasdadaaa</div>
        <div>adasdsadasdadaaa</div>
        <div>adasdsadasdadaaa</div>
        <div>adasdsadasdadaaa</div>
        <div id='lalala'>link</div></p>`, true, true, true);
    };

  return (
    <div >
        <Header routes={breadCrumb} pageTitle={t('Process')} />
            <Table />

            {/* <SunEditor 
            // defaultValue='<div>dasdasd</div>'
            getSunEditorInstance={getSunEditorInstance}
             /> */}

             <Link to='#testtt'>deneme</Link>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             v
             value<div>dweqeq</div>
             v
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             v
             value<div>dweqeq</div>
             v
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             v
             value<div>dweqeq</div>
             v
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             v
             value<div>dweqeq</div>
             v
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             v
             value<div>dweqeq</div>
             v
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             v
             value<div>dweqeq</div>
             v
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             value<div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div>dweqeq</div>
             <div ide="testtt">dweqeq</div>
    </div>
  )
}

export default Tom