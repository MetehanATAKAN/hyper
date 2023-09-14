// import React, { useEffect, useState, useRef } from 'react';
// import GlobalModal from '../../../../../components/GlobalNew/Modal';
// import { useTranslation } from 'react-i18next';
// import { Button } from 'react-bootstrap';
// import { FetchApiPost, FetchApiGet } from '../../../../../utils/http.helper';
// import TextEditor from '../../SubProcessModals/Editor/TextEditor';
// import jsPDF from 'jspdf';

// const SOP = ({ showAddModal, setShowAddModal, selectedItem }) => {
//     const { t } = useTranslation()
//     const [isClickAdd, setIsClickAdd] = useState(false);
//     const [addButtonDisableStatus, setAddButtonDisableStatus] = useState(true);
//     const quillRef = useRef('');
//     const [loader, setLoader] = useState(false);

//     // const [sop, setSop] = useState(selectedItem.sop !== null && selectedItem.sop !== undefined ? Buffer.from(selectedItem.sop, 'base64').toString('utf-8') : '');
//     const [sop, setSop] = useState('');
//     // const doc = new jsPDF({
//     //     orientation: 'landscape',
//     //     unit: 'in',
//     //     format: [4, 2],
//     // });

//     const reportTemplateRef = useRef(null);

//     const handleGeneratePdf = () => {
// 		//  const doc = new jsPDF({orientation: 'p', 
//         //  unit: 'in', 
//         //  format: 'a4'});

// 		// // Adding the fonts.
// 		// doc.setFont('Inter-Regular', 'normal');

// 		// doc.html(reportTemplateRef.current, {
// 		// 	async callback(doc) {
// 		// 		await doc.save('document');
// 		// 	},
// 		// });

//         const pdf = new jsPDF("portrait", "pt", "a4");
//         const data = document.querySelector("#page-contents");
//         pdf.html(data).then(() => {
//             pdf.save("shipping_label.pdf");
//         });
// 	};

//     useEffect(() => {
//         setLoader(false);
//         FetchApiGet(`services/TaskManagement/SubProcess/GetSubProcessListByParentProcessId?parentProcessId=${selectedItem}`, 'GET')
//             .then(res => {
//                 if(res.status === 200){
//                     res.json().then(({ data }) => {
//                         // setOrderItems(data)
//                         let text = ''
                    
//                         data.map(i => {
//                             if(i.sop){
//                                 text = text + Buffer.from(i.sop, 'base64').toString('utf-8')
//                                 // console.log(parser.parseFromString(Buffer.from(i.sop, 'base64').toString('utf-8'), ""))
//                             }
//                         })
//                         // let deneme = document.createElement("div");
//                         // let content = document.createTextNode("deneme");
//                         // deneme.appendChild(content)
//                         // const domparser = new DOMParser();
//                         // let doc = domparser.parseFromString(text, "text/html")
//                         // console.log(text.outerHTML)
//                         const parser = new DOMParser();
//                         const element = document.getElementById(`page-contents`);
//                         // const string = `<a href="#git">g,t</a>` + text + text + text + `<h3 id="git" style="color: red">gidilecek adres</h3>`
//                         const string = text
//                         const child = parser.parseFromString(string, 'text/html');
                        
//                         child.body.classList.add("content-container")
//                         element.appendChild(child.body);
                        
//                         const modal = document.getElementsByClassName("modal-body")[0]
//                         modal.style.scrollBehavior = "smooth";
                        
//                         for(let i = 0; i < element.getElementsByClassName('ql-align-center').length ; i++){
//                             element.getElementsByClassName('ql-align-center')[i].style.textAlign = 'center';
//                         }

//                         for(let i = 0; i < element.getElementsByClassName('ql-align-right').length ; i++){
//                             element.getElementsByClassName('ql-align-right')[i].style.textAlign = 'right';
//                         }

//                         for(let i = 0; i < element.getElementsByClassName('ql-align-justify').length ; i++){
//                             element.getElementsByClassName('ql-align-justify')[i].style.textAlign = 'justify';
//                         }

//                         for(let i = 0; i < element.getElementsByTagName('ol').length ; i++){
//                             element.getElementsByTagName('ol')[i].style.marginLeft = '1.5em';
//                         }

//                         for(let i = 0; i < element.getElementsByTagName('ul').length ; i++){
//                             element.getElementsByTagName('ul')[i].style.marginLeft = '1.5em';
//                         }

        
//                         // setSop(`${parser.parseFromString(text, "text/html")}`)
//                         // setSop("<p><a href='https://google.com'>link</a></p> <p>ewfkerwkoe</p> <p>ewfkerwkoe</p> <p>ewfkerwkoe</p> <p>ewfkerwkoe</p>")
//                         setLoader(true);
//                         // setSop(text)

                        
//                     })
//                 }
//             })
//     }, [selectedItem])

//     useEffect(() => {
//         if(showAddModal){
//             document.getElementById('global-new-modal').style.width= '100%'
//             document.getElementById('global-new-modal').style.maxWidth= '100%'
//             document.getElementById('global-new-modal').style.maxHeight= '100%'
//             document.getElementById('global-new-modal').style.height= '100%'
//             document.getElementById('global-new-modal').style.padding= '3%'
//             document.getElementsByClassName('modal-content')[0].style.width = '100%'
//             document.getElementsByClassName('modal-content')[0].style.height = '100%'
//             document.getElementsByClassName('modal-content')[0].style.maxWidth = '100%'
//             document.getElementsByClassName('modal-content')[0].style.maxHeight = '100%'
//         }
//     }, [showAddModal])
    
//   return (
//     <>
//             {showAddModal && (
//                 <GlobalModal
//                     showModal={showAddModal}
//                     setShowModal={setShowAddModal}
//                     toggle={() => setShowAddModal(false)}
//                     header={selectedItem.sop ? t("Update S&OP") : t("add S&OP")}
//                     size={"xl"}
//                     body={
//                         <div ref={reportTemplateRef}>
//                             <div id="page-contents" style={{scrollBehavior: 'smooth'}} >
                                 
//                             </div>
//                         </div>
//                     }
//                     footer={
//                         <>
//                             <Button onClick={() => setShowAddModal(false)} variant="secondary">
//                                 {t('cancel')}
//                             </Button>
//                             {/* <Button onClick={handleGeneratePdf}  variant={"primary"}>
//                                 {t('dowload')}
//                             </Button> */}
//                         </>
//                     }
//                 />
//             )}
//         </>
//   )
// }

// export default SOP