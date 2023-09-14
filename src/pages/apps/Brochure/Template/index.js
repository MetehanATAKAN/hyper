import React, { useEffect, useState } from 'react';
import { Row, Col, Tab, Nav, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { pageDesignTemplate } from '../../../../redux/activityLimitandSettings/actions';
import Templates from './Templates';
import { FetchApiPost } from '../../../../utils/http.helper';
import { useHistory } from 'react-router';

const TemplateIndex = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const tabContents = [
        {
            id: '1',
            title: 'Templates',
            text: <Templates />,
            disabled: false,
        },
        {
            id: '2',
            title: 'Archive',
            text: <Templates />,
            disabled: false,
            // tabsDısabled.ownersIsDisabled
        },
    ];

    const [templates, setTemplates] = useState(true);

    const mete = (name) => {
        console.log(name.target.value);
        console.log(templates);
        setTemplates(!templates);
        if (templates === false) {
            dispatch(pageDesignTemplate(1));
        } else {
            dispatch(pageDesignTemplate(2));
        }
    };

    return (
        <div className="card">
            <div className="brochure-templates card-body">
                <div className="d-flex text-center justify-content-end">
                    <label>Templates</label>
                    <Form.Check type="switch" onChange={(e) => mete(e)} />
                    <label>Archive</label>
                </div>

                <hr />
                <Templates />
            </div>
        </div>
    );
};

export default TemplateIndex;
