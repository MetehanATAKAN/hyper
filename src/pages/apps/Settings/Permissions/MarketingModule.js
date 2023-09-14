import React, { useEffect, useState } from 'react';
import { FetchApiGet } from '../../../../utils/http.helper';
import { useHistory } from 'react-router';

const MarketingModule = () => {
    const history = useHistory();

    const [moduleNames, setModuleNames] = useState([
        {
            name: 'Marketing Module',
            href: '#marketingModule',
        },
        {
            name: 'Activities',
            href: '#activities',
        },
    ]);

    useEffect(() => {
        FetchApiGet('services/AuthorizationSystem/Module/GetAllModule', 'GET').then((res) =>
            (async () => {
                try {
                    if (res.status === 200) {
                        res.json().then((data) => {
                            setModuleNames(
                                data.data.map((data) => ({
                                    id: data.id,
                                    name: data.label,
                                    href: `#${data.label}`,
                                }))
                            );
                        });
                    } else if (res.status === 500 || res.status === 499) {
                        history.push('/error-500');
                    } else {
                    }
                } catch (error) {
                    console.log('error', error);
                }
            })()
        );
    }, []);
    return (
        <div className="module-names">
            <ul>
                {moduleNames.map((module) => (
                    <li>
                        <a href={module.href}>
                            <span>{module.name}</span>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MarketingModule;
