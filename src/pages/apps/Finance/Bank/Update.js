import React, { useEffect, useState } from 'react'
import { Button as ButtonB } from 'react-bootstrap';
import GlobalModal from '../../../../components/GlobalNew/Modal';
import { useTranslation } from 'react-i18next';
import { NewInput } from '../../../../components/GlobalNew/Inputs';
import { FetchApiGet, FetchApiPost } from '../../../../utils/http.helper';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import PharmacySplitPercentProblem from '../../../../components/Modals/PharmacySplitPercentProblem';
import { SingleSelects } from '../../../../components/GlobalNew/Selects';

const Update = ({
    show,
    setShow,
    data,
    setCallTable
}) => {

    const { t } = useTranslation();
    const history = useHistory();
   
     /**user name */
     const modifiedBy = localStorage.getItem('userName');
    console.log(data);
    /**type */
    const [type, setType] = useState([]);
    const [selectType, setSelectType] = useState({
        value:data?.typeId,
        label:data?.type
    });

    /**bank name */
    const [bankName, setBankName] = useState(data?.name);

    /**swift */
    const [swift, setSwift] = useState(data?.swift);

    /**web site */
    const [webSite, setWebSite] = useState(data?.webSite);

    /**error modal */
    const [errorModal, setErrorModal] = useState(false);

    /**error modal text */
    const [errorModalText, setErrorModalText] = useState('');

    const updateBank = () => {
        const body = {
            id: data?.id,
            typeId:selectType?.value,
            name: bankName,
            swiftCode: swift,
            webSite:webSite,
            modifiedBy: modifiedBy
        }
        FetchApiPost('services/Finance/Bank/UpdateBank','POST',body)
        .then(res => {
            if (res.status === 201) { 
                setCallTable(true);
                setShow(false);
            }
            else if(res.status === 409) {
                    setErrorModal(true);
                    res.json().then(data => setErrorModalText(data?.errors[0]));
            }
            else {
                history.push('/error-500');
            }
        })
    }

    /**type */
    useEffect(() => {
        FetchApiGet('services/Finance/Branch/GetTypes', 'GET')
            .then(res => {
                if (res.status === 200) {
                    res.json().then(res => {
                        setType(res?.data?.map(data => {
                            return {
                                value: data?.id,
                                label: data?.name
                            }
                        }))
                    })
                }
                else {
                    history.push('/error-500')
                }
            })
    }, [history])

  return (
     <>
            <GlobalModal
                showModal={show}
                setShowModal={setShow}
                toggle={() => setShow(false)}
                header={t('Update Bank')}
                body={
                    <div>
                         <SingleSelects
                            label='type'
                            isStar={true}
                            options={type}
                            selectedItems={selectType}
                            setSelectedItems={setSelectType}
                            width='100%'
                            disabled={true}
                        />
                        <NewInput
                            label='name'
                            isStar={true}
                            value={bankName}
                            setValue={setBankName}
                            width='100%'
                            placeholder='bank name'
                        />
                         <NewInput
                            label='swift'
                            isStar={true}
                            value={swift}
                            setValue={setSwift}
                            width='100%'
                            placeholder='swift'
                        />
                          <NewInput
                            label='web site'
                            isStar={true}
                            value={webSite}
                            setValue={setWebSite}
                            width='100%'
                            placeholder='web site'
                        />
                    </div>
                }
                footer={
                    <>
                        <ButtonB variant="light" onClick={() => setShow(false)}>
                            {t('cancel')}
                        </ButtonB>
                        <ButtonB
                            variant="warning"
                            onClick={updateBank}
                            disabled={
                                selectType !== undefined && 
                                bankName !== '' && 
                                swift !== '' && 
                                document.length !== 0 &&
                                webSite !== ''
                                 ? false 
                                 : true
                                }
                            >
                            {t('update')}
                        </ButtonB>
                    </>
                }
            />

{
                errorModal &&
                <PharmacySplitPercentProblem
                show={errorModal}
                handleClose={()=>setErrorModal(false)}
                messages={errorModalText}
                />
            }
        </>
  )
}

export default Update