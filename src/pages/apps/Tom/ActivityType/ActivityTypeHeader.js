import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../../../../components/Header';


const ActivityTypeHeader = () => {

    const breadCrumbProps = [
        { label: 'PP Management'},
        { 
            label: 'Types',
            items: [
                {
                    key: 1,
                    label: (
                        <Link target="_blank" >
                            PP Management
                        </Link>
                    ),
                },
                {
                    key: 2,
                    label: (
                        <Link target="_blank" >
                            Activity Type
                        </Link>
                    ),
                }
            ],
         },
        { label: 'Activity Typee' },
    ];

  return (
    <div>
        <Header
        routes={breadCrumbProps}
        pageTitle={'Activity Type'}
         />
    </div>
  )
}

export default ActivityTypeHeader