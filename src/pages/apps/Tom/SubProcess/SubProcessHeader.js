import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../../../../components/Header';


const SubProcessHeader = () => {

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
                            Sub Process
                        </Link>
                    ),
                }
            ],
         },
        { label: 'Sub Process' },
    ];

  return (
    <div>
        <Header
        routes={breadCrumbProps}
        pageTitle={'Sub Process'}
         />
    </div>
  )
}

export default SubProcessHeader