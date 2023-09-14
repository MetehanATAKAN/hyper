import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Col, Card, Button, Table, Modal } from 'react-bootstrap';
import Example2 from './Example2';
import Example from './MarketingActivity/Example';
import Sorting from './MarketingActivity/Sorting';
import GantIndex from '../Projects/Gantt/index';
import { FetchApiPost } from '../../../utils/http.helper';
import TableSettings from './TableSettings';

const Country = () => {
    const history = useHistory();

    return (
        <>
            <TableSettings />
            {/* <div className="new-table-header-cont">
                <div className="mt-2 mb-2">
                    <div className="new-table-title1">
                        <span>Country</span>
                    </div>
                    <div className="new-table-title2">
                        <span>Country / Country</span>
                    </div>
                </div>
                <Col className="text-end table-header-btn-cont">
                    <Button variant="white" type="submit" className="btn btn-white table-header-btn">
                        <i className="dripicons-broadcast" />
                    </Button>
                </Col>
            </div>
            <Card>
                <Card.Body> 
                     <Example />
                </Card.Body>
            </Card> */}
        </>
    );
};

export default Country;

// import React, { useRef, useState, useEffect, useCallback } from 'react';

// import EmailEditor from 'react-email-editor';
// import { FetchApiPost } from '../../../utils/http.helper';
// import { template } from './Temlate';
// import denemeJson from './deneme.json';
// import { Button } from 'react-bootstrap';

// const PageApp = (props) => {
//   const emailEditorRef = useRef(null);
//   const [id, setId] = useState();

//   const exportHtml = () => {
//     emailEditorRef.current.editor.exportHtml((data) => {
//       const { design, html } = data;

//       const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(design))}`
//       const link = document.createElement('a');
//       link.href = jsonString;
//       link.download = 'data.json';

//       let buff = new Buffer(toString(design));
//       let base64data = buff.toString('base64');

//       let objJsonStr = JSON.stringify(design);
//       let objJsonB64 = Buffer.from(objJsonStr).toString("base64");

//       let objHtmlStr = JSON.stringify(html);
//       let objHtmlB64 = Buffer.from(objHtmlStr).toString('base64');

//       const saveDesignPage = {
//         Id            :   localStorage.getItem('templateID'),
//         JsonFile      :   objJsonB64,
//         HtmlFile      :   objHtmlB64,
//         ImageFile     :   objHtmlB64,
//         IsApproved    :   0,
//         RejectReason  :   null,
//         CreatedBy     :   localStorage.getItem('userName')
//       }

//       FetchApiPost('services/Pages/Page/SaveDesignPage', 'POST', saveDesignPage);
//     });

//   };

//   const onLoad = () => {
//     // editor instance is created
//     // you can load your template here;
//     // const templateJson = {};
//     // emailEditorRef.current.editor.loadDesign(templateJson);
//   }

//   const onReady = () => {
//     // editor is ready
//     console.log('onReady');
//     console.log(template);
//     // console.log(first);
//     // emailEditorRef.current.loadDesign(template)
//   };

//   useEffect(() => {

//     FetchApiPost(`services/Pages/Page/GetDesignPageById?id=4`, 'GET')
//       .then(response => response.json())
//       .then(response => {
//         let design = JSON.parse(response.data.jsonFile);
//         emailEditorRef.current.loadDesign(design);
//       })
//       .catch(error => console.log(error))

//   }, [])

//   return (
//     <div>
//       <div className='text-end p-2' style={{backgroundColor:'#3B3B3B'}} >
//         <Button
//           onClick={exportHtml}
//           className='btn-primary' >
//           save
//         </Button>
//       </div>

//       <EmailEditor ref={emailEditorRef} onLoad={onLoad} onReady={onReady}
//         tools={{
//           "custom#dy_recommendation": {
//             data: {
//               html: `<div
//              style='
//               border: 1px solid #ccc;
//               padding: 20px;
//               '
//              >Custom dynamic HTML</div>`
//             },
//             position: 0
//           }
//         }}
//       />

//     </div>
//   );
// };

// export default PageApp;
